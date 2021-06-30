import { BlogPost } from 'libs/data/src/lib/classes';
import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarPostComponent } from '../dialogs/editar-post/editar-post.component';
import { BlogPostService } from '../../../../blog/blog.service';
@Component({
  selector: 'personalizados-lopes-edicao-card-blog',
  templateUrl: './edicao-card-blog.component.html',
  styleUrls: ['./edicao-card-blog.component.scss']
})
export class EdicaoCardBlogComponent implements OnInit {

  @Output() Isdeleted = new EventEmitter();
  @Input() BlogPost:BlogPost;
  constructor(private BlogService:BlogPostService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
  }

  Editar(){

    const dialogRef = this.dialog.open(EditarPostComponent, {
      width: '90%',
      data: this.BlogPost,
      panelClass:['fullscreen-modal']
    });

    dialogRef.afterClosed().subscribe((post :BlogPost) => {
      if(post != undefined){
        const data = {
          Titulo: post.Titulo,
          Conteudo: post.Conteudo,
          Categoria: post.Categoria,
          FotoCapa: post.FotoCapa,
          StatusPostagem: post.StatusPostagem,
          DataHoraAlteracao: post.DataHoraAlteracao = new Date(),
          Tags: post.Tags
        };

        this.BlogService.update(this.BlogPost.key, data)
          .then(() => this._snackBar.open("Produto alterado com sucesso", "Fechar", {

          }))
          .catch(err => console.log(err));
      }
    });
  }

  async Remover(){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      this.BlogService.delete(this.BlogPost.key)
      .then(() => {
        this._snackBar.open("Post "+this.BlogPost.Titulo+" removido com sucesso", "Fechar", {

        });
        delete this.BlogPost; this.Isdeleted.emit();
      })
      .catch(err => console.log(err));

    }
  }
}
