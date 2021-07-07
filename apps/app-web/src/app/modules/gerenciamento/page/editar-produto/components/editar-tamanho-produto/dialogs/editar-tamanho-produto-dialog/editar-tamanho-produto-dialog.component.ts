import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TamanhoProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-tamanho-produto-dialog',
  templateUrl: './editar-tamanho-produto-dialog.component.html',
  styleUrls: ['./editar-tamanho-produto-dialog.component.scss']
})
export class EditarTamanhoProdutoDialogComponent implements OnInit {

  TamanhoProduto:TamanhoProduto;
  constructor(public dialogRef: MatDialogRef<EditarTamanhoProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TamanhoProduto) {
      this.TamanhoProduto = data;
     }

  ngOnInit(): void {
  }

}
