import { entities } from '@personalizados-lopes/data';
import { MensagemService } from './mensagem.service';
import { SobreService } from './sobre.service';
import { InformacoesContatoService } from './informacoescontato.service';

import { Repository } from '../../repositories/repository';
import { EmailService } from '../external/email.service';
import { InformacoesContato, Sobre, Usuario } from 'libs/data/src/lib/classes';
import { BaseService } from '../baseService';

export class FeedbackService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Feedback.NomeID);

  }
  async FiltrarFeedbacksPorUsuario(user:Usuario){
    return Repository.Filter(entities.Feedback.NomeID, {"Usuario.CPF" : user.CPF}).then(x => {
        return x;
    }).catch(ex=>{
      throw ex;
    });
  }
  async Inserir(Usuario:entities.Usuario, Feedback:entities.Feedback){
    return Repository.Insert(entities.Feedback.NomeID, Feedback).then(async x => {
      let ServicoMensagens = new MensagemService();
      let ServicoInfoContato = new InformacoesContatoService();
      let ServicoSobre = new SobreService();
      let emailService = new EmailService();
      const InfoContato = await ServicoInfoContato.LerPrimeiro() as InformacoesContato;
      const Sobre = await ServicoSobre.LerPrimeiro() as Sobre;
      const msg = await ServicoMensagens.Ler();
      let mensagem_Feedback = ServicoMensagens.SubstituirChavesMensagemFeedback(msg[0].EmailRecebimentoFeedback||"",Feedback);
      await emailService.SendHtmlMessage(
        {
          to: Feedback.Usuario.Email,
          toName:Feedback.Usuario.Nome,
          from:InfoContato.Email,
          fromName:Sobre.Nome,
          subject:`Pedido no ${Sobre.Nome}`,
          text:"Recebemos seu pedido, e retornaremos dentro de 24 horas.",
          html:mensagem_Feedback
        }
      );
      return x;
    });
  }

}
