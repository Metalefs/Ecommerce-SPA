import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { fade, slider, sliderSide } from 'apps/app-web/src/app/animations';
import { PageScrollService } from 'apps/app-web/src/app/data/service/page-scroll.service';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { order } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[sliderSide,fade]
})
export class CheckoutComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  constructor(public checkoutService: CheckoutService, private scrollService:PageScrollService, @Inject(PLATFORM_ID) private platform:object, private router: Router) { }
  valid:boolean = false;
  erros:string[] = [];
  ngOnInit(): void {
    if(isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    this.Validate();
  }

  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
  Validate(){
    this.Orcamento$.subscribe(orc=>{this.checkoutService.Validate(orc)});
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
  openPage(url:string){
    this.router.navigate([url]);
  }
}
