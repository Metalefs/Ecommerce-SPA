import { entities, enums } from '@personalizados-lopes/data';
import { Mensagem } from 'libs/data/src/lib/classes';

import { Repository } from '../repositories/repository';

export class MensagemService {

    async Ler() : Promise<Mensagem[]>{
        return Repository.List(entities.Mensagem.NomeID).then((x:Mensagem[]) => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Mensagem.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Mensagem:entities.Mensagem){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Mensagem.NomeID, Mensagem._id, Mensagem).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Mensagem.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Mensagem:entities.Mensagem){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Mensagem.NomeID, Mensagem).then(x => {
                return x;
            });
        }
    }
    SubstituirChavesMensagemOrcamento(Mensagem:string, Orcamento:entities.Orcamento){
      let produtos = "";
      Orcamento.Produto.forEach(x=>produtos += x.Nome + ", ");
      Mensagem = Mensagem.replace("{{USUARIO}}", Orcamento.Usuario.Nome);
      Mensagem = Mensagem.replace("{{PRODUTO}}", produtos);
      return Mensagem;
    }
    SubstituirChaves(Mensagem:string, Usuario:entities.Usuario){
      Mensagem = Mensagem.replace("{{USUARIO}}", Usuario.Nome);
      return Mensagem;
    }
    SubstituirChavesTrocaSenha(Mensagem:string, Usuario:entities.Usuario, Senha:string){
      Mensagem = Mensagem.replace("{{USUARIO}}", Usuario.Nome);
      Mensagem = Mensagem.replace("{{SENHA}}", Senha);
      return Mensagem;
    }
}
