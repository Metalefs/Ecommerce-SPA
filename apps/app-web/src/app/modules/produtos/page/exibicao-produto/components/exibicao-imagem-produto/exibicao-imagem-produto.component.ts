import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { GalleryConfig, GalleryItem, Gallery, ThumbnailsPosition } from 'ng-gallery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-exibicao-imagem-produto',
  templateUrl: './exibicao-imagem-produto.component.html',
  styleUrls: ['./exibicao-imagem-produto.component.scss']
})
export class ExibicaoImagemProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() galleryConfig$: Observable<GalleryConfig>;

  @Input() images: GalleryItem[];
  @Input() images$: Observable<GalleryItem[]>;
  mobile:boolean;
  constructor(
    breakpointObserver: BreakpointObserver) {
      this.galleryConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
            this.mobile=true;
            return {
              thumbPosition: ThumbnailsPosition.Left,
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
  }

}
