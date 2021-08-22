import { entities } from '@personalizados-lopes/data';
import { InformacoesContato, Pedido, Sobre, Usuario } from 'libs/data/src/lib/classes';
import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';
import { EmailService } from '../external/email.service';
import { InformacoesContatoService } from './informacoescontato.service';
import { MensagemService } from './mensagem.service';
import { SobreService } from './sobre.service';

export class PedidoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Pedido.NomeID);

  }
  async FiltrarPedidosPorUsuario(user:Usuario){
    return Repository.Filter(entities.Pedido.NomeID, {"Usuario.CPF" : user.CPF}).then(x => {
      return x;
    }).catch(ex=>{
      throw ex;
    });
  }
  async FiltrarPedidosPorIdUsuario(CPF:string):Promise<Pedido[]>{
    return Repository.Filter(entities.Pedido.NomeID, {"Usuario.CPF" : CPF}).then((x:Pedido[]) => {
      return x;
    }).catch(ex=>{
      throw ex;
    });
  }
  async EnviarCodigoRastreamento(usuario:Usuario, idPedido:string, codRastreamento:string){
    let pedido = await this.FiltrarPorId(idPedido) as Pedido;
    pedido[0].CodRastreamento = codRastreamento;
    return this.Alterar(usuario,pedido[0]).then(async (x:Pedido) => {
      let ServicoMensagens = new MensagemService();
      let ServicoInfoContato = new InformacoesContatoService();
      let ServicoSobre = new SobreService();
      let emailService = new EmailService();
      const InfoContato = await ServicoInfoContato.LerPrimeiro() as InformacoesContato;
      const Sobre = await ServicoSobre.LerPrimeiro() as Sobre;
      const msg = await ServicoMensagens.Ler();
      let mensagem = ServicoMensagens.SubstituirEmailCadastroCodRastreamentoPedido(msg[0].EmailCadastroCodRastreamentoPedido, x, codRastreamento);

      await emailService.SendHtmlMessage(
        {
          to: x.Usuario.Email,
          toName:x.Usuario.Nome,
          from:InfoContato.Email,
          fromName:Sobre.Nome,
          subject:`Pedido no ${Sobre.Nome}`,
          text:"Acabamos de enviar seu pedido",
          html:mensagem
        }
      );
      return x;
    });

  }
}
