import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-caixa-codigo-promocional',
  templateUrl: './caixa-codigo-promocional.component.html',
  styleUrls: ['./caixa-codigo-promocional.component.scss']
})
export class CaixaCodigoPromocionalComponent implements OnInit {

  @Input() ngModel: string;

  @Output() ngModelChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
