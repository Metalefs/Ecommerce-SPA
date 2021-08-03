import { Injectable } from '@angular/core';
import { CorProdutoService, FornecedorProdutoService, ProdutoService, TamanhoProdutoService } from 'apps/app-web/src/app/data/service';
import { CategoriaService, ImagemService } from 'apps/app-web/src/app/data/service';
import { BlogPost, CorProduto, FornecedorProduto, TamanhoProduto } from 'libs/data/src/lib/classes';
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
    private fornecedorProdutoService:FornecedorProdutoService,
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
  CarregarFornecedores(){
    return this.fornecedorProdutoService.Ler() as Observable<Array<FornecedorProduto>>;
  }
  FiltrarProdutos(fields:FiltrarProdutoSearchQuery, page:number = 1, limit:number = 12){
    return this.produtoService.FiltrarProdutos(fields,page,limit);
  }
  CriarPostagem(post: BlogPost){
    return this.blogService.create(post);
  }
  CriarFornecedor(fornecedor:FornecedorProduto){
    return this.fornecedorProdutoService.Incluir(fornecedor);
  }
  CriarCorProduto(corProduto:CorProduto){
    return this.corProdutoService.Incluir(corProduto);
  }
  CriarTamanhoProduto(tamanho:TamanhoProduto){
    return this.tamanhoProdutoService.Incluir(tamanho);
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
