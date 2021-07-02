import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/internal/operators/map';
import { BlogPostService } from '../../../blog/blog.service';
import { CriarPostComponent } from './dialogs/criar-post/criar-post.component';

@Component({
  selector: 'personalizados-lopes-editar-blog',
  templateUrl: './editar-blog.component.html',
  styleUrls: ['./editar-blog.component.scss']
})
export class EditarBlogComponent implements OnInit {

  blogs:BlogPost[];
  instagram:string;
  facebook:string;
  twitter:string;
  constructor(private BlogService:BlogPostService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.retrieveblogs();
  }

  Criar(): void {
    const dialogRef = this.dialog.open(CriarPostComponent, {
      width: '90%',
      data: "",
      panelClass:['fullscreen-modal']
    });

    dialogRef.afterClosed().subscribe((post : BlogPost) => {
      if(post != undefined){
        this.authService.currentUser.subscribe(usr=>{
          post.Autor.Nome = usr.Nome;
          post.Autor.Email = usr.Email;

          post.DataHoraAlteracao = new Date();
          post.DataHoraCriacao = new Date();
          this.BlogService.create(post).then(() => {
            this._snackBar.open("Adicionando postagem", "Fechar", {

            });
          });
        })
      }
    });
  }

  retrieveblogs(): void {
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.val(), ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.blogs = data as BlogPost[];
    });
  }

}
