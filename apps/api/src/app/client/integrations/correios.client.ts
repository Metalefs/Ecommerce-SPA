import {calcularPrecoPrazo, CepResponse, consultarCep, rastrearEncomendas} from 'correios-brasil';
import { InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { InformacoesContatoService, SobreService } from '../../services';

export class CorreiosClient {

  async ConsultarCep(cep:string) : Promise<CepResponse>{
    return await consultarCep(cep) as CepResponse;
  }

  //TODO = REFACTOR GETTING ALL PRODUCT DIMENTIONS FROM DB
  async CalcularPrecoPrazoPorOrcamento(orcamento:Orcamento){
    const informacoesContatoService = new InformacoesContatoService();

    const CEP = await informacoesContatoService.LerPrimeiro() as InformacoesContato;
    const args = {
      sCepOrigem: CEP.CEP??"33823-390",
      sCepDestino: orcamento.Usuario.EnderecoEntrega.CEP,
      nVlPeso: orcamento.DimensoesObjs.map(x=>x.Peso).reduce((a,b)=>a+b).toString(),
      nCdFormato: '1',
      nVlComprimento: orcamento.DimensoesObjs.map(x=>x.Comprimento).reduce((a,b)=>a+b).toString(),
      nVlAltura: orcamento.DimensoesObjs.map(x=>x.Altura).reduce((a,b)=>a+b).toString(),
      nVlLargura: orcamento.DimensoesObjs.map(x=>x.Largura).reduce((a,b)=>a+b).toString(),
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço 04014 = SEDEX à vista // 04510 = PAC à vista
      nVlDiametro: '0',
    };

    return await calcularPrecoPrazo(args);
  }

  async CalcularPrecoPrazoPorProduto(produto:Produto, cep:string){
    const informacoesContatoService = new InformacoesContatoService();

    const CEP = await informacoesContatoService.LerPrimeiro() as InformacoesContato;
    console.log(produto,cep,CEP.CEP)
    const args = {
      sCepOrigem: CEP.CEP??"33823-390",
      sCepDestino: cep,
      nVlPeso: produto.Peso.toString(),
      nCdFormato: '1',
      nVlComprimento: produto.Dimensoes.Comprimento.toString(),
      nVlAltura: produto.Dimensoes.Altura.toString(),
      nVlLargura: produto.Dimensoes.Largura.toString(),
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço 04014 = SEDEX à vista // 04510 = PAC à vista
      nVlDiametro: '0',
    };

    return await calcularPrecoPrazo(args);
  }

  async RastrearEncomendas(codRastreio:string[]){
    return await rastrearEncomendas(codRastreio);
  }
}
