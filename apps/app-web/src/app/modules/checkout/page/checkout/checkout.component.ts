import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade, slider, sliderSide } from 'apps/app-web/src/app/animations';
import { PageScrollService } from 'apps/app-web/src/app/data/service/page-scroll.service';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[sliderSide,fade]
})
export class CheckoutComponent implements OnInit {

  constructor(private scrollService:PageScrollService) { }

  ngOnInit(): void {
    if(isPlatformBrowser(PLATFORM_ID))
      this.scrollService.scrollTop();
  }

  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
}
