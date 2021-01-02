import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamento, RemoverOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-editar-orcamento',
  templateUrl: './editar-orcamento.component.html',
  styleUrls: ['./editar-orcamento.component.scss']
})
export class EditarOrcamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamentos$: Observable<Orcamento[]>;
  PedidoTable:MaterialTable;
  constructor(private store:Store, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.PedidoTable = new MaterialTable();
    this.Orcamentos$.subscribe(x=>{
      this.PedidoTable.dataSource = x;
    })
    this.PedidoTable.displayedColumns = [
      "Nome",
      "Email",
      "CPF",
      "IDPagamento",
      "Data",
      "Preco",
      "Status",
      "StatusMP",
      "Actions",
    ];
  }
}
