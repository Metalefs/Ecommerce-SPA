import { entities, enums } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EmailNotificacaoService } from './email-notificacao.service';
import { Repository } from '../../repositories/repository';
import { PaginationResponse } from 'libs/data/src/lib/interfaces';
import { BaseService } from '../baseService';
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
    return this.FiltrarUm({ "_id": new ObjectId(id) }).then((produto: Produto) => {
      if (!Object.keys(produto).includes('Likes')) Object.assign(produto, { Likes: 1 });
      let value = parseInt(produto.Likes.toString()||'1') + 1;
      return Repository.Edit(entities.Produto.NomeID, id, { Likes: value }).then(y => {
        return y;
      });
    });
  }

  async IncrementarVenda(id: string) {
    return this.FiltrarUm({ "_id": new ObjectId(id) }).then((produto: Produto) => {
      if (!Object.keys(produto).includes('Vendas')) Object.assign(produto, { Vendas: 1 });
      let value = parseInt(produto.Vendas.toString()||'1') + 1;
      return Repository.Edit(entities.Produto.NomeID, id, { Vendas: value }).then(y => {
        return y;
      });
    });
  }

  async IncrementarVisualizacoes(id: string) {
    return this.FiltrarUm({ "_id": new ObjectId(id) }).then((produto: Produto) => {
      if (!Object.keys(produto).includes('Visualizacoes')) Object.assign(produto, { Visualizacoes: 1 });
      let value = parseInt(produto.Visualizacoes.toString()||'1') + 1;
      return Repository.Edit(entities.Produto.NomeID, id, { Visualizacoes: value }).then(y => {
        return y;
      });
    });
  }

  async Rate(id: string, rating: number) {
    return this.Filtrar({ "_id": new ObjectId(id) }).then((produto: Produto) => {
      if (!produto.Rating) Object.assign(produto, { Rating: [rating] });
      return Repository.Edit(entities.Produto.NomeID, id, { Rating: produto.Rating.push(rating) }).then(y => {
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
