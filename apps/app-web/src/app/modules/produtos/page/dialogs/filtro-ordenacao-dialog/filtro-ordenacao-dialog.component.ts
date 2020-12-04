import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderType } from 'apps/app-web/src/app/data/models/order-type';
import { TiposOrdenacao } from '../../produtos.component';

@Component({
  selector: 'personalizados-lopes-filtro-ordenacao-dialog',
  templateUrl: './filtro-ordenacao-dialog.component.html',
  styleUrls: ['./filtro-ordenacao-dialog.component.scss']
})
export class FiltroOrdenacaoDialogComponent implements OnInit {
  activeOrderFilter:number = TiposOrdenacao.nome;
  constructor(public dialogRef: MatDialogRef<FiltroOrdenacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  FiltroOrdenacao) {
      console.log(data)
    }

  ngOnInit(): void {
  }

  atualizarFiltroAtivo(order:OrderType){
    this.dialogRef.close(order)
  }
}
export interface FiltroOrdenacao {
  ordertypes:OrderType[];
  activeOrderFilter:number;
}
