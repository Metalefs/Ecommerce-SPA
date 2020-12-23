import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade, slider, sliderSide } from 'apps/app-web/src/app/animations';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[sliderSide,fade]
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
}
