import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { cardFlip, fade } from 'apps/app-web/src/app/animations';
import { BlogPostService, ComentarioProdutoService } from 'apps/app-web/src/app/data/service';
import { RateProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { sum } from 'apps/app-web/src/app/helper/ObjHelper';
import { BlogPost } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
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
  loading:boolean = false;
  constructor(private activeRoute:ActivatedRoute,
    private ComentarioService: ComentarioProdutoService,
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
  EnviarComentario($event:Comentario){
    let Comentario:Comentario = $event;
    Comentario.Respostas = [];
    Comentario.DataHoraAlteracao = new Date();
    Comentario.DataHoraCriacao = new Date();
    if(!this.Post.Comentarios)
      Object.assign(this.Post,{Comentarios:[Comentario]})
    else
      this.Post.Comentarios.push(Comentario);
    this.BlogService.update(this.Post.key,this.Post);
  }
  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;
  readonlyRating:boolean = false;
  onClick = ($event: ClickEvent) => {
    if(!localStorage.getItem(`evalPost${this.Post.key}`)){
      this.loading = true;
      if(!this.Post.Avaliacao)
        Object.assign(this.Post, {Avaliacao: [$event.rating]});
      else
      this.Post.Avaliacao.push($event.rating)
      this.BlogService.update(this.Post.key,this.Post).then(x=>{
        this.readonlyRating = true;
        localStorage.setItem(`evalPost${this.Post.key}`, $event.rating.toString());
        this.loading = false;
      });
    }
    else
      return

  };

  meanRating(){
    return !this.Post?.Avaliacao ? "0" :
        (sum(this.Post.Avaliacao) / this.Post.Avaliacao.length).toFixed(1).toString()
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    this.onHoverRatingChangeResult = $event;
  };
}
