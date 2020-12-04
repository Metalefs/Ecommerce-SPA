import { Component, Inject, Input, OnInit } from '@angular/core';
import { Categoria } from 'libs/data/src/lib/classes';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
@Component({
  selector: 'personalizados-lopes-filtro-categoria-dialog',
  templateUrl: './filtro-categoria-dialog.component.html',
  styleUrls: ['./filtro-categoria-dialog.component.scss']
})
export class FiltroCategoriaDialogComponent implements OnInit {

  defaultCategory = "Todos os produtos";
  CategoriaAtiva:Categoria;

  constructor(public dialogRef: MatDialogRef<FiltroCategoriaDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:  FiltroCategoria) {
   }

  ngOnInit(): void {
  }

  SetCategoria(categoria:Categoria){
    this.dialogRef.close(categoria);
  }

}

export interface FiltroCategoria {
  Categorias:Categoria[],
  CategoriaAtiva:Categoria;
}
