import { email } from '../../config';
import { entities } from '@personalizados-lopes/data';
import { InformacoesContatoService } from './informacoescontato.service';
import { MensagemService } from './mensagem.service';
import { info } from 'console';

const nodemailer = require("nodemailer");

export class EmailService {
    async SendRegistrationMessage(NovoUsuario:entities.Usuario){
      let ServicoInfoContato = new InformacoesContatoService();
      let ServicoMensagens = new MensagemService();
      const InfoContato = await ServicoInfoContato.Ler();
      const Mensagens = await ServicoMensagens.Ler();
      let mensagem_registro = ServicoMensagens.SubstituirChaves(Mensagens[0].EmailCadadastroUsuario,NovoUsuario);
      await this.SendHtmlMessage({
          to: NovoUsuario.Email,
          toName:'',
          from: InfoContato.Email,
          fromName:'',
          subject: 'Registro no Personalizados Lopes',
          text: mensagem_registro||'', //DEFAULT : Você se cadastrou no nosso serviço de entrega, acesse ao site para conferir as suas opções.
          html: mensagem_registro,
      });
    }

    async SendHtmlMessage(EmailInfo:EmailInfo){
      let ServicoInfoContato = new InformacoesContatoService();
      const InfoContato = await ServicoInfoContato.Ler();
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: InfoContato.Email, // generated ethereal user
          pass: email.secret, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"${EmailInfo.fromName}" <${EmailInfo.from}>'`, // sender address
        to: `"${EmailInfo.toName}" <${EmailInfo.to}>'`, // list of receivers
        subject: EmailInfo.subject, // Subject line
        text: EmailInfo.text, // plain text body
        html: EmailInfo.html, // html body
        cc:EmailInfo.from
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return info;
    }
}
export interface EmailInfo{
  to:string;
  toName:string;
  from:string;
  fromName:string;
  subject:string;
  text:string;
  html:string;
}

