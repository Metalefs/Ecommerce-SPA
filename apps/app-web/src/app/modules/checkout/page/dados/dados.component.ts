import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip, fade, slideInOut } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { EditarOrcamento, EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { EnderecoEntrega, Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cpf } from 'cpf-cnpj-validator';
import { CheckoutService } from '../../checkout.service';
import { DEFAULT_ORCAMENTO } from 'apps/app-web/src/app/data/store/state/orcamento.state';

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

  dadosForm:FormGroup;

  usuario:Usuario = DEFAULT_ORCAMENTO.Usuario;
  constructor(private router:Router, private store: Store, private authService:AuthenticationService, private fb: FormBuilder) {
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
          this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento))
        }
      })
      this.dadosForm = this.fb.group({
        nome: [this.usuario.Nome, [Validators.required ]],
        email:[this.usuario.Email, [Validators.required ,Validators.email ]],
        phone:[this.usuario.Telefone, [Validators.required, Validators.minLength(11)]],
        cpf:  [this.usuario.CPF, [Validators.required, Validators.minLength(11)]],
        Mensagem:   [this.Orcamento.Mensagem, []],
        password:   [this.usuario.Senha, []],
        registrarse:[this.registrarse, []],
      });
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
  }

  SubmeterDadosPessoais(){
    this.ErroCadastro = true;
    if(this.ValidarDados()){
      let usuario = this.dadosForm.getRawValue() as any;
      this.Orcamento.Usuario.Nome = usuario.nome;
      this.Orcamento.Usuario.Email = usuario.email;
      this.Orcamento.Usuario.Telefone = usuario.phone;
      this.Orcamento.Usuario.CPF = usuario.cpf;
      this.Orcamento.Usuario.Senha = usuario.password;
      this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento)).subscribe(x=>{
        this.router.navigateByUrl("/checkout/endereco");
      })
    }
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
