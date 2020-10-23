import { entities, enums } from '@personalizados-lopes/data';
import { Mensagem } from 'libs/data/src/lib/classes';
import { MensagemService } from './mensagem.service';
import { SobreService } from './sobre.service';
import { InformacoesContatoService } from './informacoescontato.service';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

import { Repository } from '../repositories/repository';
import { EmailService } from './email.service';

export class OrcamentoService {

    async Ler(){
        return  Repository.List(entities.Orcamento.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Orcamento.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Orcamento:entities.Orcamento){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Orcamento.NomeID, Orcamento._id, Orcamento).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Orcamento.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Orcamento:entities.Orcamento){
       // if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Orcamento.NomeID, Orcamento).then(async x => {
              let ServicoMensagens = new MensagemService();
              let ServicoInfoContato = new InformacoesContatoService();
              let ServicoSobre = new SobreService();
              let emailService = new EmailService();
              const InfoContato = await ServicoInfoContato.Ler();
              const Sobre = await ServicoSobre.Ler();
              const msg = await ServicoMensagens.Ler();
              let mensagem_orcamento = ServicoMensagens.SubstituirChavesMensagemOrcamento(msg[0].EmailRecebimentoOrcamento,Orcamento);
              await emailService.HtmlMessage(Orcamento.Usuario.Email,
                Orcamento.Usuario.Nome,
                InfoContato.Email,
                Sobre.Nome,
                `Orçamento no ${Sobre.Nome}`,
                "Recebemos seu orçamento, e retornaremos dentro de 24 horas.",
                mensagem_orcamento
              );
              return x;
            });
       // }
    }

}
