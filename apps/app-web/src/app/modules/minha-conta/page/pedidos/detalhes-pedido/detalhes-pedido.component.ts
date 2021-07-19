import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.scss']
})
export class DetalhesPedidoComponent implements OnInit {
  Pedido:Pedido;
  constructor(private matRef:MatDialogRef<DetalhesPedidoComponent>,
     @Inject(MAT_DIALOG_DATA) public data:  Pedido ) {
       this.Pedido = data;
     }

  ngOnInit(): void {
  }

  onNoClick(){
    this.matRef.close();
  }

}
