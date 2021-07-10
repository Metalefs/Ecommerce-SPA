import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EstampaService } from 'apps/app-web/src/app/data/service';
import { Estampa, Produto } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-selecao-estampa',
  templateUrl: './selecao-estampa.component.html',
  styleUrls: ['./selecao-estampa.component.scss']
})
export class SelecaoEstampaComponent implements OnInit {
  @Input() Produto: Produto;

  @Output() onSelecionarEstampa:EventEmitter<Estampa> = new EventEmitter<Estampa>();

  Estampas: Estampa[]

  @ViewChild('swiperEl4') swiperEl: ElementRef;

  swiperConfig$: Observable<SwiperConfigInterface>;

  constructor(private servicoEstampa: EstampaService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.servicoEstampa.FiltrarPorIdCategoria(this.Produto.Categoria._id).subscribe(estampas => {
      this.Estampas = estampas;
    })

    this.swiperConfig$ = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
          return {
            direction: 'horizontal',
            keyboard: true,
            loop: true,
            loopFillGroupWithBlank: false,
            preloadImages: true,
            lazy: true,
            observer: true,
            spaceBetween: 1,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          }
        }
        else {
          return {
            direction: 'horizontal',
            updateOnWindowResize: true,
            autoHeight: true,
            height: 400,
            keyboard: true,
            loop: true,
            loopFillGroupWithBlank: false,
            spaceBetween: 22,
            preloadImages: true,
            lazy: false,
            observer: true,
            slidesPerView: 5,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            autoplay: {
              delay: 4000,
              disableOnInteraction: true,
            }
          }
        }
      })
    );
  }
  onSwiperHover(hover: boolean) {
    if (hover) {
      this.swiperEl?.nativeElement?.swiper?.autoplay.stop();
    } else {
      this.swiperEl?.nativeElement?.swiper?.autoplay.start();
    }
  }
}
