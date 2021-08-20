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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorreiosService } from 'apps/app-web/src/app/data/service/correios/correios.service';
import { PrecoPrazoEvent } from 'correios-brasil/dist';
import { OrcamentoService } from 'apps/app-web/src/app/data/service';

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
    private fb:FormBuilder,
    private snack:MatSnackBar,
    private servicoCorreios:CorreiosService,
    private orcamentoService:OrcamentoService,

  ) { }
  valid: boolean = false;
  erros: string[] = [];
  Orcamento:Orcamento;
  confirmar:boolean;
  Fretes:PrecoPrazoEvent[];
  CEP:string;
  cepForm:FormGroup;
  FreteSelecionado:PrecoPrazoEvent;

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
      this.CEP = this.Orcamento.Entrega.cep
    });
    this.emailForm = this.fb.group({
      email:  [{value:this.auth.currentUserValue?.Email,disabled:!!this.auth.currentUserValue}, Validators.required]
    })
    this.emailForm.statusChanges.subscribe(x=>{
      this.email = this.emailForm.get("email").value;
    })
    this.CalcularFreteProduto();
    this.cepForm = this.fb.group({
      cep:[this.CEP||'']
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
  CalcularFreteProduto(){
    if(this.Orcamento){
      this.orcamentoService.Incluir(this.Orcamento).subscribe((x:Orcamento) => {
        this.servicoCorreios.CalcularPrecoPrazoPorOrcamento(x._id).subscribe(fretes=>{
          this.Fretes = fretes;
        });
      })
    }
  }
  SelecionarFrete(frete){
    this.Orcamento.Entrega.dados = {cep:this.CEP, precos:frete};
    this.Orcamento.Entrega.cep = this.CEP;
    this.checkoutService.AlterarOrcamentoLocal(this.Orcamento);
    this.FreteSelecionado = frete;
  }
  NomeTransportadora(codigo){
    return codigo == "04014" ? 'SEDEX' : "PAC"
  }
  FinalizarCompra(){
    this.Orcamento$.subscribe(orc => {
      this.checkoutService.Validate(orc);
      if(this.checkoutService.getValid()){
        this.confirmar = true;
      }
      else{
        this.snack.open("Não foi possível completar a validação do seu pedido. Por favor, verifique os dados e tente novamente","Fechar").afterDismissed().subscribe(()=>{
          let errors = this.checkoutService.getErros().join(", ");
          this.snack.open(`Verifique os erros: ${errors}`,"Ok")
        })
      }
    });
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
