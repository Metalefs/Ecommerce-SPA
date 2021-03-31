import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, ViewChild, Renderer2, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { entities } from '@personalizados-lopes/data';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sliderAnimations } from "../card-cliente/animations";


@Component({
  selector: 'personalizados-lopes-visualizacao-clientes',
  templateUrl: './visualizacao-clientes.component.html',
  styleUrls: ['./visualizacao-clientes.component.scss'],
  animations: [sliderAnimations]
})
export class VisualizacaoClientesComponent implements OnInit {

  @Input() Clientes: Observable<entities.Cliente[]>;
  slidesPerView:number=5;
  @ViewChild('swiperEl3') swiperEl2: ElementRef;
  contentSize = 1200;
  animationsStates = [];
  resizeWindow;
  catchSlider = false;
  mouseDownposition = 0;
  turnTimer;
  time = 0;
  constructor(private breakpointObserver: BreakpointObserver,) { }

  swiperConfig$: Observable<SwiperConfigInterface>;
  ngOnInit() {
    this.swiperConfig$ = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
            return {
              direction              : 'horizontal',
              keyboard               : true,
              loop                   : true,
              loopFillGroupWithBlank : false,
              autoHeight             : true,
              preloadImages          : true,
              lazy                   : true,
              observer               : true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              slidesPerView:1,
              autoplay: {
                delay               : 4000,
                disableOnInteraction: false,
              },
            }
        }
        else{
          return {
            direction              : 'horizontal',
            updateOnWindowResize   : true,
            autoHeight             : true,
            keyboard               : true,
            loop                   : true,
            loopFillGroupWithBlank : false,

            preloadImages          : true,
            lazy                   : true,
            observer               : true,
            slidesPerView          : 5,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            autoplay: {
              delay               : 4000,
              disableOnInteraction: true,
            }
          }
        }
      })
    );
  }

}
