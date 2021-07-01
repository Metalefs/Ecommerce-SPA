import { Component, Inject, Input, OnInit } from '@angular/core';
import { Categoria } from 'libs/data/src/lib/classes';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FiltroProdutoState, FiltroProdutoStateModel } from 'apps/app-web/src/app/data/store/state/filtroproduto.state';
import { Select } from '@ngxs/store';
@Component({
  selector: 'personalizados-lopes-filtro-categoria-dialog',
  templateUrl: './filtro-categoria-dialog.component.html',
  styleUrls: ['./filtro-categoria-dialog.component.scss']
})
export class FiltroCategoriaDialogComponent implements OnInit {

  defaultCategory = "Todos os produtos";

  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<FiltroProdutoStateModel>;
  constructor(public dialogRef: MatDialogRef<FiltroCategoriaDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:  FiltroCategoria) {
   }
  CategoriasAtivas: Categoria[] = [];

  ngOnInit(): void {
    this.Filtro$.subscribe(x=>{
      this.CategoriasAtivas = x.CategoriasAtivas
    })
  }

  SetCategoria(categoria:Categoria){
    this.dialogRef.close(categoria);
  }

  IsCategoriaAtiva(Categoria) {
    if(Categoria == null)
    return this.CategoriasAtivas.some(x => x.Nome == this.defaultCategory)
    return this.CategoriasAtivas.some(x => x.Nome == Categoria.Nome)
  }
}

export interface FiltroCategoria {
  Categorias:Categoria[],
  CategoriaAtiva:Categoria;
}
