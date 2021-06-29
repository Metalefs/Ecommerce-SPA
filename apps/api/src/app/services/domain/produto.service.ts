import { entities, enums } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EmailNotificacaoService } from './email-notificacao.service';
import { Repository } from '../../repositories/repository';
import { PaginationResponse } from 'libs/data/src/lib/interfaces';
import { BaseService } from '../baseService';
import { MongoDocument } from 'libs/data/src/lib/classes/abstract/MongoDocument';
var ObjectId = require('mongodb').ObjectID;
export class ProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Produto.NomeID);

  }
  async Inserir(Usuario: entities.Usuario, obj: Produto) {
    if (Usuario.Tipo == enums.TipoUsuario.admin) {
      let codProduto = this.gerarCodProduto(obj);
      return Repository.Insert(entities.Produto.NomeID, obj).then(x => {
        return x;
      });
    }
  }
  async Gostar(id: string) {
    return this.Filtrar({ "_id": new ObjectId(id) }).then((x: Produto) => {
      x.Likes += 1;
      return Repository.Edit(entities.Produto.NomeID, x._id, { Likes: x.Likes }).then(y => {
        return y;
      });
    });
  }

  async IncrementarVenda(id: string) {
    return this.Filtrar({ "_id": new ObjectId(id) }).then((x: Produto) => {
      if (!x.Vendas) Object.assign(x, { Vendas: 1 });
      else x.Vendas += 1;
      return Repository.Edit(entities.Produto.NomeID, id, { Vendas: x.Vendas }).then(y => {
        return y;
      });
    });
  }

  async IncrementarVisualizacoes(id: string) {
    return this.Filtrar({ "_id": new ObjectId(id) }).then((x: Produto) => {
      console.log(x.Visualizacoes??"N/Z")
      if (!x.Visualizacoes)
      Object.assign(x, { Visualizacoes: 1 });
      else
      x.Visualizacoes +=1;
      console.log(x.Visualizacoes)
      return Repository.Edit(entities.Produto.NomeID, id, { Visualizacoes: x.Visualizacoes+1 }).then(y => {
        return y;
      });
    });
  }

  async Rate(id: string, rating: number) {
    return this.Filtrar({ "_id": new ObjectId(id) }).then((x: Produto) => {
      if (!x.Rating) Object.assign(x, { Rating: [rating] });
      else x.Rating.push(rating);
      return Repository.Edit(entities.Produto.NomeID, id, { Rating: x.Rating }).then(y => {
        return y;
      });
    });
  }

  async Search(filter: {}, limit: number, skip: number): Promise<PaginationResponse<Produto>> {
    // Find Demanded Products - Skipping page values, limit results per page
    return Repository.Paginate(entities.Produto.NomeID, filter, limit, skip).then((x: Produto[]) => {
      return this.Count(filter).then((count: number) => {
        return { items: x, total: count };
      })
    });
  }

  async Alterar(Usuario: entities.Usuario, Produto: entities.Produto) {
    if (Usuario.Tipo == enums.TipoUsuario.admin) {
      let produtoAntigo = await this.FiltrarUm({ "_id": new ObjectId(Produto._id) }) as Produto;
      if (Produto.Status != produtoAntigo.Status) {
        if (Produto.Status == StatusProduto.novo) {
          let emailNotificacaoService = new EmailNotificacaoService();
          await emailNotificacaoService.EnviarEmailNotificacaoReestoqueProduto(Produto);
        }
      }
      return Repository.Edit(entities.Produto.NomeID, Produto._id, Produto).then(x => {
        return x;
      });
    }
  }

  gerarCodProduto(produto:Produto){
    this.Count({})
  }
}
