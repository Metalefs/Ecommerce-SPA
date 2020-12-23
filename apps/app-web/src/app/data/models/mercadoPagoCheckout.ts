export interface MercadoPagoCheckout {
  back_urls:mp_checkout_back_urls,
  auto_return:string,
  items:mp_checkout_items[]
  payer:mp_checkout_payer;
  binary_mode:boolean
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
  type:string,
  number:string,
}
export interface mp_checkout_payer_address {
  street_name:string,
  street_number:number,
  zip_code:string,
}
