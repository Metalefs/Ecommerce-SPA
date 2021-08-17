import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import { CorreiosClient } from '../../client/integrations/correios.client';
import { ProdutoService } from '../../services';
import { CorProduto, Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { Categoria } from '../../repositories/seeding/classes/categoria.seed';
import { ErrorHandler } from '../../_handlers/error-handler';

const CorreiosRouter = express();

const produtoService = new ProdutoService();
const correiosClient = new CorreiosClient();
CorreiosRouter.get(RouteDictionary.Correios.CalcularPrecoPrazoPorProduto + `:id`, async (req, res) => {
  console.log(req.params);
  if (req.params.id && req.query.cep) {
    const produto = await produtoService.FiltrarPorId(req.params.id) as unknown as Produto;
    const cep = req.query.cep as string;
    if (produto && cep)
      correiosClient.CalcularPrecoPrazoPorProduto(produto[0], cep).then(result => {
        res.send(result);
      }).catch(err=>{
        ErrorHandler.DefaultException(err,res);
      })
  }
  else
  ErrorHandler.DefaultException("Não foi possível calcular o preco do frete",res);
})
CorreiosRouter.get(RouteDictionary.Correios.CalcularPrecoPrazoPorCep + `:id`, async (req, res) => {
  const cep = req.params.id;
  if (cep) {
    const produto = new Produto(
      "",
      "",
      "",
      Categoria[0],
      "Serigrafia",
      [""],
      0,
      0,
      new TamanhoProduto("", []),
      new CorProduto("", ""),
      0
    );
    produto.Dimensoes = {Altura:20,Largura:20,Comprimento:20,Peso:2}
    produto.Peso = 1;
    console.log(cep);
    correiosClient.CalcularPrecoPrazoPorProduto(produto, cep).then(result => {
      res.send(result);
    }).catch(err=>{
      ErrorHandler.DefaultException(err,res);
    })
  }
  else
  ErrorHandler.DefaultException("Não foi possível calcular o preco do frete",res);
})
  .get(RouteDictionary.Correios.CalcularPrecoPrazoPorOrcamento, (req, res) => {

  })
  .get(RouteDictionary.Correios.RastrearEncomendas + `:id`, (req, res) => {

  })

export {
  CorreiosRouter
}
