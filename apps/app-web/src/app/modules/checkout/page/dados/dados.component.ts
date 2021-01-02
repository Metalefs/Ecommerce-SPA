import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip, fade, slideInOut } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { EditarOrcamento, EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cpf } from 'cpf-cnpj-validator';

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

  nomeFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);

  cpfFormControl = new FormControl('', [
    Validators.required,
  ]);
  usuario:Usuario;
  constructor(private router:Router, private store: Store, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x=>{
      this.usuario = x;
      this.Orcamento$.subscribe(o=>{
        this.Orcamento = o;
        if(this.usuario){
          this.Orcamento.Usuario = this.usuario;
          this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento))
        }
      })
    })
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
      this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento)).subscribe(x=>{
        this.router.navigateByUrl("/checkout/endereco");
      })
    }
  }

  registrar(){
    this.registrarse = !this.registrarse;
    this.Orcamento.Usuario.Senha = '';
  }

  ValidarDados(){
    if(this.registrarse
      && !this.Orcamento.Usuario.Senha)
      return false;
    else
    if(this.emailFormControl.valid
      && this.nomeFormControl.valid
      && this.phoneFormControl.valid
      && cpf.isValid(this.Orcamento.Usuario.CPF))
      return true;
    return false;
  }
}
