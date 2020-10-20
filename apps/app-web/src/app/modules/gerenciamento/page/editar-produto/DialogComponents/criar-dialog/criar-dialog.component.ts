import { SelectionChange } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { CategoriaService } from 'apps/app-web/src/app/data/service';
import { Produto } from 'libs/data/src/lib/classes';
import { EditarProdutoDialogComponent } from '../editar-dialog/editar-dialog.component';
@Component({
  selector: 'personalizados-lopes-criar-dialog',
  templateUrl: './criar-dialog.component.html',
  styleUrls: ['./criar-dialog.component.scss']
})
export class CriarProdutoDialogComponent implements OnInit {

  Produto:Produto;

  Categorias: entities.Categoria[];
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Produto,
    private ServicoCategoria: CategoriaService
    ) {
      this.Produto = new Produto (
        "",
        "",
        null,
        "",
        [""],
        0,
        0,
        "",
        "",
        0,
        );
    }

  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x; console.log(x)});
  }

  ngOnInit() {
    this.CarregarCategorias();
  }

  upload($event){
    this.Produto.FileList = $event.target.files;
    console.log(this.Produto.FileList);
  }

  SelecionarCategoria($event){
    console.log($event);
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    console.log(this.Produto.Categoria)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
