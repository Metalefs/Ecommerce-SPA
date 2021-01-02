import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MercadoPagoPayment } from 'apps/app-web/src/app/data/models';

@Component({
  selector: 'personalizados-lopes-resultado-pagamento',
  templateUrl: './resultado-pagamento.component.html',
  styleUrls: ['./resultado-pagamento.component.scss']
})
export class ResultadoPagamentoComponent implements OnInit {
  Finalizado:boolean = false;
  Loading:boolean = false;
  state='flipped';
  payment:MercadoPagoPayment;
  status:StatusPagamento;
  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.flip()
      this.LerParametros();
    },0);
  }

  LerParametros(){
    this.activeRoute.queryParams.filter(params => params.status)
    .subscribe(params => {
      if(params.status == "approved")
        this.status = StatusPagamento.aprovado;
      else
        this.status = StatusPagamento.rejeitado
    })
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }
}
export enum StatusPagamento{
  aprovado,
  pendente,
  rejeitado
}
