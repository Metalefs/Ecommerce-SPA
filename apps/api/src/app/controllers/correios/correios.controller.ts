import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import { CorreiosClient } from '../../client/integrations/correios.client';
import { OrcamentoService, ProdutoService } from '../../services';
import { CorProduto, Orcamento, Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { Categoria } from '../../repositories/seeding/classes/categoria.seed';
import { ErrorHandler } from '../../_handlers/error-handler';

const CorreiosRouter = express();

const produtoService = new ProdutoService();
const orcamentoService = new OrcamentoService();
const correiosClient = new CorreiosClient();
CorreiosRouter.get(RouteDictionary.Correios.CalcularPrecoPrazoPorProduto + `:id`, CalcularPrecoPrazoPorProduto)
CorreiosRouter.get(RouteDictionary.Correios.CalcularPrecoPrazoPorCep + `:id`, CalcularPrecoPrazoPorCep)
.get(RouteDictionary.Correios.CalcularPrecoPrazoPorOrcamento + `:id`, CalcularPrecoPrazoPorOrcamento)
.get(RouteDictionary.Correios.RastrearEncomendas + `:id`, RastrearEncomendas)

export {
  CorreiosRouter
}
async function CalcularPrecoPrazoPorOrcamento(req,res){
  if(!req.params.id){
    ErrorHandler.DefaultException("Nenhum id de orcamento encontrado na requisição", res);
    return;
  }
  const id = req.params.id; console.log(id);
  const orcamento:Orcamento = await orcamentoService.FiltrarPorId(id) as Orcamento; console.log(orcamento);
  const cep = orcamento[0].Entrega.cep;

  const products = orcamento[0].Produto.map(x=>x.Produto);
  let volumes:number[] = [];
  let peso = 1;
  const C=16, L=11, A=2.
  //1ª Etapa – Calcula o cm³ de cada produto do carrinho
  const  FatorCubagem = 6000;
  products.forEach(product=>{
    let comprimento = product.Dimensoes?.Comprimento || C,
    largura = product.Dimensoes?.Largura || L,
    altura = product.Dimensoes?.Altura || A;
    let cubagem = ((comprimento * largura * altura) * product.Quantidade) / FatorCubagem;
    volumes.push(cubagem);
    peso += product.Peso || 1;
  })
  console.log(volumes,peso);
  //2ª Etapa – Soma todos os volumes
  const somaVolumes = volumes.reduce((a,b)=>a+b);

  console.log(somaVolumes);
  //3ª Etapa – Calcula raiz cúbica dos somatórios dos volumes
  const raizCubicaVolume = Math.cbrt(somaVolumes);
  console.log(raizCubicaVolume);

  let comprimento = raizCubicaVolume > C ? raizCubicaVolume : C,
  largura = raizCubicaVolume > L ? raizCubicaVolume : L,
  altura = raizCubicaVolume > A ? raizCubicaVolume :A;

  correiosClient.CalcularPrecoPrazo(peso, comprimento, altura, largura, cep).then(result => {
    res.send(result);
  }).catch(err=>{
    ErrorHandler.DefaultException(err,res);
  })
}
async function RastrearEncomendas(req,res){
  if (!req.params.id){
    ErrorHandler.DefaultException("Não foi possível obter os dados de rastreamento", res);
    return;
  }
  correiosClient.RastrearEncomendas([req.params.id]).then(result => {
    res.send(result);
  }).catch(err=>{
    ErrorHandler.DefaultException(err, res);
  })
}

async function CalcularPrecoPrazoPorProduto(req,res){
  if (!(req.params.id || req.query.cep)){
    ErrorHandler.DefaultException("Não foi possível calcular o preco do frete",res);
    return;
  }
  const produto = await produtoService.FiltrarPorId(req.params.id) as unknown as Produto;
  const cep = req.query.cep as string;
  if (!produto){
    ErrorHandler.DefaultException("Não foi possível calcular o preco do frete",res);
    return;
  }

  correiosClient.CalcularPrecoPrazoPorProduto(produto[0], cep).then(result => {
    res.send(result);
  }).catch(err=>{
    ErrorHandler.DefaultException(err,res);
  })
}

async function CalcularPrecoPrazoPorCep(req,res){
  const cep = req.params.id;
  if (!cep){
    ErrorHandler.DefaultException("Não foi possível calcular o preco do frete",res);
    return;
  }
  const produto = new Produto( "",  "",  "",  Categoria[0],  "Serigrafia",  [""],  0,  0,  new TamanhoProduto("", []),  new CorProduto("", ""),  0);
  produto.Dimensoes = {Altura:20,Largura:20,Comprimento:20,Peso:2}
  produto.Peso = 1;
  correiosClient.CalcularPrecoPrazoPorProduto(produto, cep).then(result => {
    res.send(result);
  }).catch(err=>{
    ErrorHandler.DefaultException(err,res);
  })
}
