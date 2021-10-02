import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Carousel, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Gallery } from 'ng-gallery';
import { Observable } from 'rxjs';
import { fade, slideInOut } from '../../../animations';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoAbertoOrcamentoLocal} from '../../../data/store/actions/orcamento.actions';
import { AbrirPreviewProduto, AdicionarComparacao, AdicionarFavorito, RemoverComparacao, RemoverFavorito } from '../../../data/store/actions/produto.actions';
import { CarouselState, OrcamentoState, ProdutoState } from '../../../data/store/state';
import { sum, translateEnum } from '../../../helper/ObjHelper';
import { ProdutoStateService } from '../../../modules/produtos/produto-state.service';
import { CheckoutDisplayComponent } from '../dialogs/checkout-display/checkout-display.component';

@Component({
  selector: 'personalizados-lopes-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
  animations:[fade, slideInOut]
})
export class CardProdutoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(CarouselState.ObterCarousel) Carrosel$: Observable<Carousel>;
  @Select(ProdutoState.ObterListaFavoritos) Favoritos$: Observable<Produto[]>;
  enumStatusProduto = StatusProduto;
  isOrcamento:boolean;
  Liked:boolean = false;
  Favorito:boolean = false;

  constructor(private store: Store,private dialog:MatDialog, private gallery: Gallery, private router:Router, private pss:ProdutoStateService) { }
  @Input() Produto:entities.Produto;
  @Input() MostarOpcoes: boolean = true;
  @Input() TrocaImagem: boolean = true;
  @Input() flex_direction: string = 'column';
  statusProduto=StatusProduto;

  ngOnInit(): void {
    this.Liked = localStorage.getItem(`heartproduto${this.Produto._id}`) === 'true' ? true: false;

    this.translateStatusProduto = this.translateStatusProduto.bind(this);
    this.AdicionarAoOrcamento = this.AdicionarAoOrcamento.bind(this);
    this.AbrirPaginaProduto = this.AbrirPaginaProduto.bind(this);
    this.AbrirPreviewProduto = this.AbrirPreviewProduto.bind(this);
    this.AdicionarFavorito = this.AdicionarFavorito.bind(this);
    this.AdicionarComparacao = this.AdicionarComparacao.bind(this);

    this.Favoritos$.subscribe(favs=>{
      if(favs)
      this.Favorito = favs.findIndex(x=>x._id == this.Produto._id) != -1;
    })
  }


  encodeURI(value:string){
    return encodeURIComponent(value);
  }
  AdicionarFavorito(){
      this.store.dispatch(new AdicionarFavorito(this.Produto));
      this.pss.atualizarFiltroAtivo();
  }
  AdicionarComparacao(){
    this.store.dispatch(new AdicionarComparacao(this.Produto));
  }
  RemoverComparacao(){
    this.store.dispatch(new RemoverComparacao(this.Produto));
  }
  AdicionarAoOrcamento(produto?:Produto){
    this.Orcamento$.subscribe(x=>{

      const produtoEstaNoOrcamento = x?.Produto?.filter(x=>x.Produto._id === this.Produto._id);

      if(produtoEstaNoOrcamento?.length === 0 || !produtoEstaNoOrcamento){

        this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto));
        this.isOrcamento = true;

      }
      else{
        this.Produto.Quantidade += produtoEstaNoOrcamento[0].Produto.Quantidade;

        this.store.dispatch(new DuplicarProdutoOrcamento(this.Produto));
        this.isOrcamento = true;
      }
      this.openCheckout();

    });
  }
  AbrirPaginaProduto(){
    this.store.dispatch(new EditarProdutoAbertoOrcamentoLocal(this.Produto))
    this.router.navigate([
      '/produtos/' +
        this.Produto._id
    ]);
  }
  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return  (sum(this.Produto.Rating) / this.Produto.Rating.length).toFixed(1)
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
  AbrirPreviewProduto(){
    this.store.dispatch(new AbrirPreviewProduto(this.Produto))
    this.store.dispatch(new EditarProdutoAbertoOrcamentoLocal(this.Produto))
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
}
