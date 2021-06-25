import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-blog-swiper',
  templateUrl: './blog-swiper.component.html',
  styleUrls: ['./blog-swiper.component.scss']
})
export class BlogSwiperComponent implements OnInit {
  @Input()Blog:BlogPost[] = [];
  @Input()TAGS:string[];
  constructor(
    breakpointObserver: BreakpointObserver,
    ) {
    this.swiperConfig$ = breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
            return {
              direction              : 'horizontal',
              keyboard               : true,
              // loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              lazy                   : false,
              observer               : true,
              navigation             : true,
              slidesPerView:1,
              autoplay: {
                delay               : 4000,
                disableOnInteraction: false,
              },
            }
        }
        else{
          return {
            direction              : 'vertical',
            keyboard               : true,
            // loop                   : true,
            loopFillGroupWithBlank : false,
            preloadImages          : true,
            lazy                   : false,
            observer               : true,
            navigation             : true,
            slidesPerView:1,
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


  ngOnInit(): void {

  }

}
