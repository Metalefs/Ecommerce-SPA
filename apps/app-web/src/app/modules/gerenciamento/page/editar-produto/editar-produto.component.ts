import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { entities } from '@personalizados-lopes/data';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CriarProdutoDialogComponent } from './DialogComponents/criar-dialog/criar-dialog.component';
import { Imagem, Produto } from 'libs/data/src/lib/classes';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state/produto.state';
import { AdicionarProduto, LerProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { CategoriaService, ProdutoService } from 'apps/app-web/src/app/data/service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'personalizados-lopes-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {

  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  Produtos:Produto[];
  ProdutoToBeUpdated: Produto;

  isUpdateActivated = false;

  areProdutosLoadedSub: Subscription;

  constructor(
    private store: Store,
    private pService: ProdutoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) {

      this.Atualizar();
  }

  ngOnInit(): void {
    // this.Atualizar();
   }

   ngOnDestroy() {
     this.areProdutosLoadedSub.unsubscribe();
   }

  Atualizar(){
    this.pService.Ler().subscribe(x=>{
      this.Produtos = x.items;
    })
  }
  Refresh(){
    this.pService.Ler().subscribe(x=>{
      this.Produtos = x.items;
    })
  }
  Criar(): void {
    const dialogRef = this.dialog.open(CriarProdutoDialogComponent, {
      width: "100%",
      height: "100%",
      data: ""
    });

    dialogRef.afterClosed().subscribe((Produto : entities.Produto) => {
      if(Produto != undefined){
        this.store.dispatch(new AdicionarProduto(Produto)).subscribe(x=>{
          this._snackBar.open("Adicionando produto", "Fechar", {

          });
        });
      }
    });
  }

}
