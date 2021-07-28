import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { AplicarCodigoPromocional } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';

@Component({
  selector: 'personalizados-lopes-caixa-codigo-promocional',
  templateUrl: './caixa-codigo-promocional.component.html',
  styleUrls: ['./caixa-codigo-promocional.component.scss']
})
export class CaixaCodigoPromocionalComponent implements OnInit {
  @Input()CodigoPromocional:string;
  constructor(private store:Store) {
  }

  ngOnInit(): void {

  }

  AplicarCodigo(codigo:string){
    console.log(codigo)
    this.store.dispatch(new AplicarCodigoPromocional(this.CodigoPromocional));
  }

}
