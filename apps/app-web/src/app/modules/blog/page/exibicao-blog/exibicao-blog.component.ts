import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardFlip, fade } from 'apps/app-web/src/app/animations';
import { BlogPostService } from 'apps/app-web/src/app/data/service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-exibicao-blog',
  templateUrl: './exibicao-blog.component.html',
  styleUrls: ['./exibicao-blog.component.scss'],
  animations:[cardFlip,fade]
})
export class ExibicaoBlogComponent implements OnInit {
  Post:BlogPost;
  state = "flipped";
  Viewed:boolean = false;
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
      this.Post = data.filter(x=>x.Titulo == id)[0];
      this.updateViews();
    });setTimeout(()=>{
      this.flip()
    },0)
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }
  updateViews(){
    if(!localStorage.getItem("vblog"+this.Post.key)){
      ++this.Post.Visualizacoes;
      this.BlogService.update(this.Post.key,this.Post);
      localStorage.setItem("vblog"+this.Post.key,"true");
    }
  }
}
