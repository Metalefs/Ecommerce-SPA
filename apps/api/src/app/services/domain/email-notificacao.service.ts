import { entities, enums } from '@personalizados-lopes/data';
import { EmailNotificacao, Produto } from 'libs/data/src/lib/classes';
import { Repository } from '../../repositories/repository';

import { BaseService } from '../baseService';
import { EmailService } from '../external/email.service';

export class EmailNotificacaoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.EmailNotificacao.NomeID);

  }
  async Inserir(EmailNotificacao:entities.EmailNotificacao){
    return Repository.Insert(entities.EmailNotificacao.NomeID, EmailNotificacao).then(x => {
        return x;
    });
}
  async EnviarEmailNotificacaoReestoqueProduto(Produto:Produto){
    let interessados = await this.Ler() as EmailNotificacao[];
    interessados.forEach((interessado : EmailNotificacao)=>{
      if(interessado.ProdutoNotificacao){
        if(interessado.ProdutoNotificacao?._id == Produto._id){
          let emailService = new EmailService();
          let link = "https://personalizadoslopes.com.br/produtos/"+interessado.ProdutoNotificacao?._id;
          emailService.SendReestockEmail(interessado.Email, Produto, link);
        }
      }
    })
  }
}
