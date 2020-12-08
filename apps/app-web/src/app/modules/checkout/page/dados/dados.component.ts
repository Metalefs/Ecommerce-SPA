import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
  animations:[fade]
})
export class DadosComponent implements OnInit {

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
  usuario:Usuario;
  constructor(private router:Router, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
    })
    this.authService.currentUser.subscribe(x=>{
      this.usuario = x;
    })
  }

  SubmeterDadosPessoais(){
    this.ErroCadastro = true;
    if(this.ValidarDados()){
      this.router.navigateByUrl("/checkout/endereco");
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
      && this.phoneFormControl.valid)
      return true;
    return false;
  }
}
