import { entities } from '@personalizados-lopes/data';
import { Orcamento } from 'libs/data/src/lib/classes';
import { InformacoesContatoService } from './informacoescontato.service';
import { MensagemService } from './mensagem.service';



export class EmailService {
    static async RegistrationMessage(NovoUsuario:entities.Usuario){
      let ServicoInfoContato = new InformacoesContatoService();
      let ServicoMensagens = new MensagemService();
      const InfoContato = await ServicoInfoContato.Ler();
      const Mensagens = await ServicoMensagens.Ler();
      let mensagem_registro = ServicoMensagens.SubstituirChaves(Mensagens[0].EmailCadadastroUsuario,NovoUsuario);
      return {
            to: NovoUsuario.Email,
            from: InfoContato.Email,
            subject: 'Registro no Personalizados Lopes',
            text: mensagem_registro||'', //DEFAULT : Você se cadastrou no nosso serviço de entrega, acesse ao site para conferir as suas opções.
            html: mensagem_registro,
        };
    }

    async HtmlMessage(to:string,toName:string, from:string, fromName:string ,subject:string,text:string,html:string){


    }

}

