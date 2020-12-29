import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'apps/app-web/src/app/data/service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-listagem-posts',
  templateUrl: './listagem-posts.component.html',
  styleUrls: ['./listagem-posts.component.scss']
})
export class ListagemPostsComponent implements OnInit {

  Blog:BlogPost[];
  loading:boolean = true;
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
      this.loading = false;
    });
  }

}
