import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
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
  Pedidos:Orcamento[] = null;
  Loading:boolean = true;
  constructor(private orcamentoService:OrcamentoService,
   private auth:AuthenticationService,
   private dialog:MatDialog) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user=>{
      this.orcamentoService.FiltrarOrcamentosPorUsuario(user.token).subscribe(x=>{
        this.Pedidos = x;
        this.Loading = false;
      })
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
