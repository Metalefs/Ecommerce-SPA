export interface MercadoPagoRefund{
  id: number,
  payment_id: number,
  amount: number,
  metadata: {},
  source: {
      id: number,
      name: string,
      type: string
  },
  date_created:Date;
}
