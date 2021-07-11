import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

import { Estampa, InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { IncrementarVisualizacoesProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, Subject, Subscription } from 'rxjs';

import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { CheckoutDisplayComponent } from 'apps/app-web/src/app/shared/components/dialogs/checkout-display/checkout-display.component';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarCategoriaFiltroProduto } from 'apps/app-web/src/app/data/store/actions/filtroproduto.actions';

import { TipoOrdenacaoSwiperProduto } from 'apps/app-web/src/app/shared/components/produto-swiper/produto-swiper.component';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { WindowRef } from 'apps/app-web/src/app/shared/services/window.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { findInvalidControlsRecursiveform } from 'apps/app-web/src/app/helper/FormHelper';
import AOS from 'aos'
import { ExibicaoArteProdutoComponent } from 'apps/app-web/src/app/shared/components/exibicao-arte-produto/exibicao-arte-produto.component';
import { GalleryComponent } from 'ng-gallery';
import { ExibicaoImagemProdutoComponent } from './components/exibicao-imagem-produto/exibicao-imagem-produto.component';

@Component({
  selector: 'personalizados-lopes-visualizacao-produto-loja',
  templateUrl: './visualizacao-produto-loja.component.html',
  styleUrls: ['./visualizacao-produto-loja.component.scss']
})
export class VisualizacaoProdutoLojaComponent implements OnInit {
  @Input() Produto:Produto = null;
  @Input() orcamentoId:string = null;

  textoAdicionar:string = 'Comprar';
  textoAtualizar:string = 'ATUALIZAR CARRINHO';
  textoEsgotado:string  = 'Esgotado';
  Url:string;
  statusProduto=StatusProduto;
  Liked:boolean = false;
  IsValid:boolean=true;
  Erros:{erro:string,type:number}[] = [];
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;

  areProdutosLoadedSub: Subscription;
  isOrcamento:boolean = false;
  loading:boolean = false;
  arte_traseira:boolean=false;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;

  selected = new FormControl(0);
  produtoForm:FormGroup;
  CEP:string="";

  @ViewChild(ExibicaoImagemProdutoComponent) gallery:ExibicaoImagemProdutoComponent;
  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store,
    public dialog: NgDialogAnimationService,
    private scrollService: PageScrollService,
    private windowRef: WindowRef,
    private titleService: Title,
    private fb: FormBuilder,
    ) {
      AOS.refresh();
    }


  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.activeRoute.params.subscribe(routeParams => {
      if(isPlatformBrowser(this.platform))
      this.Url = `https://${location.href}`;

      this.LoadProduto(this.Produto);

      if(isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    AOS.refreshHard();
    })
  }
  LoadProduto(produto:Produto){
    this.updateViews(produto);
    this.gallery.AddImages(produto);
    this.produtoForm = this.fb.group({
      tamanho:[produto?.Tamanho],
      quantidade:[produto?.Quantidade,Validators.required],
      cor:[produto?.Cor,Validators.required],
      cep:[this.CEP],
    })

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
        if(x?.Canvas){
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
