import { Component, Input, OnInit } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-formulario-produtos-orcamento',
  templateUrl: './formulario-produtos-orcamento.component.html',
  styleUrls: ['./formulario-produtos-orcamento.component.scss']
})
export class FormularioProdutosOrcamentoComponent implements OnInit {
  @Input() Orcamento:Orcamento;
  @Input() EnviarOrcamento : () => void;
  constructor() { }

  ngOnInit(): void {
  }

}
