import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { entities } from '@personalizados-lopes/data';
import { Store } from '@ngxs/store';

import { CriarProdutoDialogComponent } from './DialogComponents/criar-dialog/criar-dialog.component';
import { AdicionarProduto, EditarProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { EditarProdutoService } from './editar-produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fade } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { EditarProdutoDialogComponent } from './DialogComponents/editar-dialog/editar-dialog.component';
import { ProdutoStateService } from '../../../produtos/produto-state.service';

@Component({
  selector: 'personalizados-lopes-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss'],
  animations: [fade]
})
export class EditarProdutoComponent implements OnInit {

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected produtoService: EditarProdutoService,
    protected authService: AuthenticationService,

    protected produtoStateService: ProdutoStateService,
    ) {
  }

  ngOnInit(): void {
  }

  Criar(): void {
    const dialogRef = this.dialog.open(CriarProdutoDialogComponent, {
      width: "100%",
      height: "100%",
      data: "",
      panelClass:['']
    });
    dialogRef.afterClosed().subscribe((Produto : entities.Produto) => {
      if(Produto != undefined){
        this.store.dispatch(new AdicionarProduto(Produto)).subscribe(x=>{
          this._snackBar.open("Produto adicionado com sucesso", "Fechar", {
            verticalPosition:"top"
          });
        });
        this.produtoStateService.Atualizar()
      }
    });
  }

  Editar(Produto){
    let id = Produto._id;

    const dialogRef = this.dialog.open(EditarProdutoDialogComponent, {
      width: "90%",
      height: "100%",
      data: Produto,
    });

    dialogRef.afterClosed().subscribe((Produto :entities.Produto) => {
      if(Produto != undefined){
        Produto._id = id;
        Produto.NomeCategoria = Produto.Categoria.Nome;
        this.store.dispatch(new EditarProduto(Produto, Produto._id)).subscribe(X=>{
          this._snackBar.open("Produto alterado com sucesso", "Fechar", {
            duration: 3000
          });
          this.produtoStateService.Atualizar()
        });
      }
    });
  }
}
