import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade, slider } from 'apps/app-web/src/app/animations';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';
import { BlogPostService } from '../../blog.service';

@Component({
  selector: 'personalizados-lopes-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations:[fade,slider]
})
export class BlogComponent implements OnInit {

  Blog:BlogPost[];
  constructor(private BlogService:BlogPostService) { }

  ngOnInit(): void {
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Blog = data;
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
}
