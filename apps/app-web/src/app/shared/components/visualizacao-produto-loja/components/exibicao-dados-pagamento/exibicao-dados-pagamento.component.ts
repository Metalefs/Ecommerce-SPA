import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-exibicao-dados-pagamento',
  templateUrl: './exibicao-dados-pagamento.component.html',
  styleUrls: ['./exibicao-dados-pagamento.component.scss']
})
export class ExibicaoDadosPagamentoComponent implements OnInit {

  infosPagamento:any = [
    { descricao: "Cartões de Crédito" },
    { descricao: "Visa - Master - Hipercard" },
    { descricao: "Diners - Amex - Elo - Hiper" },
    { descricao: "mercadopago.com.br" },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
