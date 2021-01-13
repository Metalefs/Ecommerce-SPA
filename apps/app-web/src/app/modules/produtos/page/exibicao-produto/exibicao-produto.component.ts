import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ComentarioProduto, InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GostarProduto, LerProduto, RateProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, pipe, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {GalleryConfig, ThumbnailsPosition, GalleryItem, Gallery } from 'ng-gallery';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDisplayComponent } from 'apps/app-web/src/app/shared/components/dialogs/checkout-display/checkout-display.component';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarCategoriaFiltroProduto } from 'apps/app-web/src/app/data/store/actions/filtroproduto.actions';
import { sum, translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';

import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import { ComentarioProdutoService, ProdutoService } from 'apps/app-web/src/app/data/service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'personalizados-lopes-exibicao-produto',
  templateUrl: './exibicao-produto.component.html',
  styleUrls: ['./exibicao-produto.component.scss']
})
export class ExibicaoProdutoComponent implements OnInit {
  galleryConfig$: Observable<GalleryConfig>;
  textoAdicionar:string = 'Comprar';
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
  arte_traseira:boolean=false;

  ComentariosProduto:ComentarioProduto[];
  Comentarios:Comentario[] = [];

  constructor(
    breakpointObserver: BreakpointObserver,
    private gallery: Gallery,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: MatDialog,
    private ComentarioProdutoService: ComentarioProdutoService,
    private snack: MatSnackBar,
    private servicoProduto:ProdutoService
    ) {

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
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
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
  fileNames:string="";
  secondaryfileNames:string="";

  upload($event){
    getPreviewURL($event,this.fileNames,(res,name)=>{this.Produto.Arte = res;this.fileNames = name})
  }
  uploadSecundario($event){
    getPreviewURL($event,this.secondaryfileNames,(res,name)=>{this.Produto.ArteSecundaria = res;this.secondaryfileNames = name})
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
    this.readonlyRating = localStorage.getItem(`rateproduto${id}`) == 'true' ? true: false;
    const galleryRef = this.gallery.ref('myGallery');
    galleryRef.reset();

    if(!this.orcamentoId){
      this.isOrcamento = false;
      this.servicoProduto.Filtrar(id).subscribe(prod=>{
        console.log(prod)
        this.Produto = prod[0];
        if(!prod)
        this.router.navigateByUrl('/produtos');
        prod[0]?.Imagem.forEach(img =>{
          galleryRef.addImage({ src:img, thumb: img });
        });
      })
    }
    else{
      this.isOrcamento = true;
      this.Orcamento$.subscribe( res => {
        const index = res.Produto.findIndex(item => item.codOrcamento === this.orcamentoId);
        if(index<0)
        this.router.navigateByUrl('/produtos');
        this.Produto = res.Produto[index].Produto;
        this.Produto.Imagem.forEach(img =>{
          galleryRef.addImage({ src:img, thumb: img });
        });
      });
    }

    this.LerComentariosProduto(id);
  }

  LerComentariosProduto(idProduto:string){
    this.ComentarioProdutoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Comentarios = [];
      this.ComentariosProduto = data.filter(x=>x.IdProduto == this.Produto._id);
      this.ComentariosProduto.forEach(x=>{
        x.Comentario.key = x.key;
        this.Comentarios.push(x.Comentario)
      })
      console.log(this.ComentariosProduto)
      this.loading = false;
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
  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;
  readonlyRating:boolean = false;
  onClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);

    if(!localStorage.getItem(`rateproduto${this.Produto._id}`)){
      this.loading = true;
      this.store.dispatch(new RateProduto(this.Produto._id, $event.rating)).subscribe(x=>{
        this.readonlyRating = true;
        localStorage.setItem(`rateproduto${this.Produto._id}`, $event.rating.toString());
        this.loading = false;
      });
    }
    else
      return

  };

  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return (sum(this.Produto.Rating||0) / this.Produto.Rating.length||0).toFixed(1)
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };

  Comentar(Comentario:Comentario){
    console.log(Comentario)
    if(localStorage.getItem(`rateproduto${this.Produto._id}`)){
      let avaliacao = localStorage.getItem(`rateproduto${this.Produto._id}`);
      let comentarioProduto:ComentarioProduto = new ComentarioProduto(this.Produto._id,Comentario,[],parseInt(avaliacao))
      comentarioProduto.Respostas = [];
      comentarioProduto.DataHoraAlteracao = new Date();
      comentarioProduto.DataHoraCriacao = new Date();

      comentarioProduto.Avaliacao = parseInt(avaliacao);
      this.ComentarioProdutoService.create(comentarioProduto);
    }else{
      this.snack.open('Por favor, avalie o produto primeiro',"fechar");
    }
  }

}
