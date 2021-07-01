
export interface MercadoPagoResultadoPagamentoCheckout{
  collection_id:number;
  collection_status:string //approved&pending
  payment_id:number;
  status:string //approved|failure|pending
  external_reference:any
  payment_type:string; //credit_card&
  merchant_order_id:number;
  preference_id:string;
  site_id:string; //MLB&
  processing_mode:string; //aggregator&
  merchant_account_id:number;
}
