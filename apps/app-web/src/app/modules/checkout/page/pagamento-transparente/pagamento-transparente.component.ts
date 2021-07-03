import { Component, OnInit } from '@angular/core';
import { IntegracoesService } from 'apps/app-web/src/app/data/service';

declare let MercadoPago: any;
@Component({
  selector: 'personalizados-lopes-pagamento-transparente',
  template: '<div class="tokenizer-container"></div>',
  styleUrls: ['./pagamento-transparente.component.scss']
})
export class PagamentoTransparenteComponent implements OnInit {
  constructor(private integracoesService: IntegracoesService) { }

  ngOnInit(): void {
    this.integracoesService.ObterChavePublicaMercadoPago().subscribe(public_key => {
      MercadoPago.setPublishableKey(public_key);
      const mp = new MercadoPago(public_key);
      const tokenizer = mp.checkout({
        tokenizer: {
            totalAmount: 4000,
            summary: {
                arrears: 18,
                taxes: 20,
                charge: 30,
                discountLabel: 'discount label',
                discount: 5,
                productLabel: 'product label',
                product: 400,
                shipping: 10,
                title: 'summary title',
            },

            installments: {
                minInstallments: 2,
                maxInstallments: 9,
            },
            backUrl: 'http://YOUR_URL/process'
        },
        theme: {
            elementsColor: '#2ddc52',
            headerColor: '#2ddc52'
        }
    });

    tokenizer.render({
        container: '.tokenizer-container',
        label: 'Pagar'
    });
    })
  }

}
