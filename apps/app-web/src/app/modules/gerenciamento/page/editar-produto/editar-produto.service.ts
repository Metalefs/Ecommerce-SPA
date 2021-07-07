import { Injectable } from '@angular/core';
import { CorProdutoService, ProdutoService, TamanhoProdutoService } from 'apps/app-web/src/app/data/service';
import { CategoriaService, ImagemService } from 'apps/app-web/src/app/data/service';
import { BlogPost, CorProduto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../../blog/blog.service';

@Injectable({
  providedIn: 'root'
})
export class EditarProdutoService {

  constructor(
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService,
    private corProdutoService:CorProdutoService,
    private tamanhoProdutoService:TamanhoProdutoService,
    private blogService:BlogPostService,
    private servicoImagem:ImagemService) { }

  CarregarCategorias(){
    return this.categoriaService.Ler();
  }
  CarregarCores(){
    return this.corProdutoService.Ler() as Observable<Array<CorProduto>>;
  }
  CarregarTamanhos(){
    return this.tamanhoProdutoService.Ler() as Observable<Array<TamanhoProduto>>;
  }
  FiltrarProdutos(fields:FiltrarProdutoSearchQuery, page:number = 1, limit:number = 12){
    return this.produtoService.FiltrarProdutos(fields,page,limit);
  }
  CriarPostagem(post: BlogPost){
    return this.blogService.create(post);
  }
  SalvarImagemCliente(imagem: any){
    return this.servicoImagem.storeImage(PathDictionary.clientes, imagem);
  }
  async ObterCaminhoImagem(a,b,c){
    return this.servicoImagem.getRef(a, b, c);
  }
  async Remover(id){
    return this.produtoService.Remover(id);
  }
}
