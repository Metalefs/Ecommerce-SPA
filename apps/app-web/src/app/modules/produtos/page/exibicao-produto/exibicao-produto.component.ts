import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GostarProduto, LerProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, pipe, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {GalleryConfig, ThumbnailsPosition, GalleryItem, Gallery } from 'ng-gallery';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDisplayComponent } from 'apps/app-web/src/app/shared/components/dialogs/checkout-display/checkout-display.component';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarCategoriaFiltroProduto } from 'apps/app-web/src/app/data/store/actions/filtroproduto.actions';
import { translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';

@Component({
  selector: 'personalizados-lopes-exibicao-produto',
  templateUrl: './exibicao-produto.component.html',
  styleUrls: ['./exibicao-produto.component.scss']
})
export class ExibicaoProdutoComponent implements OnInit {
  galleryConfig$: Observable<GalleryConfig>;
  textoAdicionar:string = 'Adicionar ao carrinho';
  textoAtualizar:string = 'Atualizar carrinho';
  textoEsgotado:string  = 'Esgotado';
  Url:string;
  Produto:Produto;
  statusProduto=StatusProduto;
  Liked:boolean = false;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  areProdutosLoadedSub: Subscription;
  images: GalleryItem[];
  images$: Observable<GalleryItem[]>;
  isOrcamento:boolean = false;
  loading:boolean = false;
  el = document.createElement( 'html' );
  constructor(
    breakpointObserver: BreakpointObserver,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private gallery: Gallery,
    private store: Store,
    public dialog: MatDialog,) {

      this.galleryConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
            return {
              thumbPosition: ThumbnailsPosition.Bottom,
              thumbWidth: 80,
              thumbHeight: 80,
            };
          }
          return {
            thumbPosition: ThumbnailsPosition.Bottom,
            thumbWidth: 120,
            thumbHeight: 90
          };
        })
      );
    }

  ngOnInit(): void {
    this.LerProdutosCarregados();
    this.activeRoute.params.subscribe(routeParams => {
      this.LerProdutosCarregados();
    });
    if(this.Produto.Quantidade == 0)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
    this.Url = `https://${window.location.href}`;
    if(this.Produto.Status == StatusProduto.esgotado)
      this.textoAdicionar = this.textoEsgotado;


    this.el.innerHTML = this.Produto?.Descricao;
    this.el.querySelectorAll( 'oembed[url]' ).forEach( element => {
      // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
      // to discover the media.
      const anchor = document.createElement( 'a' );

      anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
      anchor.className = 'embedly-card';

      element.appendChild( anchor );
    } );
  }

  SelecionarTamanho(tamanho:string){
    this.Produto.Tamanho = this.Produto.Tamanho == tamanho ? null: tamanho
  }

  AdicionarAoOrcamento(){
    this.Orcamento$.subscribe(x=>{
      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);

      if(!this.orcamentoId){
        this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto)).subscribe(x=>{
          this.orcamentoId = x.codOrcamento;
        });
        this.navegarParaCheckout();
      }
      else{
        this.Produto.Quantidade += ProdutosOrcamento[0].Produto.Quantidade;
        this.store.dispatch(new EditarProdutoOrcamentoLocal(this.Produto,this.Produto._id,this.orcamentoId));
        this.navegarParaCheckout();
        this.openCheckout();
      }
      this.textoAdicionar = this.textoAtualizar;
      this.isOrcamento = true;

    });
  }
  DuplicarOrcamento(){
    this.Orcamento$.subscribe(x=>{
      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);

      if(ProdutosOrcamento.length == 0){
        return
      }
      else{
        this.isOrcamento = false;
        this.store.dispatch(new DuplicarProdutoOrcamento(this.Produto)).subscribe(x=>{
          this.isOrcamento = true;
          this.navegarParaCheckout();
        });
      }

    });
  }

  editarCategoriaFiltroProduto(){
    this.store.dispatch(new EditarCategoriaFiltroProduto(this.Produto.Categoria)).subscribe();
  }

  navegarParaCheckout(){
     setTimeout(()=>{
      this.router.navigateByUrl("/checkout");
    },1500)
  }
  fileNames:string="nenhum arquivo selecionado.";

  upload($event){
    getPreviewURL($event,this.Produto,this.fileNames)
  }
  produtoNoCheckout(){
    return this.Orcamento$.subscribe(x=>{
      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);
      if(ProdutosOrcamento.length == 0){
        this.isOrcamento = false;
      }
      else{
        this.textoAdicionar = this.textoAtualizar;
        this.isOrcamento = true;
      }
    });
  }

  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      height:'100vh',
      position:{
        right:'0'
      },
      panelClass:['no-padding']
    });
  }
  Like(){
    if(!localStorage.getItem(`heartproduto${this.Produto._id}`)){
      this.loading = true;
      this.store.dispatch(new GostarProduto(this.Produto._id)).subscribe(x=>{
        this.Liked = true;
        localStorage.setItem(`heartproduto${this.Produto._id}`,'true');
        this.loading = false;
      });
    }
    else
      return
  }

  IncrementarQuantidade(){
    this.Produto.Quantidade++;
  }
  DecrescerQuantidade(){
    if(this.Produto.Quantidade > this.Produto.QuantidadeMinima)
    this.Produto.Quantidade--;
  }
  VerificarQuantidade($event){
    if($event.target.value < this.Produto.QuantidadeMinima)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
  }
  EntrarEmContato(){
    this.InformacoesContato$.subscribe(x=>{
      let Whatsapp = x.Whatsapp;
      let Mensagem = `Olá, gostaria de ter mais informações sobre *${this.Produto.Nome}* ${this.Url}`;

      window.open( `https://wa.me/${Whatsapp}?text=${Mensagem}`, "_blank");
    })
  }
  orcamentoId:string;
  LerProdutosCarregados(){
    let id = this.activeRoute.snapshot.params['id'];
    this.orcamentoId = this.activeRoute.snapshot.params['orcamentoId'];

    this.Liked = localStorage.getItem(`heartproduto${id}`) == 'true' ? true: false;

    const galleryRef = this.gallery.ref('myGallery');
    if(!this.orcamentoId){
      this.isOrcamento = false;
      this.Produtos$.subscribe( res => {
        const index = res.findIndex(item => item._id === id);
        this.Produto = res[index];
        if(!this.Produto)
          this.router.navigateByUrl('/produtos');
      });
    }
    else{
      this.isOrcamento = true;
      this.Orcamento$.subscribe( res => {
        const index = res.Produto.findIndex(item => item.codOrcamento === this.orcamentoId);
        if(index<0)
          this.router.navigateByUrl('/produtos');
        this.Produto = res.Produto[index].Produto;
      });
    }
    this.Produto?.Imagem.forEach(img =>{
      console.log(img);
      galleryRef.addImage({ src:img, thumb: img });
    });
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
  RecarregarProdutos(){
    this.areProdutosLoadedSub = this.areProdutosLoaded$.pipe(
      tap((areProdutosLoaded) => {
        if(!areProdutosLoaded)
          this.store.dispatch(new LerProduto());
      })
    ).subscribe(value => {
      console.log(value);
    });
  }
}
