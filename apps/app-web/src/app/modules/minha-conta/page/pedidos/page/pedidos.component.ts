import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Orcamento } from 'libs/data/src/lib/classes';
import { fade } from '../../../../../animations';
import { OrcamentoService } from '../../../../../data/service';
import { DetalhesPedidoComponent } from '../detalhes-pedido/detalhes-pedido.component';

@Component({
  selector: 'personalizados-lopes-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  animations:[fade]
})
export class PedidosComponent implements OnInit {
  Pedidos:Orcamento[];
  Loading:boolean = true;
  constructor(private orcamentoService:OrcamentoService,
   private dialog:MatDialog) { }

  ngOnInit(): void {
    this.orcamentoService.FiltrarOrcamentosPorUsuario().subscribe(x=>{
      this.Pedidos = x;
      this.Loading = false;
    })
  }
  abrirDetalhesPedido(pedido:Orcamento){
    const dialogRef = this.dialog.open(DetalhesPedidoComponent, {
      width: '90%',
      data: pedido
    });

    dialogRef.afterClosed().subscribe((data) => {});
  }
}
