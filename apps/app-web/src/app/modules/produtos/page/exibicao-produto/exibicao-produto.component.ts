import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

import { InformacoesContato, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { InformacoesContatoState, OrcamentoState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { BlogPost } from 'libs/data/src/lib/classes/blogPost';
import { ProdutoService } from 'apps/app-web/src/app/data/service';

import { fade } from 'apps/app-web/src/app/animations';
import { TipoOrdenacaoSwiperProduto } from 'apps/app-web/src/app/shared/components/produto-swiper/produto-swiper.component';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BlogPostService } from '../../../blog/blog.service';

import AOS from 'aos'
import { EditarProdutoAbertoOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
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
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;

  selected = new FormControl(0);

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private activeRoute:ActivatedRoute,
    private router: Router,
    public dialog: NgDialogAnimationService,
    private BlogService: BlogPostService,
    private scrollService: PageScrollService,
    private servicoProduto:ProdutoService,
    private titleService: Title,
    private store:Store
    ) {
      AOS.refresh();
    }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      if(isPlatformBrowser(this.platform))
      this.Url = `https://${location.href}`;

      this.ObterProduto(routeParams.id??"", routeParams.orcamentoId??"").subscribe(produto =>{
        this.Produto = produto;
        this.LoadProduto(this.Produto);
      });

      if(isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    });
    AOS.refreshHard();
  }

  LoadProduto(produto:Produto){
    this.updatePageTitle(produto);
    this.CarregarPostsBlog();

    if(produto?.Quantidade == 0)
      produto.Quantidade = produto.QuantidadeMinima;

    if(produto?.Status == StatusProduto.esgotado)
      this.textoAdicionar = this.textoEsgotado;
    else
      this.textoAdicionar = "Comprar";

    this.Produto = produto;
    this.store.dispatch(new EditarProdutoAbertoOrcamentoLocal(this.Produto))
  }

  ngOnDestroy(){
    this.areProdutosLoadedSub?.unsubscribe();
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
}
