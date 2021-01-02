export interface MercadoPagoCheckout {
  back_urls:mp_checkout_back_urls,
  auto_return:string,
  items:mp_checkout_items[]
  payer:mp_checkout_payer;
  binary_mode:boolean
  payment_methods:mp_payment_methods;
  statement_descriptor:string;
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
  category_id:string,
  quantity: number,
  currency_id:string,
  unit_price: number,
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
}
export interface mp_payment_methods{
  excluded_payment_methods: mp_paymentID[];
  excluded_payment_types: mp_paymentID[];
  installments: number;
}
export interface mp_paymentID{
  id:string;
}
