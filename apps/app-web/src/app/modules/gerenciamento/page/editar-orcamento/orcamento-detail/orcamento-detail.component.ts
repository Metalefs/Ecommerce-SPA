import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamento, RemoverOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';
import { fabric } from "fabric";
import { isPlatformBrowser } from '@angular/common';
import { MercadoPagoCheckoutService } from 'apps/app-web/src/app/shared/services';
@Component({
  selector: 'personalizados-lopes-orcamento-detail',
  templateUrl: './orcamento-detail.component.html',
  styleUrls: ['./orcamento-detail.component.scss']
})
export class OrcamentoDetailComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamentos$: Observable<Orcamento[]>;
  constructor(private store:Store, private snack:MatSnackBar,
    private activeRoute: ActivatedRoute,
    private ServicoMercadoPago: MercadoPagoCheckoutService) { }

  Orcamento:Orcamento;
  __canvas:any;
  fabric = fabric;
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.Orcamentos$.subscribe(x=>{
      this.Orcamento = x.find(x=>x._id == id);
      console.log(this.Orcamento);
    })

    this.__canvas = new this.fabric.Canvas('c');

    this.fabric.Object.prototype.cornerColor = '#131313';
    this.fabric.Object.prototype.transparentCorners = false;
    if(isPlatformBrowser(PLATFORM_ID))
    this.setup();
    this.importJson(this.Orcamento.Produto[0].Produto.Canvas);
  }

  setup(){
    fabric.Object.prototype.cornerColor = '#131313';
    fabric.Object.prototype.transparentCorners = false;
    let self = this;
    document.getElementById('fill-color').onchange = function (x) {
        self.__canvas.getActiveObject().set("fill", x.returnValue);
        self.__canvas.renderAll();
      };
    document.getElementById('font-family').onchange = function (x) {
      self.__canvas.getActiveObject().set("fontFamily", x.returnValue);
      self.__canvas.renderAll();
    };

  }
  fileLoaded:any;
  objType:any;
  importJson(json) {

    //uploadJson(fileLoaded)
    var result
    var formatted
    var fr = new FileReader();
    fr.onload = function (e) {
      console.log("2", e);
      result = JSON.parse(e.target.result.toString());
      console.log("result", result);
      formatted = JSON.stringify(result, null, 2);
      console.log("formatted", formatted);

      loadJson(formatted);
    }

    fr.readAsText(json);
    function loadJson(formatted) {
      console.log('here');
      this.__canvas.loadFromJSON(formatted, function (obj) {
        console.log(' this is a callback. invoked when canvas is loaded!xxx ');
        this.__canvas.renderAll();
        this.SaveDesign();
      });
    }
  }

  Devolver(orcamento:Orcamento){
    if(orcamento.ResultadoPagamentoMP.status == "approved"){
      let confirmation = confirm("Devolver o pedido?");
      if(confirmation)
      this.ServicoMercadoPago.refund(orcamento.ResultadoPagamentoMP.payment_id).subscribe(x=>{
        orcamento.Status = StatusOrcamento.devolvido;
        orcamento.ResultadoPagamentoMP.status = "cancelled";
        console.log(x)
        this.store.dispatch(new EditarOrcamento(orcamento,orcamento._id)).subscribe(x=>{
          this.snack.open("Pedido alterado","Fechar");
        });
      })
    }
  }

  Responder(orcamento:Orcamento){
    if(orcamento.Status ==  StatusOrcamento.respondido)
      orcamento.Status = StatusOrcamento.aberto;
    else
      orcamento.Status =  StatusOrcamento.respondido;

    this.store.dispatch(new EditarOrcamento(orcamento,orcamento._id)).subscribe(x=>{
      this.snack.open("Pedido alterado","Fechar");
    });
  }

  Remover(orcamento:Orcamento){
    let confirmation = confirm("Devolver o pedido?");
    if(confirmation){
      this.store.dispatch(new RemoverOrcamento(orcamento._id)).subscribe(x=>{
        this.snack.open("Pedido removido","Fechar");
      });
    }
  }
}
