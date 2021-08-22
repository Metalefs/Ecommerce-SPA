export interface MercadoPagoCheckout {
  items:mp_checkout_items[]
  payer?:mp_checkout_payer;
  payment_methods?:mp_payment_methods;
  shipments?:mp_shipments;
  back_urls?:mp_checkout_back_urls;
  notification_url?:string;
  statement_descriptor?:string;
  id?:string;
  // regular_payment // Normal payment.
  // money_transfer  // Money request.
  additional_info?:string; //String(600)   Informações adicionais.
  auto_return?:string;
  // No caso de estar especificado o comprador será redirecionado para o seu site imediatamente após a compra.
  // approved   // The redirection takes place only for approved payments.
  // all        // The redirection takes place only for approved payments, forward compatibility only if we change the default behavior
  external_reference?:string //Referência que pode sincronizar com seu sistema de pagamentos.
  expires?:boolean; //Preferência que determina se uma preferência expira.
  date_of_expiration?: Date; //Data de expiração de meios de pagamento em dinheiro.
  expiration_date_from?: Date; // Data a partir da qual a preferência estará ativa.
  expiration_date_to?: Date; //Data em que a preferência expira.
  collector_id?:number;//Sua identificação como um vendedor no Mercado Pago.
  client_id?:number;//Id do dono do aplicativo que usa a API do Mercado Livre.
  client_secret?:string;//Id do dono do aplicativo que usa a API do Mercado Livre.
  marketplace?:string;//Origem do pagamento. Valor por defeito: NENHUM
  marketplace_fee?:number;//Comissão de Mercado cobrada pelo proprietário do aplicativo. Valor por defeito: 0 em moeda local
  differential_pricing?:mp_paymentID; //Configuração de preço diferencial para esta preferência.
  binary_mode?:boolean;//Quando definido como true, o pagamento só pode ter os status approved ou rejected. Caso contrário, o status in_process é adicionado.
  taxes?:object[];//Definição de impostos diferenciados. Disponível apenas para o Mercado Livre Colombia.
  tracks?:object[];//Tracks que serão executados durante a interação do usuário no fluxo de Pagamento.
  total_amount?:number;
}
export interface mp_checkout_back_urls{
  success:string,
  failure:string,
  pending:string
}
export interface mp_checkout_items{
  id:string,
  title:string,
  description:string,
  category_id?:string,
  quantity: number,
  currency_id?:string,
  unit_price: number,
  picture_url?:string;
  pictures?:mp_picture[];
  shipping?:mp_shipping;
}
export interface mp_picture{
  source:string;
}
export interface mp_checkout_payer{
  // Tipo de entidade do pagador (apenas para transferências bancárias).
  // individual
  // Payer is individual.
  // association
  // Payer is an association.
  entity_type?:string;
  // Tipo de identificação do pagador associado (se necessário o pagador é um cliente).
  // customer
  // Payer is a Customer and belongs to the collector.
  // registered
  // The account corresponds to a Mercado Pago registered user.
  // guest
  // The payer doesn't have an account.
  type?:string;
  id?:string;
  name: string,
  surname: string,
  email: string,
  date_created: string,
  phone:mp_checkout_payer_phone;
  identification:mp_checkout_payer_identification;
  address:mp_checkout_payer_address;
  registration_date?:Date; //Data de cadastro do comprador em seu site.

}
export interface mp_checkout_payer_phone {
  area_code:string,
  number:number,
}
export interface mp_checkout_payer_identification {
  type:string, //Tipo de documento.
  number:string, //Número do documento.
}
export interface mp_checkout_payer_address {
  street_name:string,
  street_number:number,
  zip_code:string,
  neighborhood:string,
  city:string,
  federal_unit:string
}
export interface mp_payment_methods{
  excluded_payment_methods: mp_paymentID[];
  excluded_payment_types: mp_paymentID[];
  installments: number;
}
export interface mp_paymentID{
  id:string;
}
export interface mp_shipments{
  mode?:string;//  Modo de envio.
  modes?:string[];//  Modo de envio.
  // custom   // Custom shipping.
  // me2   // Mercado Envíos.
  // not_specified   // Shipping mode not specified.
  local_pickup?:boolean;//  Preferência de remoção de pacotes em agência(mode:me2 somente).
  dimensions?:string; //  Tamanho do pacote em cm x cm x cm, gr (mode:me2 somente)
  default_shipping_method?:number; //  Escolha um método de envio padrão no _checkout_(mode:me2 somente).
  free_methods?: mp_paymentID //Oferecer um método de frete grátis (mode:me2 somente).
  cost?:number; //  Custo do transporte (mode:custom somente).
  free_shipping?:boolean;//  Preferência de frete grátis para mode:custom.
  receiver_address:mp_reciever_address;
}
export interface mp_shipping{
  mode:string;//  Modo de envio.
  // custom   // Custom shipping.
  // me2   // Mercado Envíos.
  // not_specified   // Shipping mode not specified.
  local_pickup?:boolean;//  Preferência de remoção de pacotes em agência(mode:me2 somente).
  local_pick_up?:boolean;//  Preferência de remoção de pacotes em agência(mode:me2 somente).
  dimensions:string; //  Tamanho do pacote em cm x cm x cm, gr (mode:me2 somente)
  default_shipping_method?:number; //  Escolha um método de envio padrão no _checkout_(mode:me2 somente).
  free_methods?: mp_paymentID|Array<any> //Oferecer um método de frete grátis (mode:me2 somente).
  cost?:number; //  Custo do transporte (mode:custom somente).
  free_shipping?:boolean;//  Preferência de frete grátis para mode:custom.
  receiver_address?:mp_reciever_address;
}
export interface mp_reciever_address{
  zip_code:string; //  Código postal.
  street_name:string;//  Rua.
  city_name:string; //  Cidade.
  state_name:string; //  Estado.
  street_number:number;// O Número.
  floor:string //  Andar.
  apartment:string; //  Apartamento.
  country_name?:string; //  País.
}
