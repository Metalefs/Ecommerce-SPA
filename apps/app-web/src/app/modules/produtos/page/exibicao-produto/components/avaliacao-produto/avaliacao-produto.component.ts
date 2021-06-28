import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';

import { RatingChangeEvent, HoverRatingChangeEvent, ClickEvent } from 'angular-star-rating';
import { RateProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { sum } from 'apps/app-web/src/app/helper/ObjHelper';
import { ComentarioProduto, Produto } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';

import { ComentarioProdutoService } from 'apps/app-web/src/app/data/service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'personalizados-lopes-avaliacao-produto',
  templateUrl: './avaliacao-produto.component.html',
  styleUrls: ['./avaliacao-produto.component.scss']
})
export class AvaliacaoProdutoComponent implements OnInit {
  @Input() Produto:Produto;

  ComentariosProduto:ComentarioProduto[];
  Comentarios:Comentario[] = [];

  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;
  readonlyRating:boolean = false;

  loading:boolean = false;
  constructor(private store: Store,
    private snack: MatSnackBar,
    private ComentarioProdutoService: ComentarioProdutoService) { }

  ngOnInit(): void {
    this.LerComentariosProduto(this.Produto._id);

    this.readonlyRating = localStorage.getItem(`rateproduto${this.Produto._id}`) == 'true' ? true: false;
  }

  LerComentariosProduto(idProduto:string){
    this.ComentarioProdutoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Comentarios = [];
      this.ComentariosProduto = data.filter(x=>x.IdProduto == idProduto);
      this.ComentariosProduto.forEach(x=>{
        x.Comentario.key = x.key;
        this.Comentarios.push(x.Comentario)
      })
    });
  }

  Comentar(Comentario:Comentario){
    if(localStorage.getItem(`rateproduto${this.Produto._id}`)){
      let avaliacao = localStorage.getItem(`rateproduto${this.Produto._id}`);
      let comentarioProduto:ComentarioProduto = new ComentarioProduto(this.Produto._id,Comentario,[],parseInt(avaliacao))
      comentarioProduto.Respostas = [];
      comentarioProduto.DataHoraAlteracao = new Date();
      comentarioProduto.DataHoraCriacao = new Date();

      comentarioProduto.Avaliacao = parseInt(avaliacao);
      this.ComentarioProdutoService.create(comentarioProduto);
    }else{
      this.snack.open('Por favor, avalie o produto primeiro',"fechar",{duration:3000});
    }
  }

  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return (sum(this.Produto?.Rating||0) / this.Produto.Rating?.length||0).toFixed(1)
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    this.onHoverRatingChangeResult = $event;
  };

  onClick = ($event: ClickEvent) => {
    if(!localStorage.getItem(`rateproduto${this.Produto._id}`)){
      this.loading = true;
      this.store.dispatch(new RateProduto(this.Produto._id, $event.rating)).subscribe(x=>{
        this.readonlyRating = true;
        localStorage.setItem(`rateproduto${this.Produto._id}`, $event.rating.toString());
        this.loading = false;
      });
      setTimeout(()=>{
        if(this.loading){
          this.Produto.Rating.push($event.rating);
          this.readonlyRating = true;
          localStorage.setItem(`rateproduto${this.Produto._id}`, $event.rating.toString());
          this.loading = false;
        }
      },3000)
    }
    else
      return
  };
}
