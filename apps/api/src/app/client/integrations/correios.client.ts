import { calcularPrecoPrazo, CepResponse, consultarCep, rastrearEncomendas } from 'correios-brasil';
import { InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { InformacoesContatoService } from '../../services';

export class CorreiosClient {

  async ConsultarCep(cep:string) : Promise<CepResponse>{
    return await consultarCep(cep) as CepResponse;
  }

  //TODO = Para envios normais (PAC, SEDEX E E-SEDEX), as dimensões não podem passar de 105 centímetros e os mínimos são C=16  L=11  A=2.
  async CalcularPrecoPrazo(peso, comprimento, altura, largura, cep:string){
    const informacoesContatoService = new InformacoesContatoService();

    const cepOrigem = await informacoesContatoService.LerPrimeiro() as InformacoesContato;
    const cepDestino = cep;

    const args = this.getPrecoPrazoArgs(cepOrigem.CEP,cepDestino,peso,comprimento,altura,largura);

    return await calcularPrecoPrazo(args);
  }

  async CalcularPrecoPrazoPorProduto(produto:Produto, cep:string){

    const peso = produto.Peso?.toString() ?? 2;
    const comprimento = produto.Dimensoes.Comprimento.toString();
    const altura = produto.Dimensoes.Altura.toString();
    const largura = produto.Dimensoes.Largura.toString();

    return await this.CalcularPrecoPrazo(peso,comprimento,altura,largura,cep);
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
