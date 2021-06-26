import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { CanViewPost } from 'apps/app-web/src/app/helper/ObjHelper';
import { BlogPost, Usuario } from 'libs/data/src/lib/classes';
import { StatusPostagem } from 'libs/data/src/lib/classes/blogPost';
import { map } from 'rxjs/operators';
import { BlogPostService } from '../../blog.service';

@Component({
  selector: 'personalizados-lopes-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  Blog:BlogPost[];
  loading:boolean = true;
  statusPostagem = StatusPostagem;
  user:Usuario;
  constructor(private BlogService:BlogPostService,private authService:AuthenticationService) { }

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
    this.authService.currentUser.subscribe(x=>{
      this.user = x;
    })
  }
  CanView(post:BlogPost){
    return CanViewPost(post,this.user);
  }
}
