import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip, fade } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cpf } from 'cpf-cnpj-validator';
import { CheckoutService } from '../../checkout.service';
import { DEFAULT_ORCAMENTO } from 'apps/app-web/src/app/data/store/state/orcamento.state';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';

@Component({
  selector: 'personalizados-lopes-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
  animations:[cardFlip,fade]
})
export class DadosComponent implements OnInit, OnDestroy {
  state = "flipped"
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  ErroCadastro:boolean= false;

  registrarse:boolean=false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  @Input() email:string;
  @Output() onNextStep:EventEmitter<any> = new EventEmitter<any>();
  public get dadosForm(): FormGroup {
    return this.checkoutService.dadosForm;
  }
  public set dadosForm(value: FormGroup) {
    this.checkoutService.dadosForm = value;
  }

  usuario:Usuario = DEFAULT_ORCAMENTO.Usuario;
  constructor(private scrollService:PageScrollService, public checkoutService: CheckoutService, private router:Router, private store: Store, private authService:AuthenticationService) {
    this.authService.currentUser.subscribe(x=>{
      if(x)
        this.usuario = x;
      this.Orcamento$.subscribe(o=>{
        this.Orcamento = o;
        if(this.usuario){
          this.Orcamento.Usuario = this.usuario;
          this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento))
        }
        else{
          this.Orcamento.Usuario = this.Orcamento.Usuario.CPF ? this.Orcamento.Usuario: DEFAULT_ORCAMENTO.Usuario;
          this.Orcamento.Usuario.Email = this.email;
          this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento))
        }
      })
      this.checkoutService.BuildDadosForm(this.usuario,this.Orcamento,this.registrarse);
    });
    CheckoutService.DadosCompleto = true;
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.flip()
    },0)
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
    this.scrollService.scrollTop();
  }

  SubmeterDadosPessoais(){

    if(!this.ValidarDados()){
      this.ErroCadastro = true;
      return;
    }

    let usuario = this.dadosForm.getRawValue() as any;
    this.Orcamento.Usuario.Nome = usuario.nome;
    this.Orcamento.Usuario.Telefone = usuario.phone;
    this.Orcamento.Usuario.CPF = usuario.cpf;
    this.Orcamento.Usuario.Senha = usuario.password;
    this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento)).subscribe(x=>{
      this.onNextStep.emit();
    })
  }

  ValidarDados(){
    let usuario = this.dadosForm.getRawValue() as any;
    if(this.registrarse
      && !usuario.password)
      return false;
    else
    if(this.dadosForm.valid
      && cpf.isValid(usuario.cpf))
      return true;
    return false;
  }

  setRegistrarse(){
    this.registrarse = !this.registrarse;
    this.dadosForm.value.registrarse = this.registrarse;
  }
}
