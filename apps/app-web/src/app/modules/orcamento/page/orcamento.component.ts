import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';
import { OrcamentoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {

  @Select(OrcamentoState.ObterListaOrcamentos) Orcamento$: Observable<Orcamento>;
  Usuario:Usuario;
  constructor() {

  }

  ngOnInit(): void {
  }

}
