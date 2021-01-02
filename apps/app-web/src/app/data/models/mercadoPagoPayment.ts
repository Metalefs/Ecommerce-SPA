import {mp_checkout_items, mp_checkout_payer, mp_checkout_payer_identification, mp_shipments} from './mercadoPagoCheckout';
export interface MercadoPagoPayment{
  id:number; //Identificador de pagamento.
  date_created:Date;//Data de criação do pagamento.
  date_approved:Date;//Data de aprovação do pagamento.
  date_last_updated:Date;//Data da última modificação.
  money_release_date:Date//Data de liberação do pagamento.
  collector_id:number;//Identificação do vendedor.
  operation_type:string;//Tipo de pagamento.
  // regular_payment // Typification by default of a purchase being paid using Mercado Pago.
  // money_transfer // Funds transfer between two users.
  // recurring_payment // Automatic recurring payment due to an active user subscription.
  // account_fund // Money income in the user's account.
  // payment_addition // Addition of money to an existing payment, done in Mercado Pago's site.
  // cellphone_recharge // Recharge of a user's cellphone account.
  // pos_payment // Payment done through a Point Of Sale.
  payer:any | mp_checkout_payer; //Id do pagador.
  binary_mode:boolean; //Quando estiver ativado, o pagamento só pode ser aprovado ou rejeitado. De não estar ativado, para além deste estado, o pagamento pode ser pendente (in_process).
  live_mode:boolean; //Indica se o pagamento é processado em ambiente de sandbox ou produção.
  order: mp_order;//Identificador de ordem.
  external_reference:string;//Identificação fornecida pelo vendedor em seu sistema.
  description:string;//Razão de pagamento ou título do item.
  metadata:object;//JSON válido que pode ser adicionado ao pagamento para salvar atributos adicionais do comprador.
  currency_id:string;//Identificador da moeda utilizada no pagamento.
  // ARS
  // Argentine peso.
  // BRL
  // Brazilian real.
  // CLP
  // Chilean peso.
  // MXN
  // Mexican peso.
  // COP
  // Colombian peso.
  // PEN
  // Peruvian sol.
  // UYU
  // Uruguayan peso.
  transaction_amount:number; //Custo do produto. (Obrigatório)
  transaction_amount_refunded:number;//Valor total reembolsado este pagamento.
  coupon_amount:number//Valor do cupom de desconto.
  date_of_expiration:Date;//Data de expiração do pagamento.
  campaign_id:number;//Identificador da campanha de desconto.
  coupon_code:string;//Campanha de desconto com um código específico.
  transaction_details:mp_transaction_details;
  fee_details:object[];//Lista de comissões.
  differential_pricing_id:number;//Id do esquema de absorção do custo financeiro.
  application_fee:number;//Comissão coletadas pelo mercado ou pelo Mercado Pago.
  status:string;//Estado do pagamento.
  // pending // The user has not yet completed the payment process.
  // approved // The payment has been approved and accredited.
  // authorized // The payment has been authorized but not captured yet.
  // in_process // Payment is being reviewed.
  // in_mediation // Users have initiated a dispute.
  // rejected // Payment was rejected. The user may retry payment.
  // cancelled // Payment was cancelled by one of the parties or because time for payment has expired
  // refunded // Payment was refunded to the user.
  // charged_back // Was made a chargeback in the buyer’s credit card.
  status_detail:string;//Fornece informação detalhada do estado atual, ou o motivo de rejeição.
  capture:boolean;//Determina se o pagamento deve ser capturado(true, default value), ou apenas reservado(false).
  captured:boolean;//Determina se a captura de a operação foi realizada (somente para cartões de crédito).
  call_for_authorize_id:string;//Identificador que deve ser fornecida ao banco emissor para autorizar o pagamento.
  payment_method_id:string;//Meio de pagamento escolhido para fazer o pagamento. (Obrigatório)
  issuer_id:string;//Id do emitente do meio de pagamento.
  payment_type_id:string;//Tipo do meio de pagamento escolhido.
  // account_money // Money in the Mercado Pago account.
  // ticket // Printed ticket.
  // bank_transfer // Wire transfer.
  // atm // Payment by ATM.
  // credit_card // Payment by credit card.
  // debit_card // Payment by debit card.
  // prepaid_card // Payment by prepaid card.
  token:string; //Identificador de token card. (Obrigatório para cartão de crédito)
  card:mp_card;//Os detalhes do cartão utilizado.
  statement_descriptor:string;//Como aparecerá o pagamento no extrato do cartão (ex: o MERCADOPAGO).
  installments:number;//Quantidade selecionada de cotas. (Obrigatório)
  notification_url:string; //URL para qual Mercado Pago enviará notificações associadas a mudanças no status do pagamento.
  callback_url:string;//URL para a qual o Mercado Pago faz o redirecionamento final (apenas para transferência bancária).
  refunds:object[];//Lista de reembolsos que foram feitas a este pagamento.
  additional_info:object //Informações que podem melhorar a análise de prevenção de fraude e a taxa de conversão. Trata de enviar-nos toda a informação possível.
}

export interface mp_order{
  type:string;
  id:number;
}

export interface mp_transaction_details{
  financial_institution:string;//  Identificação da instituição financeira externa (por ex: company id para atm)
  net_received_amount:number;//  Valor recebido pelo vendedor.
  total_paid_amount:number;//  Valor pago pelo comprador (inclui comissões).
  installment_amount:number;//  Valor total da quota.
  overpaid_amount:number;//  Valor pago por outras pessoas (apenas para tickets).
  external_resource_url:string;//  Identifica o recurso no processador de pagamento.
  payment_method_reference_id:string;//  Para pagamentos com cartão de crédito é USN. Para meios de pagamento offline é a referência para lhe dar o caixa ou introduzir no ATM.
}

export interface mp_card{
  id:number;//  Identificação da placa.
  last_four_digits:string;//  Últimos quatro dígitos do número do cartão.
  first_six_digits:string;//  Os primeiros seis dígitos do número do cartão.
  expiration_year:number;//  Ano de validade do cartão.
  expiration_month:number;//  Mês de validade do cartão.
  date_created:Date;//  Data de criação do cartão.
  date_last_updated:Date;// Data de última atualização de informações de cartão.
  cardholder:mp_card_holder;
}

export interface mp_card_holder{
  name:string;//  Nome do proprietário tarjata.
  identification:mp_checkout_payer_identification; //  Identificação do proprietário do cartão.
}

export interface mp_additional_info{
  ip_address:string; //IP do qual provém o request (apenas para transferência bancária).
  items:mp_checkout_items[]; //Lista de itens a pagar.
  payer:mp_checkout_payer;
  shipments:mp_shipments;
}
