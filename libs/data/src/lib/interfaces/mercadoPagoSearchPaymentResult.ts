import { MercadoPagoPayment } from '.';

export interface MercadoPagoSearchPaymentResult{
  body: { paging: { total: number, limit: number, offset: number }, results: MercadoPagoPayment[] },
  response: { paging: { total: number, limit: number, offset: number }, results: MercadoPagoPayment[] },
  status: number,
  idempotency: any,
  pagination: { total: number, limit: number, offset: number }
}
