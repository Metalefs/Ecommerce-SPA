import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { fade, slideInOut, sliderSide } from 'apps/app-web/src/app/animations';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';

@Component({
  selector: 'personalizados-lopes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [sliderSide, fade, slideInOut]
})
export class CheckoutComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  @ViewChild(PagamentoComponent)
  pagamentoComponent: PagamentoComponent;
  constructor(
    public checkoutService: CheckoutService,
    private scrollService: PageScrollService,
    @Inject(PLATFORM_ID) private platform: object,
    private router: Router,
    private auth:AuthenticationService,
    private fb:FormBuilder
  ) { }
  valid: boolean = false;
  erros: string[] = [];
  Orcamento:Orcamento;
  confirmar:boolean;
  public get dadosForm(): FormGroup {
    return this.checkoutService.dadosForm;
  }
  public set dadosForm(value: FormGroup) {
    this.checkoutService.dadosForm = value;
  }
  public get enderecoForm(): FormGroup {
    return this.checkoutService.enderecoForm;
  }
  public set enderecoForm(value: FormGroup) {
    this.checkoutService.enderecoForm = value;
  }
  emailForm: FormGroup;
  selected = new FormControl(0);
  email:string;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platform))
      this.scrollService.scrollTop();
    this.Validate();
    this.Orcamento$.subscribe(orc => {
      this.Orcamento = orc;
    });
    this.emailForm = this.fb.group({
      email:  [{value:this.auth.currentUserValue?.Email,disabled:!!this.auth.currentUserValue}, Validators.required]
    })
    this.emailForm.statusChanges.subscribe(x=>{
      this.email = this.emailForm.get("email").value;
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    try {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch (ex) {

    }
  }
  Validate() {
    this.Orcamento$.subscribe(orc => { this.checkoutService.Validate(orc) });
  }
  IsDadosCompleto() {
    return CheckoutService.DadosCompleto;
  }
  IsEnderecoCompleto() {
    return CheckoutService.EnderecoCompleto;
  }
  IsPagamentoCompleto() {
    return CheckoutService.PagamentoCompleto;
  }
  openPage(url: string) {
    this.router.navigate([url]);
  }
  AbrirPagamento(){
    this.selected.setValue(3);
    this.pagamentoComponent.Checkout();
  }
}
