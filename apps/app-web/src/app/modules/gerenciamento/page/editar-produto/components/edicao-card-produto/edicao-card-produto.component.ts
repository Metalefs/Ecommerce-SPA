import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';

import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';

import { CategoriaService, ImagemService, ProdutoService } from 'apps/app-web/src/app/data/service';
import { EditarProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { EditarProdutoDialogComponent } from '../../../editar-produto/DialogComponents/editar-dialog/editar-dialog.component';
import { isEmpty } from '../../../../../../helper/ObjHelper';
import { fade } from '../.././../../../../animations';

@Component({
  selector: 'personalizados-lopes-edicao-card-produto',
  templateUrl: './edicao-card-produto.component.html',
  styleUrls: ['./edicao-card-produto.component.scss'],
  animations: [fade]
})
export class EdicaoCardProdutoComponent implements OnInit {

  @Output() Isdeleted = new EventEmitter();
  @Input() Produto:entities.Produto;
  constructor(private service: ProdutoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store,
    private servicoCategoria: CategoriaService,) {

    this.service = service;

  }

  ngOnInit(): void {
  }

  Editar(){
    let id = this.Produto._id;

    const dialogRef = this.dialog.open(EditarProdutoDialogComponent, {
      width: "100%",
      height: "100%",
      data: this.Produto
    });

    dialogRef.afterClosed().subscribe((Produto :entities.Produto) => {
      if(Produto != undefined){
        Produto._id = id;
        this.servicoCategoria.Ler().subscribe(x=>{
          Produto.Categoria = x.filter(cat => cat.Nome == Produto.NomeCategoria)[0];
          this.store.dispatch(new EditarProduto(Produto, Produto._id)).subscribe(X=>{
            this._snackBar.open("Produto alterado com sucesso", "Fechar", {

            });
          });
        });
      }
    });
  }

  Atualizar(){
    this.service.Filtrar(this.Produto._id).subscribe(x=>{
      this.Produto = x[0];
    })
  }

  async Remover(){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      (await this.service.Remover(this.Produto._id)).subscribe(async x=>{
        this._snackBar.open("Produto "+this.Produto.Nome+" removido com sucesso", "Fechar", {

        });
        delete this.Produto; this.Isdeleted.emit();
      });
    }
  }
}
