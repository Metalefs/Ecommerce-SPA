import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamento } from 'apps/app-web/src/app/data/store/actions/Orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-editar-orcamento',
  templateUrl: './editar-orcamento.component.html',
  styleUrls: ['./editar-orcamento.component.scss']
})
export class EditarOrcamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamentos$: Observable<Orcamento[]>;
  constructor(private store:Store, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  Responder(orcamento:Orcamento){
    if(orcamento.Status ==  StatusOrcamento.respondido)
      orcamento.Status = StatusOrcamento.aberto;
    else
      orcamento.Status =  StatusOrcamento.respondido;

    this.store.dispatch(new EditarOrcamento(orcamento,orcamento._id)).subscribe(x=>{
      this.snack.open("Orçamento alterado","Fechar");
    });
  }
}
