import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'libs/data/src/lib/classes';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { CanViewPost } from '../../../helper/ObjHelper';

@Component({
  selector: 'personalizados-lopes-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.scss']
})
export class CardBlogComponent implements OnInit {
  @Input() Post:BlogPost;
  constructor(private authService:AuthenticationService) { }
  CanView:boolean;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x=>{
      this.CanView = CanViewPost(this.Post,x);
    })
  }
}
