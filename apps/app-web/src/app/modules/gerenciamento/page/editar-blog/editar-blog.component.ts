import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogPostService } from 'apps/app-web/src/app/data/service';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/internal/operators/map';
import { CriarProdutoDialogComponent } from '../editar-produto/DialogComponents/criar-dialog/criar-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-blog',
  templateUrl: './editar-blog.component.html',
  styleUrls: ['./editar-blog.component.scss']
})
export class EditarBlogComponent implements OnInit {

  blogs:BlogPost[];
  constructor(private BlogService:BlogPostService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.retrieveblogs();
  }

  saveblog(): void {
    const dialogRef = this.dialog.open(CriarProdutoDialogComponent, {
      width: '90%',
      data: ""
    });

    dialogRef.afterClosed().subscribe((post : BlogPost) => {
      if(post != undefined){

        this.BlogService.create(post).then(() => {
          this._snackBar.open("Adicionando postagem", "Fechar", {

          });
        });

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
      this.blogs = data as BlogPost[];
    });
  }

}
