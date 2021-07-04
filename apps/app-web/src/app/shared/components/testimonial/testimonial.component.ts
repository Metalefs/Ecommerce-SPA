import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { sliderAnimations } from "./testimonial.animations";
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fade } from '../../../animations';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  animations: [sliderAnimations,fade]
})
export class TestimonialComponent implements OnInit {

  @Input() sliderData: any [];
  contentSize = 1200;
  animationsStates = [];
  resizeWindow;
  catchSlider = false;
  mouseDownposition = 0;
  turnTimer;
  AutoTurnTimer;
  time = 0;
  mobileQuery: MediaQueryList;
  TabletQuery: MediaQueryList;
  quoteR = faQuoteRight;
  quoteL = faQuoteLeft;

  constructor(
    breakpointObserver: BreakpointObserver) {
     this.swiperConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
              return {
                direction              : 'horizontal',
                keyboard               : true,
                loop                   : true,
                loopFillGroupWithBlank : false,
                preloadImages          : true,
                lazy                   : false,
                observer               : true,
                navigation             : true,
                spaceBetween           : 12,
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
              keyboard               : true,
              loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              lazy                   : false,
              observer               : true,
              spaceBetween           : 30,
              height                 : 450,
              width                  : 1100,
              navigation             : true,
              slidesPerView:          2,
              autoplay: {
                delay               : 4000,
                disableOnInteraction: false,
              },
            }
          }
        })
      );
    }

  swiperConfig$: Observable<SwiperConfigInterface>;
  @ViewChild('swiperElTestimonial') swiperElTestimonial: ElementRef;
  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperElTestimonial?.nativeElement?.swiper?.autoplay.stop();
    } else {
      this.swiperElTestimonial?.nativeElement?.swiper?.autoplay.start();
    }
  }
  LerWindowSize(){
      return this.mobileQuery;
  }

  ngOnInit(){
    // for (let i = this.sliderData.length - 1; i < 5; i++ ) {
    //   this.sliderData.push(this.sliderData[i]);
    // }

  }

}
