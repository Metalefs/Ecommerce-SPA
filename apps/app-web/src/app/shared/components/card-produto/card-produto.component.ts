import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Gallery, GalleryComponent, GalleryItem } from 'ng-gallery';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { fade, slideInOut } from '../../../animations';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoOrcamentoLocal } from '../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';
import { sum } from '../../../helper/ObjHelper';
import { CheckoutDisplayComponent } from '../dialogs/checkout-display/checkout-display.component';

@Component({
  selector: 'personalizados-lopes-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
  animations:[fade, slideInOut]
})
export class CardProdutoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  isOrcamento:boolean;
  Liked:boolean = false;
  constructor(private store: Store,private dialog:MatDialog, private gallery: Gallery,) { }
  @Input() Produto:entities.Produto;
  @Input() MostarOpcoes: boolean = true;
  @Input() TrocaImagem: boolean = true;
  statusProduto=StatusProduto;
  images: GalleryItem[];
  images$: Observable<GalleryItem[]>;
  ngOnInit(): void {
    const galleryRef = this.gallery.ref('myGallery');
    this.Liked = localStorage.getItem(`heartproduto${this.Produto._id}`) == 'true' ? true: false;
    this.Produto?.Imagem.forEach(img =>{
      console.log(img);
      galleryRef.addImage({ src:img, thumb: img });
    });
  }

  swiperConfig: SwiperConfigInterface = {
    direction              : 'horizontal',
    keyboard               : true,
    loop                   : true,
    loopFillGroupWithBlank : false,
    preloadImages          : true,
    lazy                   : false,
    observer               : true,
    navigation             : true,
    allowSlidePrev:true,
    allowSlideNext:true,
    zoom: true,
    centeredSlides:true,
    updateOnImagesReady: true,
    slidesPerView          : 1,
    autoplay: {
      delay                : 4000,
      disableOnInteraction : false,
    },
  };
  AdicionarAoOrcamento(produto:Produto){
    this.Orcamento$.subscribe(x=>{

      let ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id == this.Produto._id);

      if(ProdutosOrcamento.length == 0){

        this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto));
        this.isOrcamento = true;
      }
      else{
        this.Produto.Quantidade += ProdutosOrcamento[0].Produto.Quantidade;

        this.store.dispatch(new DuplicarProdutoOrcamento(this.Produto));
        this.isOrcamento = true;
        this.openCheckout();
      }

    });
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
}
