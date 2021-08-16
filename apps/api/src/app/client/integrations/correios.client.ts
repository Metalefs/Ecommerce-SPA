import {calcularPrecoPrazo, CepResponse, consultarCep, rastrearEncomendas} from 'correios-brasil';
import { Orcamento } from 'libs/data/src/lib/classes';
import { SobreService } from '../../services';

export module Correios {
  const ServicoSobre = new SobreService();

  async function ConsultarCep(cep:string) : Promise<CepResponse>{
    //
    return await consultarCep(cep) as CepResponse;
  }

  //TODO = REFACTOR GETTING ALL PRODUCT DIMENTIONS FROM DB
  async function CalcularPrecoPrazo(orcamento:Orcamento){
    const CEP = await this.ServicoSobre.LerPrimeiro().CEP;

    const args = {
      sCepOrigem: CEP,
      sCepDestino: orcamento.Usuario.EnderecoEntrega.CEP,
      nVlPeso: orcamento.DimensoesObjs.map(x=>x.Peso).reduce((a,b)=>a+b).toString(),
      nCdFormato: '1',
      nVlComprimento: orcamento.DimensoesObjs.map(x=>x.Comprimento).reduce((a,b)=>a+b).toString(),
      nVlAltura: orcamento.DimensoesObjs.map(x=>x.Altura).reduce((a,b)=>a+b).toString(),
      nVlLargura: orcamento.DimensoesObjs.map(x=>x.Largura).reduce((a,b)=>a+b).toString(),
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço 04014 = SEDEX à vista // 04510 = PAC à vista
      nVlDiametro: '0',
    };

    return calcularPrecoPrazo(args).then((response) => {
      console.log(response);
    });
  }

  async function RastrearEncomendas(codRastreio:string[]){
    return await rastrearEncomendas(codRastreio);
  }
}
