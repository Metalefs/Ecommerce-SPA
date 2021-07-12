import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Produto } from 'libs/data/src/lib/classes';
import { GalleryConfig, GalleryItem, ThumbnailsPosition, ImageItem } from 'ng-gallery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-exibicao-imagem-produto',
  templateUrl: './exibicao-imagem-produto.component.html',
  styleUrls: ['./exibicao-imagem-produto.component.scss']
})
export class ExibicaoImagemProdutoComponent implements OnInit {
  @Input() _Produto:Produto;
  public get Produto(): Produto {
    return this._Produto;
  }
  public set Produto(value: Produto) {
    this._Produto = value;
    this.AddImages(value);
  }
  @Input() galleryConfig$: Observable<GalleryConfig>;
  mobile:boolean;
  images: GalleryItem[];

  @Select(OrcamentoState.ObterProdutoAberto) Produto$: Observable<Produto>;
  constructor(

    private activeRoute:ActivatedRoute,
    breakpointObserver: BreakpointObserver) {
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
          }else{
            this.mobile=false;
            return {
              thumbPosition: ThumbnailsPosition.Bottom,
              thumbWidth: 120,
              thumbHeight: 90
            };
          }
        })
      );
    }
  ngOnInit(): void {
    this.Produto$.subscribe(produto => {
      this.AddImages(produto);
    })
  }

  AddImages(produto:Produto){
    this.images = []
    produto?.Imagem.forEach(img =>{
      this.images.push(new ImageItem({ src:img, thumb: img}));
    });
  }

}
