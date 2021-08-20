import { entities } from '@personalizados-lopes/data';
import { MensagemService } from './mensagem.service';
import { SobreService } from './sobre.service';
import { InformacoesContatoService } from './informacoescontato.service';

import { Repository } from '../../repositories/repository';
import { EmailService } from '../external/email.service';
import { InformacoesContato, Sobre, Usuario } from 'libs/data/src/lib/classes';
import { BaseService } from '../baseService';

export class OrcamentoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Orcamento.NomeID);

  }
  async FiltrarOrcamentosPorUsuario(user:Usuario){
    return Repository.Filter(entities.Orcamento.NomeID, {"Usuario.CPF" : user.CPF}).then(x => {
        return x;
    }).catch(ex=>{
      throw ex;
    });
  }
  async Inserir(Usuario:entities.Usuario, Orcamento:entities.Orcamento){
    console.log("inserindo orçamento")

    return Repository.Insert(entities.Orcamento.NomeID, Orcamento).then(async x => {
      return x;
    });
  }
  async InserirOrcamentoEmail(Orcamento:entities.Orcamento){
    console.log("inserindo orçamento")
    return Repository.Insert(entities.Orcamento.NomeID, Orcamento).then(async x => {
      let ServicoMensagens = new MensagemService();
      let ServicoInfoContato = new InformacoesContatoService();
      let ServicoSobre = new SobreService();
      let emailService = new EmailService();
      const InfoContato = await ServicoInfoContato.LerPrimeiro() as InformacoesContato;
      const Sobre = await ServicoSobre.LerPrimeiro() as Sobre;
      const msg = await ServicoMensagens.Ler();
      console.log(InfoContato.Email)
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
