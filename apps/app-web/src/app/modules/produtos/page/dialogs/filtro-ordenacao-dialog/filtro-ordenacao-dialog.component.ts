import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderType } from 'apps/app-web/src/app/shared/models/interfaces';

@Component({
  selector: 'personalizados-lopes-filtro-ordenacao-dialog',
  templateUrl: './filtro-ordenacao-dialog.component.html',
  styleUrls: ['./filtro-ordenacao-dialog.component.scss']
})
export class FiltroOrdenacaoDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FiltroOrdenacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  FiltroOrdenacao) {
    }
  orderLimit:OrderType[]= [
    {name:'10 produtos por página', id: 10},
    {name:'15 produtos por página', id: 15},
    {name:'30 produtos por página', id: 30},
    {name:'50 produtos por página', id: 50},
  ]
  activeOrderLimit:number = 10;
  ngOnInit(): void {
  }

  atualizarOrderFilter(order:OrderType){
    this.data.activeOrderFilter = order.id;
    this.dialogRef.close(this.data)
  }
  atualizarOrderLimit(order:number){
    this.data.activeOrderLimit = order;
    this.dialogRef.close(this.data)
  }
}
export interface FiltroOrdenacao {
  ordertypes:OrderType[];
  activeOrderFilter:number;
  activeOrderLimit:number;
}
