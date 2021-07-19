import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from 'libs/data/src/lib/classes';
import { fade } from '../../../../../animations';
import { PedidoService } from '../../../../../data/service';
import { DetalhesPedidoComponent } from '../detalhes-pedido/detalhes-pedido.component';

@Component({
  selector: 'personalizados-lopes-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  animations:[fade]
})
export class PedidosComponent implements OnInit {
  Pedidos:Pedido[] = null;
  Loading:boolean = true;
  constructor(
    private pedidoService:PedidoService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.pedidoService.FiltrarPedidosPorUsuario().subscribe(x=>{
      this.Pedidos = x;
      this.Loading = false;
    })
  }
  abrirDetalhesPedido(pedido:Pedido){
    const dialogRef = this.dialog.open(DetalhesPedidoComponent, {
      width: '90%',
      data: pedido
    });

    dialogRef.afterClosed().subscribe((data) => {});
  }
}
