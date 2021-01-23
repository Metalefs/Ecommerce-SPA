import { entities, enums } from '@personalizados-lopes/data';
import { EmailNotificacao, Produto, Usuario } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EmailNotificacaoService } from './email-notificacao.service';
import { email } from '../../config';

import { Repository } from '../repositories/repository';
import { EmailService } from './email.service';
import { PaginationResponse } from 'libs/data/src/lib/interfaces';
var ObjectId = require('mongodb').ObjectID;
export class ProdutoService {
    async Ler(){
        return Repository.List(entities.Produto.NomeID).then(x => {
            return x;
        });
    }
    async Gostar(id:string){
      return Repository.FindOne(entities.Produto.NomeID, { "_id": new ObjectId(id) }).then((x:  Produto)=> {
          x.Likes += 1;
          return Repository.Edit(entities.Produto.NomeID, x._id, {Likes: x.Likes}).then(y => {
            return y;
        });
      });
    }
    async IncrementarVenda(id:string){
      return Repository.FindOne(entities.Produto.NomeID, { "_id": new ObjectId(id) }).then((x:  Produto)=> {
        if(!x.Vendas)
        Object.assign(x, {Vendas: 1});
        else
        x.Vendas += 1;
          return Repository.Edit(entities.Produto.NomeID, x._id, {Vendas: x.Vendas}).then(y => {
            return y;
        });
      });
    }
    async Rate(id:string,rating:number){
      return Repository.FindOne(entities.Produto.NomeID, { "_id": new ObjectId(id) }).then((x:  Produto)=> {
        if(!x.Rating)
        Object.assign(x, {Rating: [rating]});
        else
        x.Rating.push(rating);
        return Repository.Edit(entities.Produto.NomeID, x._id, {Rating: x.Rating}).then(y => {
            return y;
        });
      });
    }
    async Filtrar(filter:{}){
      return Repository.Filter(entities.Produto.NomeID, filter).then(x => {
          return x;
      });
    }
    async Search(filter:{},limit:number,skip:number):Promise<PaginationResponse<Produto>>{
      // Find Demanded Products - Skipping page values, limit results per page

      return Repository.Paginate(entities.Produto.NomeID, filter, limit, skip).then((x :Produto[]) => {
          return this.Count(filter).then((count:number)=>{
            return {items:x, total:count};
          })
      });
    }
    async Count(filter:{}){
      return Repository.CountFilter(entities.Produto.NomeID, filter).then(x => {
          return x;
      });
    }
    async FiltrarUm(filter:{}){
      return Repository.FindOne(entities.Produto.NomeID, filter).then(x => {
          return x;
      });
    }
    async Alterar(Usuario:entities.Usuario, Produto:entities.Produto){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            let produtoAntigo = await this.FiltrarUm({ "_id": new ObjectId(Produto._id) }) as Produto;
            if(Produto.Status != produtoAntigo.Status){

              if(Produto.Status == StatusProduto.novo){
                let emailNotificacaoService = new EmailNotificacaoService();
                await emailNotificacaoService.EnviarEmailNotificacaoReestoqueProduto(Produto);
              }

            }
            return Repository.Edit(entities.Produto.NomeID, Produto._id, Produto).then(x => {
              return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Produto.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Produto:entities.Produto){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Produto.NomeID, Produto).then(x => {
                return x;
            });
        }
    }

}
