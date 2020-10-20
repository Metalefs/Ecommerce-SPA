import { entities } from '@personalizados-lopes/data';

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
}
