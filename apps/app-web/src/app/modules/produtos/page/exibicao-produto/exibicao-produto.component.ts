import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

import { Estampa, InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { IncrementarVisualizacoesProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { CheckoutDisplayComponent } from 'apps/app-web/src/app/shared/components/dialogs/checkout-display/checkout-display.component';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarCategoriaFiltroProduto } from 'apps/app-web/src/app/data/store/actions/filtroproduto.actions';
import { BlogPost } from 'libs/data/src/lib/classes/blogPost';
import { ProdutoService } from 'apps/app-web/src/app/data/service';

import { fade } from 'apps/app-web/src/app/animations';
import { ExibicaoArteProdutoComponent } from '../dialogs/exibicao-arte-produto/exibicao-arte-produto.component';
import { TipoOrdenacaoSwiperProduto } from 'apps/app-web/src/app/shared/components/produto-swiper/produto-swiper.component';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { WindowRef } from 'apps/app-web/src/app/shared/services/window.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BlogPostService } from '../../../blog/blog.service';

import { findInvalidControlsRecursiveform } from 'apps/app-web/src/app/helper/FormHelper'
import { Gallery } from 'ng-gallery';
import { MenuItem } from 'primeng/api';
import AOS from 'aos'
@Component({
  selector: 'personalizados-lopes-exibicao-produto',
  templateUrl: './exibicao-produto.component.html',
  styleUrls: ['./exibicao-produto.component.scss'],
  animations:[fade]
})
export class ExibicaoProdutoComponent implements OnInit, OnDestroy {
  textoAdicionar:string = 'Comprar';
  textoAtualizar:string = 'ATUALIZAR CARRINHO';
  textoEsgotado:string  = 'Esgotado';
  Url:string;
  Produto:Produto = null;
  statusProduto=StatusProduto;
  Liked:boolean = false;
  IsValid:boolean=true;
  Erros:{erro:string,type:number}[] = [];
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  Blog:BlogPost[];
  areProdutosLoadedSub: Subscription;
  isOrcamento:boolean = false;
  loading:boolean = false;
  arte_traseira:boolean=false;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;

  selected = new FormControl(0);
  produtoForm:FormGroup;
  CEP:string="";

  items: MenuItem[];
  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: NgDialogAnimationService,
    private BlogService: BlogPostService,
    private scrollService: PageScrollService,
    private servicoProduto:ProdutoService,
    private windowRef: WindowRef,
    private titleService: Title,
    private fb: FormBuilder,
    private gallery: Gallery,
    ) {
      AOS.refresh();
    }


  AddImages(produto:Produto){
    const galleryRef = this.gallery.ref('myGallery');
    galleryRef.reset();
    produto?.Imagem.forEach(img =>{
      galleryRef.addImage({ src:img, thumb: img, title: "Adicione sua estampa - Personalizados Lopes"});
    });
    const config: any = {
      autoPlay: true
    };
    galleryRef.setConfig(config)
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      if(isPlatformBrowser(this.platform))
      this.Url = `https://${location.href}`;

      this.ObterProduto(routeParams.id??"", routeParams.orcamentoId??"").subscribe(produto =>{
        this.Produto = produto;
        this.LoadProduto(this.Produto);
        this.findInvalidControlsRecursive();
      });

      if(isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    });
    AOS.refreshHard();
  }

  LoadProduto(produto:Produto){
    this.updatePageTitle(produto);
    this.updateViews(produto);
    this.CarregarPostsBlog();
    this.AddImages(produto);
    this.produtoForm = this.fb.group({
      tamanho:[produto?.Tamanho],
      quantidade:[produto?.Quantidade,Validators.required],
      cor:[produto?.Cor,Validators.required],
      cep:[this.CEP],
    })
    this.items = [
      {label:this.Produto?.NomeCategoria, url:"/produtos/?categoria=" + this.Produto?.NomeCategoria},
      {label:this.Produto?.Nome, styleClass:'desb'}
    ];
    if(produto?.Quantidade == 0)
      produto.Quantidade = produto.QuantidadeMinima;

    if(produto?.Status == StatusProduto.esgotado)
      this.textoAdicionar = this.textoEsgotado;
    else
      this.textoAdicionar = "Comprar";

    this.Produto = produto;
  }

  ngOnDestroy(){
    this.areProdutosLoadedSub?.unsubscribe();
  }

  setColor(color:any){
    if(this.Produto.Cor)
      this.Produto.Cor = null;
    else{
      this.Produto.Cor = color;
    }
    this.produtoForm.get("cor").setValue(this.Produto.Cor);
    this.produtoForm.get('cor').clearValidators();
    this.produtoForm.get('cor').updateValueAndValidity();
  }
  setQuantidade(quantidade:any){
    this.produtoForm.get("quantidade").setValue(quantidade);
    this.produtoForm.get('quantidade').clearValidators();
    this.produtoForm.get('quantidade').updateValueAndValidity();

  }

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
      this.produtoNoCheckout();
    });
  }
  EstampaSelecionada:Estampa;
  SelecionarEstampa(estampa:Estampa){
    this.EstampaSelecionada = estampa;
    this.AbrirModalArte(estampa);
  }

  AbrirModalArte(estampa = null){
    this.IsValid = this.Erros.length > 0 ? false : true;
    if(this.IsValid){
      let dialogref= this.dialog.open(ExibicaoArteProdutoComponent,{
        data:{Produto: this.Produto, Estampa: estampa},
        panelClass:['animate__animated','animate__bounceIn', 'border', 'bg-transp'],
        restoreFocus: false,
        width:'99vw',
        height:'100vh',
        animation: {
          to: "left",
          incomingOptions: {
            keyframeAnimationOptions: { easing: "ease", duration: 300 }
          },
          outgoingOptions: {
            keyframeAnimationOptions: { easing: "ease", duration: 300 }
          }
        },
        position: { rowStart: "0" },
      })
      dialogref.afterClosed().subscribe(x=>{
        if(x?.Canvas?.objects){
          if(!this.orcamentoId){
            this.store.dispatch(new AdicionarProdutoAoOrcamento(x)).subscribe(y=>{
              this.orcamentoId = y.codOrcamento;
            });
          }else{
            this.store.dispatch(new EditarProdutoOrcamentoLocal(x,x._id,this.orcamentoId));
          }
          this.navegarParaCheckout();
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
    // this.redirecionando = true;
     setTimeout(()=>{
      this.router.navigateByUrl("/checkout");
    },
    0)
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
      animation: {
        to: "left",
        incomingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        }
      },
      position: { rowStart: "0" },

      panelClass:['no-padding']
    });
  }

  EntrarEmContato(){
    this.InformacoesContato$.subscribe(x=>{
      let Whatsapp = x.Whatsapp;
      let Mensagem = `Olá, gostaria de ter mais informações sobre *${this.Produto.Nome}* ${this.Url}`;
      if(isPlatformBrowser(this.platform))
        this.windowRef.nativeWindow.open( `https://wa.me/${Whatsapp}?text=${Mensagem}`, "_blank");
    })
  }

  orcamentoId:string;
  ObterProduto(id, orcamentoId){
    this.orcamentoId = orcamentoId;
    let produto = new Subject<any>();
    this.Liked = localStorage.getItem(`heartproduto${id}`) == 'true' ? true: false;
    if(!this.orcamentoId)
    {
      this.isOrcamento = false;
      this.servicoProduto.Filtrar(id).subscribe(prod=>{
        if(!prod)
        this.router.navigate(['/produtos']);
        produto.next(prod[0]);
      })
    }
    else
    {
      this.isOrcamento = true;
      this.Orcamento$.subscribe( res => {
        const index = res.Produto.findIndex(item => item.codOrcamento === orcamentoId);
        if(index<0)
        this.router.navigate(['/produtos']);
        let aux = res.Produto[index].Produto;
        produto.next(aux);
        this.LoadProduto(aux);
      });
    }
    return produto.asObservable();
  }

  updatePageTitle(produto:Produto){
    this.titleService.setTitle(`${produto?.Nome}`);
  }

  updateViews(produto:Produto){
    if(produto?._id)
      if(!localStorage.getItem("vprod-"+produto._id)){
        this.store.dispatch(new IncrementarVisualizacoesProduto(produto._id)).subscribe(x=>{
          produto.Visualizacoes ++;
          localStorage.setItem("vprod-"+produto._id, "true");
        });
      }
  }

  CarregarDetalhesCEP(){
    //alert(this.CEP)
  }

  CarregarPostsBlog(){
    this.loading = true;
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.val(), ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Blog = data;
      this.loading = false;
    });
  }

  Validar(){
    let Erros:{erro:string,type:number}[] = [];
    if(this.Produto.Quantidade < 1){
      Erros.push({erro:"Selecione uma quantidade para o produto", type:1});
    }
    if(!this.Produto.Cor){
      Erros.push({erro:"Selecione uma cor para o produto", type:2});
    }
    if(!this.Produto.Tamanho){
      Erros.push({erro:"Selecione um tamanho para o produto", type:3});
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
  /*
    Returns an array of invalid control/group names, or a zero-length array if
    no invalid controls/groups where found
  */
  findInvalidControlsRecursive():boolean {
    return findInvalidControlsRecursiveform(this.produtoForm)
  }

}
