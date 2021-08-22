import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'libs/data/src/lib/classes';

import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MercadoPagoCheckoutService } from 'apps/app-web/src/app/shared/services';
import { PedidoService } from 'apps/app-web/src/app/data/service';
import { NomeTransportadora} from 'apps/app-web/src/app/helper/FreteHelper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'personalizados-lopes-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.scss']
})
export class PedidoDetailComponent implements OnInit {
  codRastreamentoForm:FormGroup;
  constructor(
    private pedidoService: PedidoService,
    private snack:MatSnackBar,
    private activeRoute: ActivatedRoute,
    private fb:FormBuilder,
    private ServicoMercadoPago: MercadoPagoCheckoutService) { }

  Pedido:Pedido;
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.pedidoService.Filtrar(id).subscribe((x :Pedido[])=>{
      this.Pedido = x[0];
      this.codRastreamentoForm = this.fb.group({
        codigo:[this.Pedido.CodRastreamento || "", Validators.required]
      })
    })
  }

  Devolver(pedido:Pedido){
    if(pedido.ResultadoPagamentoMP.status == "approved"){
      let confirmation = confirm("Devolver o pedido?");
      if(confirmation)
      this.ServicoMercadoPago.refund(pedido.ResultadoPagamentoMP.payment_id).subscribe(x=>{
        pedido.Status = StatusOrcamento.devolvido;
        pedido.ResultadoPagamentoMP.status = "cancelled";
        console.log(x)
        this.pedidoService.Editar(pedido).subscribe(x=>{
          this.snack.open("Pedido alterado","Fechar");
        });
      })
    }
  }

  Responder(pedido:Pedido){
    if(pedido.Status ==  StatusOrcamento.respondido)
      pedido.Status = StatusOrcamento.aberto;
    else
      pedido.Status =  StatusOrcamento.respondido;

    this.pedidoService.Editar(pedido).subscribe(x=>{
      this.snack.open("Pedido alterado","Fechar");
    });
  }

  Remover(pedido:Pedido){
    let confirmation = confirm("Devolver o pedido?");
    if(confirmation){
      this.pedidoService.Remover(pedido._id).subscribe(x=>{
        this.snack.open("Pedido removido","Fechar");
      });
    }
  }

  EnviarCodigoRastreamento(){
    const COD = this.codRastreamentoForm.get("codigo").value;
    this.pedidoService.EnviarCodigoRastreamento(this.Pedido._id, COD).subscribe(x=>{
      this.CarregarPedido();
    })
  }

  CarregarPedido(){
    let id = this.activeRoute.snapshot.params['id'];
    this.pedidoService.Filtrar(id).subscribe((x :Pedido[])=>{
      this.Pedido = x[0];
    })
  }

  NomeTransportadora(codigo){
    return NomeTransportadora(codigo);
  }
}
