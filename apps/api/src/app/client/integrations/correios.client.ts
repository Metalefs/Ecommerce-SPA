import { calcularPrecoPrazo, CepResponse, consultarCep, rastrearEncomendas } from 'correios-brasil';
import { InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { InformacoesContatoService } from '../../services';

export class CorreiosClient {

  async ConsultarCep(cep:string) : Promise<CepResponse>{
    return await consultarCep(cep) as CepResponse;
  }

  //TODO = REFACTOR GETTING ALL PRODUCT DIMENTIONS FROM DB
  async CalcularPrecoPrazoPorOrcamento(orcamento:Orcamento){
    const informacoesContatoService = new InformacoesContatoService();

    const cepOrigem = await informacoesContatoService.LerPrimeiro() as InformacoesContato;
    const cepDestino = orcamento.Usuario.EnderecoEntrega.CEP;
    const peso = orcamento.DimensoesObjs.map(x=>x.Peso).reduce((a,b)=>a+b).toString();
    const comprimento = orcamento.DimensoesObjs.map(x=>x.Comprimento).reduce((a,b)=>a+b).toString();
    const altura = orcamento.DimensoesObjs.map(x=>x.Altura).reduce((a,b)=>a+b).toString()
    const largura = orcamento.DimensoesObjs.map(x=>x.Largura).reduce((a,b)=>a+b).toString()

    const args = this.getPrecoPrazoArgs(cepOrigem.CEP,cepDestino,peso,comprimento,altura,largura);

    return await calcularPrecoPrazo(args);
  }

  async CalcularPrecoPrazoPorProduto(produto:Produto, cep:string){
    const informacoesContatoService = new InformacoesContatoService();

    const cepOrigem = await informacoesContatoService.LerPrimeiro() as InformacoesContato;
    const cepDestino = cep;
    const peso = produto.Peso.toString();
    const comprimento = produto.Dimensoes.Comprimento.toString();
    const altura = produto.Dimensoes.Altura.toString();
    const largura = produto.Dimensoes.Largura.toString();

    const args = this.getPrecoPrazoArgs(cepOrigem.CEP,cepDestino,peso,comprimento,altura,largura);
    console.log(args);
    return await calcularPrecoPrazo(args);
  }

  async RastrearEncomendas(codRastreio:string[]){
    return await rastrearEncomendas(codRastreio);
  }

  getPrecoPrazoArgs(cepOrigem,cepDestino,peso,comprimento,altura,largura){
    return {
      sCepOrigem: cepOrigem??"33823-390",
      sCepDestino: cepDestino,
      nVlPeso: peso,
      nCdFormato: '1',
      nVlComprimento: comprimento,
      nVlAltura: altura,
      nVlLargura: largura,
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço 04014 = SEDEX à vista // 04510 = PAC à vista
      nVlDiametro: '0',
    };
  }
}
