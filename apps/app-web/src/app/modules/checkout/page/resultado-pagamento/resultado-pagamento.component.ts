import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MercadoPagoPayment } from 'apps/app-web/src/app/data/models';
import { MercadoPagoCheckoutService, IntegracoesService } from 'apps/app-web/src/app/data/service';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';

import { AdicionarOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
@Component({
  selector: 'personalizados-lopes-resultado-pagamento',
  templateUrl: './resultado-pagamento.component.html',
  styleUrls: ['./resultado-pagamento.component.scss']
})
export class ResultadoPagamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;

  Finalizado:boolean = false;
  Loading:boolean = false;
  state='flipped';
  payment:MercadoPagoPayment;
  status:StatusPagamento;
  StatusPagamento = StatusPagamento;
  _init_point:{};
  constructor(private activeRoute:ActivatedRoute,
    private snack: MatSnackBar,
    private checkoutService: MercadoPagoCheckoutService,
    private integracoesService: IntegracoesService,
    private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
      if(this.Orcamento.Status == StatusOrcamento.enviado)
        this.Finalizado = true;
    })
    setTimeout(()=>{
      this.flip()
      this.LerParametros();

      this.SalvarOrcamento();
    },0);
  }

  LerParametros(){
    this.activeRoute.queryParams.filter(params => params.status)
    .subscribe(params => {
      this.PreencherDadosPagamentoNoOrcamento(params);
      switch(params.status){
        case ("approved"): {
          this.status = StatusPagamento.aprovado;
          break;
        }
        case("rejected"):{
          this.status = StatusPagamento.rejeitado;
          this.goCheckout();
          break;
        }
        case("failure"):{
          this.status = StatusPagamento.rejeitado;
          this.goCheckout();
          break;
        }
        case("pending"):{
          this.status = StatusPagamento.pendente;
          break;
        }
      }
    })
  }

  PreencherDadosPagamentoNoOrcamento(resultadoPagamento:any){
    this.Orcamento.ResultadoPagamentoMP = {
      collection_id: resultadoPagamento.collection_id ?? 0,
      collection_status: resultadoPagamento.collection_status ?? '',
      site_id: resultadoPagamento.site_id ?? '',
      status: resultadoPagamento.status ?? '',
      merchant_account_id: resultadoPagamento.merchant_account_id ?? 0,
      external_reference: resultadoPagamento.external_reference ??' ',
      payment_id: resultadoPagamento.payment_id ?? 0,
      merchant_order_id: resultadoPagamento.merchant_order_id ?? 0,
      preference_id: resultadoPagamento.preference_id ?? '',
      payment_type: resultadoPagamento.payment_type ?? '',
      processing_mode: resultadoPagamento.processing_mode ??''
    }
  }

  SalvarOrcamento(){
    if(this.Orcamento.Usuario.Email&&!this.Finalizado ){
      if(this.Orcamento.Preco >0)
      this.store.dispatch(new AdicionarOrcamento()).subscribe(x=>{
        setTimeout(()=>{
          this.Finalizado = true;

          (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
          }
          )();

          this.Loading = false;
          this.Orcamento.Status = StatusOrcamento.enviado;
          this.store.dispatch(new ResetarOrcamento())
        },3500)
      });
    }
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

  goCheckout(){
    this.Orcamento$.subscribe(orcamento => {
      this.Loading = true;
      this.integracoesService.Ler().subscribe(x=>{
        if(orcamento.Usuario.Email)
        this.checkoutService.goCheckout(orcamento,x).subscribe(result => {
          this._init_point = result;
          console.log(this._init_point);
          this.Loading = false;
          (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
          })();
        })
        else{
          this.snack.open("Carrinho inválido, tente finalizar o pedido no carrinho novamente para concluir o pagamento.","fechar",{
            verticalPosition:'top'
          });

        }
      })
    })
  }
}
export enum StatusPagamento{
  aprovado,
  pendente,
  rejeitado
}
