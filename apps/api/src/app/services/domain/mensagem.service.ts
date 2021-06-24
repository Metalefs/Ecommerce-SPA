import { entities, enums } from '@personalizados-lopes/data';
import { Mensagem, Produto } from 'libs/data/src/lib/classes';

import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';

export class MensagemService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Mensagem.NomeID);

  }
  async Ler() : Promise<Mensagem[]>{
      return Repository.List(entities.Mensagem.NomeID).then((x:Mensagem[]) => {
        if(x){
          let arr = [];
          arr.push(x[x.length -1]);
          return arr;
        }
        return x;
      });
  }
  SubstituirChavesMensagemOrcamento(Mensagem:string, Orcamento:entities.Orcamento){
    let produtos = "";
    Orcamento.Produto.forEach(x=>produtos += x.Produto.Nome + ", ");
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
  SubstituirChavesReestoqueProduto(Mensagem:string, produto:Produto, link:string){
    let fotoProduto=`<figure><img src="${produto.Imagem[0] || ''} width="100"  height="100"/></figure>`
    Mensagem = Mensagem.replace("{{PRODUTO}}", fotoProduto+produto.Nome);
    Mensagem = Mensagem.replace("{{LINKPRODUTO}}", '<a href="'+link+'">Página do produto</a>');
    return Mensagem;
  }
}
