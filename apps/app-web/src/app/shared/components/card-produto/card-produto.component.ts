import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Carousel, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Gallery } from 'ng-gallery';
import { IImage } from 'ng-simple-slideshow';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { fade, slideInOut } from '../../../animations';
import { AdicionarProdutoAoOrcamento, DuplicarProdutoOrcamento, EditarProdutoAbertoOrcamentoLocal} from '../../../data/store/actions/orcamento.actions';
import { CarouselState, OrcamentoState } from '../../../data/store/state';
import { sum, translateEnum } from '../../../helper/ObjHelper';
import { CheckoutDisplayComponent } from '../dialogs/checkout-display/checkout-display.component';
import { PreviewProdutoComponent } from '../dialogs/preview-produto/preview-produto.component';

@Component({
  selector: 'personalizados-lopes-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
  animations:[fade, slideInOut]
})
export class CardProdutoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @Select(CarouselState.ObterCarousel) Carrosel$: Observable<Carousel>;

  isOrcamento:boolean;
  Liked:boolean = false;
  constructor(private store: Store,private dialog:MatDialog, private gallery: Gallery, private router:Router) { }
  @Input() Produto:entities.Produto;
  @Input() MostarOpcoes: boolean = true;
  @Input() TrocaImagem: boolean = true;
  @Input() flex_direction: string = 'column';
  statusProduto=StatusProduto;
  imageUrls: (string | IImage)[] = [

  ];
  ngOnInit(): void {
    this.Liked = localStorage.getItem(`heartproduto${this.Produto._id}`) == 'true' ? true: false;
    if(this.Produto.Imagem)
    this.Produto.Imagem.forEach(img=>{
      this.imageUrls.push({
        url:img,
        href:"",
        backgroundSize:"cover",
        backgroundPosition:"center",
        caption:"",
      });
    })
  }

  swiperConfig: SwiperConfigInterface = {
    direction              : 'horizontal',
    keyboard               : true,
    loop                   : true,
    loopFillGroupWithBlank : false,
    preloadImages          : true,
    lazy                   : true,
    observer               : true,
    navigation             : true,
    allowSlidePrev:true,
    allowSlideNext:true,
    centeredSlides:true,
    updateOnImagesReady: true,
    slidesPerView          : 1,
    autoplay: {
      delay                : 4000,
      disableOnInteraction : false,
    },
  };

  encodeURI(value:string){
    return encodeURIComponent(value);
  }
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
    this.dialog.open(PreviewProdutoComponent, {
      width:'80vw',
      height:'80vh',
      restoreFocus: false,
      data:this.Produto,
      panelClass:['']
    });
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
}
