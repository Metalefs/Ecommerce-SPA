import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from 'apps/app-web/src/app/data/service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-exibicao-blog',
  templateUrl: './exibicao-blog.component.html',
  styleUrls: ['./exibicao-blog.component.scss']
})
export class ExibicaoBlogComponent implements OnInit {
  Post:BlogPost;
  constructor(private activeRoute:ActivatedRoute,
    private router: Router,
    private BlogService:BlogPostService) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Post = data.filter(x=>x.Titulo == id)[0]
    });
  }

}
