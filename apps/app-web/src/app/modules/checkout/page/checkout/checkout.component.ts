import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade, slider } from 'apps/app-web/src/app/animations';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[fade]
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
}
