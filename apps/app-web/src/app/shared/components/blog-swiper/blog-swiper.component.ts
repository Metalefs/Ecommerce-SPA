import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPostService } from '../../../data/service';
import { removeDuplicates } from '../../../helper/ObjHelper';

@Component({
  selector: 'personalizados-lopes-blog-swiper',
  templateUrl: './blog-swiper.component.html',
  styleUrls: ['./blog-swiper.component.scss']
})
export class BlogSwiperComponent implements OnInit {
  Blog:BlogPost[];
  @Input()TAGS:string[];
  constructor(private BlogService:BlogPostService,
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
            direction              : 'horizontal',
            keyboard               : true,
            // loop                   : true,
            loopFillGroupWithBlank : false,
            preloadImages          : true,
            lazy                   : false,
            observer               : true,
            centeredSlides         : true,
            navigation             : true,
            slidesPerView:5,
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
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if(this.TAGS)
        this.TAGS.forEach((tag)=>{
          data.filter(post=>post.Tags.filter((posttag) => posttag==tag)).forEach(match=>{
            this.Blog.push(match);
            this.Blog = removeDuplicates(this.Blog,"Titulo")
          })
        });
        else{
          this.Blog = data;
        }
    });
  }

}