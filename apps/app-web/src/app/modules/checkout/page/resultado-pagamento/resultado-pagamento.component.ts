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
  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.flip()
    },0);
  }

  LerParametros(){
    this.activeRoute.queryParams.filter(params => params.categoria)
    .subscribe(params => {

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
