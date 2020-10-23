import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';
import { fade } from '../../../animations';
import { AdicionarOrcamento } from '../../../data/store/actions/Orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  animations: [fade]
})
export class OrcamentoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Usuario:Usuario;
  constructor(private store:Store, private snack:MatSnackBar) {

  }

  ngOnInit(): void {
  }

  EnviarOrcamento(){
    this.store.dispatch(new AdicionarOrcamento()).subscribe(x=>{
      this.snack.open("Orçamento enviado! Responderemos dentro de 24 horas", "Fechar");
    });
  }
}
