import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../_handlers/error-handler';

import * as express from 'express';
import { CupomDescontoService, IntegracoesService, PedidoService } from '../../services';
import { UsuarioLogado } from '../../_handlers/Authentication';
import { CupomDesconto, Integracoes, Orcamento, Pedido } from 'libs/data/src/lib/classes';
import { MercadoPagoPayment } from 'libs/data/src/lib/interfaces';
import { ensureIsLogged } from '../../middleware/ensure-is-logged';
import { TipoDesconto } from 'libs/data/src/lib/classes/cupom-desconto';
import { MercadoPagoClient } from '../../client/integrations/mercadopago.client';

const MercadoPagoController = express();

const mercadoPagoService = new MercadoPagoClient();

MercadoPagoController
.get(RouteDictionary.ListPayments, async (req: any, res) => {
  try {
    res.send(await mercadoPagoService.getAllPayments(await UsuarioLogado(req,res)));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.get("/ipn", (req, res) => {
  res.status(201).send();
  let merchant_order,payment = null;

	switch(req.query["topic"]) {
		case "payment":
			payment = mercadoPagoService.FindPaymentById(req.query["id"].toString());
			// Get the payment and the corresponding merchant_order reported by the IPN.
			merchant_order = mercadoPagoService.FindMerchantOrderById(payment.order.id);
			break;
		// case "merchant_order":
		// 	merchant_order = MercadoPago\MerchantOrder::find_by_id($_GET["id"]);
		// 	break;
	}

	let paid_amount = 0;
	merchant_order.payments.forEach(payment=> {
		if (payment['status'] === 'approved'){
			paid_amount += payment['transaction_amount'];
		}
	})

	// If the payment's transaction amount is equal (or bigger) than the merchant_order's amount you can release your items
	if(paid_amount >= merchant_order.total_amount){
		if (merchant_order.shipments.length>0) { // The merchant_order has shipments
			if(merchant_order.shipments[0].status == "ready_to_ship") {
				console.log("Totally paid. Print the label and release your item.");
			}
		} else { // The merchant_order don't has any shipments
			console.log("Totally paid. Release your item.");
		}
	} else {
		console.log("Not paid yet. Do not release your item.");
	}
})
.post("/hook", async (req, res) => {
  res.status(201).send();

  if(req.body)
  console.log(req.body)

  let payment:MercadoPagoPayment;

  switch(req.body["type"]) {
    case "payment":
        payment = mercadoPagoService.FindPaymentById(req.body["id"]);
        break;
    // case "plan":
    //     plan = MercadoPago\Plan.find_by_id(req.body["id"]);
    //     break;
    // case "subscription":
    //     plan = MercadoPago\Subscription.find_by_id(req.body["id"]);
    //     break;
    // case "invoice":
    //     plan = MercadoPago\Invoice.find_by_id(req.body["id"]);
    //     break;
  }
  const servicoPedidos = new PedidoService();
  const pedidosUsuario = await servicoPedidos.FiltrarPedidosPorIdUsuario(payment.payer.identification.number);

  if(pedidosUsuario){
    if(pedidosUsuario[pedidosUsuario?.length].HistoricoPagamento == null)
      pedidosUsuario[pedidosUsuario?.length].HistoricoPagamento = [];

    pedidosUsuario[pedidosUsuario?.length].HistoricoPagamento.push(payment);

    await servicoPedidos.AlterarSemUsuario(pedidosUsuario[pedidosUsuario?.length]);
  }

})
.post("/process_payment", (req, res) => {

  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuerId,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.identification.docType,
        number: req.body.payer.identification.docNumber
      }
    }
  };
  console.log(payment_data);
  // mercadopago.payment.save(payment_data)
  //   .then(function(response) {
  //     res.status(response.status).json({
  //       status: response.body.status,
  //       message: response.body.status_detail,
  //       id: response.body.id
  //     });
  //   })
  //   .catch(function(error) {
  //     res.status(error.status).send(error);
  //   });
})
.post(RouteDictionary.Checkout, ensureIsLogged, async (req: any, res) => {
    try {
      const orcamento = req.body.orcamento as Orcamento;
      const servicoCupomDesconto = new CupomDescontoService();
      const cupom = await servicoCupomDesconto.Filtrar({Codigo:orcamento.CupomDesconto}) as CupomDesconto;

      const integracoesService = new IntegracoesService();
      const integracoes = await integracoesService.LerUltimo() as Integracoes;

      if(cupom){
        switch(cupom.Tipo){
          case(TipoDesconto.Preco):{
            orcamento.Preco -= cupom.Valor;
            break;
          }
          case(TipoDesconto.Porcentagem):{
            orcamento.Preco -= (orcamento.Preco * cupom.Valor) /100
            break;
          }
        }
      }

      if(integracoes.valorMinimoDescontoCompras && integracoes.descontoCompras){
        if(orcamento.Preco >= integracoes.valorMinimoDescontoCompras){
          orcamento.Preco -= integracoes.descontoCompras;
        }
      }

      const preference = mercadoPagoService.getPreference(orcamento,cupom);
      res.send(await mercadoPagoService.checkout(preference));
      const pedido = new Pedido(orcamento);
      await new PedidoService().InserirSemUsuario(pedido);
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
})

.post(RouteDictionary.Refund, (req: any, res) => {
  try {
    mercadoPagoService.searchPayment(req.body.idPagamento).then(payment=>{
      console.log(payment);
      switch(payment.status){
        case('approved'):{
          mercadoPagoService.refund(req.body.idPagamento).then(x=>{
            res.send(x);
          });
          break;
        }
        case('pending'):{
          mercadoPagoService.cancel(req.body.idPagamento).then(x=>{
            res.send(x);
          });
          break;
        }
      }
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})

export {
  MercadoPagoController
}
