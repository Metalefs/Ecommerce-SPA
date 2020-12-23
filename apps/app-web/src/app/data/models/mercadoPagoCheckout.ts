export interface MercadoPagoCheckout {
  back_urls:back_urls,
  auto_return:string,
  items:items[]
  payer:payer;

}
interface back_urls{
  success:string,
  failure:string,
  pending:string
}
interface items{
  id:string,
  title:string,
  description:string,
  category_id:string,
  quantity: number,
  currency_id:string,
  unit_price: number,
}

interface payer{
  name: string,
  surname: string,
  email: string,
  date_created: string,
  phone:phone;
  identification:identification;
  address:address;
}
interface phone {
  area_code:string,
  number:number,
}
interface identification {
  type:string,
  number:string,
}
interface address {
  street_name:string,
  street_number:number,
  zip_code:string,
}
