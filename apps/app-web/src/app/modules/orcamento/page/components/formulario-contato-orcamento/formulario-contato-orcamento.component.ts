import { Component, Input, OnInit } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-formulario-contato-orcamento',
  templateUrl: './formulario-contato-orcamento.component.html',
  styleUrls: ['./formulario-contato-orcamento.component.scss']
})
export class FormularioContatoOrcamentoComponent implements OnInit {

  @Input() Orcamento:Orcamento;
  @Input() EnviarOrcamento : () => void;
  constructor() { }

  ngOnInit(): void {
  }

}
