import { MercadoPagoPayment } from '.';

export interface MercadoPagoSearchPaymentResult{
  body: { paging: { total: number, limit: number, offset: number }, results: MercadoPagoPayment[] },
  response: { paging: { total: number, limit: number, offset: number }, results: MercadoPagoPayment[] },
  status: number,
  idempotency: any,
  pagination: { total: number, limit: number, offset: number };
}
export interface ActualSearchPaymentResponse{
  acquirer_reconciliation: [],
    additional_info: {
      available_balance: any,
      ip_address: string,
      nsu_processadora: any
    },
    authorization_code: string,
    binary_mode: boolean,
    brand_id: any,
    call_for_authorize_id: any,
    captured: boolean,
    card: {
      cardholder: { identification: [Object], name: string },
      date_created: string,
      date_last_updated: string,
      expiration_month: 1,
      expiration_year: number,
      first_six_digits: string,
      id: any,
      last_four_digits: string
    },
    charges_details: [],
    collector_id: number,
    corporation_id: any,
    counter_currency: any,
    coupon_amount: number,
    currency_id: string,
    date_approved: string,
    date_created: string,
    date_last_updated: string,
    date_of_expiration: any,
    deduction_schema: any,
    description: string,
    differential_pricing_id: any,
    external_reference: any,
    fee_details: [ { amount: number, fee_payer: string, type:string } ],
    id: number,
    installments: number,
    integrator_id: any,
    issuer_id: string,
    live_mode: boolean,
    marketplace_owner: any,
    merchant_account_id: any,
    merchant_number: any,
    metadata: {},
    money_release_date: string,
    money_release_schema: any,
    notification_url: any,
    operation_type: string,
    order: { id: string, type: string },
    payer: {
      email:string,
      entity_type: any,
      first_name: string,
      id: string,
      identification: { number: any, type: any },
      last_name: string,
      operator_id: any,
      phone: { area_code: any, extension: any, number: any },
      type: string
    },
    payment_method_id: string,
    payment_type_id:string,
    platform_id: any,
    pos_id: any,
    processing_mode: string,
    refunds: [],
    shipping_amount: number,
    sponsor_id: any,
    statement_descriptor: string,
    status: string,
    status_detail: string,
    store_id: any,
    taxes_amount: number,
    transaction_amount: number,
    transaction_amount_refunded: number,
    transaction_details: {
      acquirer_reference: any,
      external_resource_url: any,
      financial_institution: any,
      installment_amount: number,
      net_received_amount: number,
      overpaid_amount: number,
      payable_deferral_period: any,
      payment_method_reference_id:string,
      total_paid_amount: number
    },
    shipping_cost: number
}
