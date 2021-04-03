import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade, slider, sliderSide } from 'apps/app-web/src/app/animations';
import { PageScrollService } from 'apps/app-web/src/app/data/service/page-scroll.service';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[sliderSide,fade]
})
export class CheckoutComponent implements OnInit {

  constructor(private scrollService:PageScrollService, @Inject(PLATFORM_ID) private platform:object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platform))
    this.scrollService.scrollTop();
  }

  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
  IsDadosCompleto(){
    return CheckoutService.DadosCompleto;
  }
  IsEnderecoCompleto(){
    return CheckoutService.EnderecoCompleto;
  }
  IsPagamentoCompleto(){
    return CheckoutService.PagamentoCompleto;
  }
}
