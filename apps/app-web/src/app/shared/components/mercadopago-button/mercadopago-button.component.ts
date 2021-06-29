import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DocumentRef } from '../../services/document.service';
@Component({
  selector: 'personalizados-lopes-mercadopago-button',
  templateUrl: './mercadopago-button.component.html',
  styleUrls: ['./mercadopago-button.component.scss']
})
export class MercadopagoButtonComponent implements OnInit {
  @Input() init_point;
  @Input() disabled:boolean;

  constructor(private document:DocumentRef, @Inject(PLATFORM_ID) private platform: Object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platform))
      this.loadScript();
  }
  loadScript() {
    let node = this.document.nativeDocument.createElement('script');
    node.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    node.type = 'text/javascript';
    node.async = true;
    node.id = "mercadopago-script";
    node.charset = 'utf-8';
    node.setAttribute('data-button-label',"Comprar com MercadoPago");
    node.setAttribute('data-preference-id', this.init_point.id);
    this.document.nativeDocument.getElementById('setup-script-mp').appendChild(node);
  }
}
