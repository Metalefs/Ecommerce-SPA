import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';
import { InformacoesContato } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.scss']
})
export class CardContatoComponent implements OnInit {
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  constructor() { }

  ngOnInit(): void {
  }

}
