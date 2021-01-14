import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { BlogPostService } from 'apps/app-web/src/app/data/service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/internal/operators/map';
import { CriarProdutoDialogComponent } from '../editar-produto/DialogComponents/criar-dialog/criar-dialog.component';
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
      data: ""
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
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.blogs = data as BlogPost[];
    });
  }

}
