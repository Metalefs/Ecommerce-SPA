import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'libs/data/src/lib/classes';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { CanViewPost } from '../../../helper/ObjHelper';
import { sum } from '../../../helper/ObjHelper';
@Component({
  selector: 'personalizados-lopes-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.scss']
})
export class CardBlogComponent implements OnInit {
  @Input() Post:BlogPost;
  constructor(private authService:AuthenticationService) { }
  CanView:boolean;
  Link:string;
  ngOnInit(): void {
    this.Link = "<a class='has-text-info' href='/blog/"+this.Post.Titulo+"'>...Ler mais</a>"
    this.authService.currentUser.subscribe(x=>{
      this.CanView = CanViewPost(this.Post,x);
    })
  }
  meanRating(){
    if (!this.Post.Avaliacao)
    return 0;
    return  (sum(this.Post.Avaliacao) / this.Post.Avaliacao.length).toFixed(1)
  }
}
