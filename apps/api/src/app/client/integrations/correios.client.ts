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

  async CalcularPrecoPrazoPorOrcamento(orcamento:Orcamento){
    const cep = orcamento[0].Entrega.cep;

    const products = orcamento[0].Produto.map(x=>x.Produto);
    let volumes:number[] = [];
    let peso = 0;
    const C=16, L=11, A=2.
    //1ª Etapa – Calcula o cm³ de cada produto do carrinho
    const  FatorCubagem = 6000;
    products.forEach(product=>{
      let comprimento = product.Dimensoes?.Comprimento || C,
      largura = product.Dimensoes?.Largura || L,
      altura = product.Dimensoes?.Altura || A;
      let cubagem = ((comprimento * largura * altura) * product.Quantidade) / FatorCubagem;
      volumes.push(cubagem);
      peso += parseFloat(product.Peso)||1;
    })
    console.log(volumes, peso);
    //2ª Etapa – Soma todos os volumes
    const somaVolumes = volumes.reduce((a,b)=>a+b);

    console.log(somaVolumes);
    //3ª Etapa – Calcula raiz cúbica dos somatórios dos volumes
    const raizCubicaVolume = Math.cbrt(somaVolumes);
    console.log(raizCubicaVolume);

    let comprimento = raizCubicaVolume > C ? raizCubicaVolume : C,
    largura = raizCubicaVolume > L ? raizCubicaVolume : L,
    altura = raizCubicaVolume > A ? raizCubicaVolume : A;

    return await this.CalcularPrecoPrazo(peso, comprimento, altura, largura, cep);
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
