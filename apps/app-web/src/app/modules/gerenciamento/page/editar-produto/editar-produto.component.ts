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
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';

@Component({
  selector: 'personalizados-lopes-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {

  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  Produtos:Produto[];
  ProdutoToBeUpdated: Produto;
  pagina:number=1;
  items:number=12;
  total:number=0;
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
    this.Atualizar();
   }

   ngOnDestroy() {
     this.areProdutosLoadedSub.unsubscribe();
   }
   fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
    Tags:""
  }
  Atualizar(){
    this.pService.FiltrarProdutos(this.fQuery,1,50).subscribe(x=>{
      this.Produtos = x.items;
      this.total = x.total;
    })
  }
  CarregarMaisProdutos(){
    this.pagina++;
    this.pService.FiltrarProdutos(this.fQuery,this.pagina,this.items).subscribe(x=>{
      this.total = x.total;
      x.items.forEach(item=>this.Produtos.push(item))
      console.log(x);
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
