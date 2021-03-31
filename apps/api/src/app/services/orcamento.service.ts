import { entities, enums } from '@personalizados-lopes/data';
import { MensagemService } from './mensagem.service';
import { SobreService } from './sobre.service';
import { InformacoesContatoService } from './informacoescontato.service';

import { Repository } from '../repositories/repository';
import { EmailService } from './email.service';
import { Usuario } from 'libs/data/src/lib/classes';

var ObjectId = require('mongodb').ObjectID;

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
    async FiltrarOrcamentosPorUsuario(user:Usuario){
      return Repository.Filter(entities.Orcamento.NomeID, {"Usuario.CPF" : user.CPF}).then(x => {
          return x;
      }).catch(ex=>{
        throw ex;
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
      if(await this.Filtrar({IDPagamento:Orcamento.ResultadoPagamentoMP.payment_id}) == 0)
      return Repository.Insert(entities.Orcamento.NomeID, Orcamento).then(async x => {
        let ServicoMensagens = new MensagemService();
        let ServicoInfoContato = new InformacoesContatoService();
        let ServicoSobre = new SobreService();
        let emailService = new EmailService();
        const InfoContato = await ServicoInfoContato.Ler();
        const Sobre = await ServicoSobre.Ler();
        const msg = await ServicoMensagens.Ler();
        let mensagem_orcamento = ServicoMensagens.SubstituirChavesMensagemOrcamento(msg[0].EmailRecebimentoOrcamento,Orcamento);
        await emailService.SendHtmlMessage(
          {
            to: Orcamento.Usuario.Email,
            toName:Orcamento.Usuario.Nome,
            from:InfoContato.Email,
            fromName:Sobre.Nome,
            subject:`Pedido no ${Sobre.Nome}`,
            text:"Recebemos seu pedido, e retornaremos dentro de 24 horas.",
            html:mensagem_orcamento
          }
        );
        return x;
      });
    }

}
