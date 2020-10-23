import { entities } from '@personalizados-lopes/data';
import { Orcamento } from 'libs/data/src/lib/classes';


var SibApiV3Sdk = require('sib-api-v3-sdk');

export class EmailService {

    static RegistrationMessage(NovoUsuario:entities.Usuario){
        return {
            to: NovoUsuario.Email,
            from: 'suporte@elshaddaymarmitex.com',
            subject: 'Registro no ElShadday Marmitex',
            text: 'Você se cadastrou no nosso serviço de entrega, acesse ao site para conferir as suas opções.',
            html: '<strong><a href="https://elshadday-angular.herokuapp.com">ElShadday</a></strong>',
        };
    }

    async HtmlMessage(to:string,toName:string, from:string, fromName:string ,subject:string,text:string,html:string){

        var defaultClient = SibApiV3Sdk.ApiClient.instance;

        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = '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';

        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

        sendSmtpEmail.to = [{ "email": to, "name": toName}];
        sendSmtpEmail.sender = { "email":from, "name":fromName};
        sendSmtpEmail.htmlContent = html;
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.headers = {"x-mailin-custom":"myV3Custom" };
        //sendSmtpEmail.tags = ["myTag1","myTag2"];
        //sendSmtpEmail.attachment =  [{"url": "https://example.com/ValidimageUrl1.jpg"},{"url": "https://example.com/ValidimageUrl2.jpg"}]

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
          console.log('API called successfully. Returned data: ' + data);
        }, function(error) {
          console.error(error);
        });

    }

}

