import { Component, OnInit } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';
import { fade } from '../../../../../animations';
import { OrcamentoService } from '../../../../../data/service';

@Component({
  selector: 'personalizados-lopes-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  animations:[fade]
})
export class PedidosComponent implements OnInit {
  Pedidos:Orcamento[];
  Loading:boolean = true;
  constructor(private orcamentoService:OrcamentoService) { }

  ngOnInit(): void {
    this.orcamentoService.FiltrarOrcamentosPorUsuario().subscribe(x=>{
      this.Pedidos = x;
      this.Loading = false;
    })
  }

}
