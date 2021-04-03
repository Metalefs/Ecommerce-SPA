import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ComentarioProduto, InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GostarProduto, IncrementarVisualizacoesProduto, LerProduto, RateProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, Subscription } from 'rxjs';
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

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { fade } from 'apps/app-web/src/app/animations';
import { ExibicaoArteProdutoComponent } from '../dialogs/exibicao-arte-produto/exibicao-arte-produto.component';
import { TipoOrdenacaoSwiperProduto } from 'apps/app-web/src/app/shared/components/produto-swiper/produto-swiper.component';
import { MenuItem } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollService } from 'apps/app-web/src/app/data/service/page-scroll.service';
import { WindowRef } from 'apps/app-web/src/app/data/service/window.service';
import { DocumentRef } from 'apps/app-web/src/app/data/service/document.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'personalizados-lopes-exibicao-produto',
  templateUrl: './exibicao-produto.component.html',
  styleUrls: ['./exibicao-produto.component.scss'],
  animations:[fade]
})
export class ExibicaoProdutoComponent implements OnInit, OnDestroy {
  galleryConfig$: Observable<GalleryConfig>;
  textoAdicionar:string = 'COMPRAR';
  textoAtualizar:string = 'ATUALIZAR CARRINHO';
  textoEsgotado:string  = 'Esgotado';
  Url:string;
  Produto:Produto = null;
  statusProduto=StatusProduto;
  Liked:boolean = false;
  iconeWhatsapp = faWhatsapp;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  areProdutosLoadedSub: Subscription;
  images: GalleryItem[];
  images$: Observable<GalleryItem[]>;
  isOrcamento:boolean = false;
  loading:boolean = false;
  el: HTMLElement;
  arte_traseira:boolean=false;
  items: MenuItem[];
  home: MenuItem;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;
  ComentariosProduto:ComentarioProduto[];
  Comentarios:Comentario[] = [];
  mobile:boolean;
  selected = new FormControl(0);
  infosPagamento:any = [
    { descricao: "Cartões de Crédito" },
    { descricao: "Visa - Master - Hipercard" },
    { descricao: "Diners - Amex - Elo - Hiper" },
    { descricao: "mercadopago.com.br" },
  ]
  produtoForm:FormGroup;
  CEP:string="";
  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    breakpointObserver: BreakpointObserver,
    private gallery: Gallery,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: MatDialog,
    private ComentarioProdutoService: ComentarioProdutoService,
    private snack: MatSnackBar,
    private scrollService: PageScrollService,
    private servicoProduto:ProdutoService,
    private windowRef: WindowRef,
    private document: DocumentRef,
    private titleService: Title,
    private fb: FormBuilder
    ) {

      this.galleryConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
            this.mobile=true;
            return {
              thumbPosition: ThumbnailsPosition.Bottom,
              thumbWidth: 80,
              thumbHeight: 80,
            };
          }
          this.mobile=false;
          return {
            thumbPosition: ThumbnailsPosition.Left,
            thumbWidth: 120,
            thumbHeight: 90
          };
        })
      );
    }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.LerProdutosCarregados();
      this.AdicionarDescricao();

      this.home = {icon: 'pi pi-home', url:"/produtos"};
      this.produtoForm = this.fb.group({
        tamanho:[this.Produto?.Tamanho,Validators.required],
        quantidade:[this.Produto?.Quantidade,Validators.required],
        cor:[this.Produto?.Cor,Validators.required],
        cep:[this.CEP],
      })
      this.findInvalidControlsRecursive()
    });

    if(this.Produto?.Quantidade == 0)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;

    if(isPlatformBrowser(this.platform))
    this.Url = `https://${location.href}`;

    if(this.Produto?.Status == StatusProduto.esgotado)
      this.textoAdicionar = this.textoEsgotado;

    if(isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();

  }
  /*
    Returns an array of invalid control/group names, or a zero-length array if
    no invalid controls/groups where found
  */
  findInvalidControlsRecursive():boolean {
    var invalidControls:string[] = [];
    let recursiveFunc = (form:FormGroup|FormArray) => {
      Object.keys(form?.controls).forEach(field => {
        const control = form.get(field);
        if (control.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(this.produtoForm);
    return invalidControls?.length > 0;
  }

  setColor(color:any){
    this.Produto.Cor = color;
    this.produtoForm.get("cor").setValue(color);
    this.produtoForm.get('cor').clearValidators();
    this.produtoForm.get('cor').updateValueAndValidity();
  }

  ngOnDestroy(){
    this.areProdutosLoadedSub?.unsubscribe();
  }

  SelecionarTamanho(tamanho:string){
    this.Produto.Tamanho = this.Produto.Tamanho == tamanho ? null: tamanho
  }

  IsValid:boolean=true;
  Erros:{erro:string,type:number}[] = [];
  AdicionarAoOrcamento(){
    this.Erros = this.Validar();
    this.IsValid = this.Erros.length > 0 ? false : true;
    if(!this.IsValid)
    return;

    this.Orcamento$.subscribe(x=>{
      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);

      if(!this.orcamentoId){
        if(!this.Produto.Arte){
          this.AbrirModalArte();
        }else{
          this.navegarParaCheckout();
        }
      }
      else{
        this.Produto.Quantidade += ProdutosOrcamento[0].Produto.Quantidade;
        this.store.dispatch(new EditarProdutoOrcamentoLocal(this.Produto,this.Produto._id,this.orcamentoId));
        if(!this.Produto.Arte){
          this.AbrirModalArte();
        }else{
          this.navegarParaCheckout();
          this.openCheckout();
        }
      }
      this.textoAdicionar = this.textoAtualizar;
      this.isOrcamento = true;

    });
  }

  Validar(){
    let Erros:{erro:string,type:number}[] = [];
    if(this.Produto.Quantidade < 1){
      Erros.push({erro:"Selecione uma quantidade para o item", type:1});
    }
    if(!this.Produto.Cor){
      Erros.push({erro:"Selecione uma cor para o item", type:2});
    }
    if(!this.Produto.Tamanho){
      Erros.push({erro:"Selecione um tamanho para o item", type:3});
    }
    return Erros;
  }
  ErroQuantidade(){
    return this.Erros.some(x=>x.type == 1);
  }
  ErroCor(){
    return this.Erros.some(x=>x.type == 2);
  }
  ErroTamanho(){
    return this.Erros.some(x=>x.type == 3);
  }
  AbrirModalArte(){
    this.IsValid = this.Erros.length > 0 ? false : true;
    if(this.IsValid){
        let dialogref= this.dialog.open(ExibicaoArteProdutoComponent,{
          data:this.Produto,
          width:'90vw',
          height:'90vh',
          panelClass:['animate__animated','animate__bounceIn', 'border']

        })
        dialogref.afterClosed().subscribe(x=>{
          if(x.Canvas.objects){
            if(x.Arte){
              if(!this.orcamentoId){
                this.store.dispatch(new AdicionarProdutoAoOrcamento(x)).subscribe(y=>{
                  this.orcamentoId = y.codOrcamento;
                });
              }else{
                this.store.dispatch(new EditarProdutoOrcamentoLocal(x,x._id,this.orcamentoId));
              }
              this.navegarParaCheckout();
            }
          }
        })

      }
  }
  DuplicarOrcamento(){
    this.Orcamento$.subscribe(x=>{
      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);

      if(ProdutosOrcamento?.length == 0){
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
  redirecionando:boolean = false;
  navegarParaCheckout(){
    //this.redirecionando = true;
     setTimeout(()=>{
      this.router.navigateByUrl("/checkout");
    },300)
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
      if(ProdutosOrcamento?.length == 0){
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
      });
      setTimeout(()=>{
        this.Liked = true;
        localStorage.setItem(`heartproduto${this.Produto._id}`,'true');
        this.Produto.Likes++;
        this.loading = false;
      },3000)
    }
    else
      return
  }

  IncrementarQuantidade(){
    this.Produto.Quantidade++;
  }
  DecrescerQuantidade(){
    if(this.Produto.Quantidade > this.Produto.QuantidadeMinima || this.Produto.Quantidade > 1)
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
      if(isPlatformBrowser(PLATFORM_ID))
        this.windowRef.nativeWindow.open( `https://wa.me/${Whatsapp}?text=${Mensagem}`, "_blank");
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
        if(!prod)
          this.router.navigate(['/produtos']);

        this.Produto = prod[0];
        this.items = [
          {label:this.Produto?.NomeCategoria, url:"/produtos/?categoria="+this.Produto?.NomeCategoria},
          {label:this.Produto?.Nome, styleClass:'desb'}
        ];
        this.updateViews();
        this.AdicionarDescricao();
        this.titleService.setTitle(`${this.Produto.Nome}`);
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
        this.router.navigate(['/produtos']);

        this.Produto = res.Produto[index].Produto;
        this.items = [
          {label:this.Produto?.NomeCategoria, url:"/produtos/?categoria="+this.Produto?.NomeCategoria},
          {label:this.Produto?.Nome, styleClass:'desb'}
        ];
        this.AdicionarDescricao();
        this.titleService.setTitle(`${this.Produto.Nome}`);
        this.updateViews();
        this.Produto.Imagem.forEach(img =>{
          galleryRef.addImage({ src:img, thumb: img });
        });
      });
    }

    this.LerComentariosProduto(id);

  }
  updateViews(){
    if(!localStorage.getItem("vprod"+this.Produto._id)){
      this.store.dispatch(new IncrementarVisualizacoesProduto(this.Produto._id)).subscribe(x=>{
        Object.defineProperty(this.Produto,'Visualizacoes',this.Produto.Visualizacoes++??1);
      });
      localStorage.setItem("vprod"+this.Produto._id,"true");
    }
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
      this.ComentariosProduto = data.filter(x=>x.IdProduto == this.Produto?._id);
      this.ComentariosProduto.forEach(x=>{
        x.Comentario.key = x.key;
        this.Comentarios.push(x.Comentario)
      })
      this.loading = false;
    });

  }

  AdicionarDescricao(){
    let element:HTMLElement = this.document.nativeDocument.createElement("div");

    if(this.Produto){

      element.innerHTML = this.Produto?.Descricao;
      element.querySelectorAll( 'oembed[url]' ).forEach( element => {
        // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
        // to discover the media.
        const anchor = this.document.nativeDocument.createElement( 'a' );

        anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
        anchor.className = 'embedly-card';

        element.appendChild( anchor );
      } );
      this.el = element;
    }
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
      setTimeout(()=>{
        if(this.loading){

          this.Produto.Rating.push($event.rating);
          this.readonlyRating = true;
          localStorage.setItem(`rateproduto${this.Produto._id}`, $event.rating.toString());
          this.loading = false;
        }
      },3000)
    }
    else
      return

  };
  CarregarDetalhesCEP(){
    // alert(this.CEP)
  }

  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return (sum(this.Produto?.Rating||0) / this.Produto.Rating?.length||0).toFixed(1)
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
      this.snack.open('Por favor, avalie o produto primeiro',"fechar",{duration:3000});
    }
  }

}
