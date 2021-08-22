import { entities } from '@personalizados-lopes/data';
import { Mensagem, Pedido, Produto } from 'libs/data/src/lib/classes';

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
  SubstituirChavesMensagemFeedback(Mensagem:string, Feedback:entities.Feedback){
    Mensagem = Mensagem.replace("{{USUARIO}}", Feedback.Usuario.Nome);
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
    Mensagem = Mensagem.replace("{{PRODUTO}}", `<div> <h1>${produto.Nome}</h1> ${this.obterFotoProdutoHTML(produto)} </div>`);
    Mensagem = Mensagem.replace("{{LINKPRODUTO}}", '<a href="'+link+'">Página do produto</a>');
    return Mensagem;
  }
  SubstituirEmailCadastroCodRastreamentoPedido(Mensagem:string, pedido:Pedido, codRastreamento:string){
    Mensagem = Mensagem.replace("{{USUARIO}}", `<div> <h1>${pedido?.Usuario?.Nome}</h1> </div>`);
    Mensagem = Mensagem.replace("{{PEDIDO}}", `<div>  <h1>Pedido</h1> ${this.tabelaProdutosPedido(pedido)} </div>`);
    Mensagem = Mensagem.replace("{{CODIGORASTREAMENTO}}", `<a href="https://www2.correios.com.br/sistemas/rastreamento/?objetos=${codRastreamento}">Abrir no site dos correios > ${codRastreamento}</a> <hr> Caso o botão não funcione, copie e cole o link a seguir no navegador: https://www2.correios.com.br/sistemas/rastreamento/?objetos=${codRastreamento}`);
    return Mensagem;
  }
  private obterFotoProdutoHTML(produto:Produto){
    return  `<figure><img src="${produto?.Imagem[0] || ''} width="500" height="500"/></figure>`
  }
  private tabelaProdutosPedido(pedido:Pedido){
    let LinhasProdutos = "";
    for(let i = 0; i < pedido?.Produto?.length; i++){
      LinhasProdutos+= `
        <tr>
          <td>
            ${this.obterFotoProdutoHTML(pedido?.Produto[i]?.Produto)} <p>${pedido?.Produto[i]?.Produto?.Nome}</p>
          </td>
          <td>
            <p>${pedido?.Produto[i]?.Produto?.Preco}</p>
          </td>
        </tr>
      `;
    }
    let Table = `
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        ${LinhasProdutos}
      </tbody>
    </table>
    `;
    return Table;
  }
}
