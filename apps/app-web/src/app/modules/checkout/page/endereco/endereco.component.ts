import { isPlatformBrowser } from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip, fade, slideInOut } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Estado } from 'apps/app-web/src/app/data/models';
import { PageScrollService } from 'apps/app-web/src/app/data/service/page-scroll.service';
import { EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { User } from 'firebase';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import {CEPService,EstadoService, IntegracoesService, MercadoPagoCheckoutService} from '../../../../data/service';

@Component({
  selector: 'personalizados-lopes-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  animations:[cardFlip]
})
export class EnderecoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  registerForm: FormGroup;
  state='flipped';
  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  enderecoFormControl = new FormControl('', [
    Validators.required,
  ]);

  numeroFormControl = new FormControl('', [
    Validators.required,
  ]);

  bairroFormControl = new FormControl('', [
    Validators.required
  ]);

  cidadeFormControl = new FormControl('', [
    Validators.required
  ]);

  estadoFormControl = new FormControl('', [
    Validators.required
  ]);
  Finalizado:boolean = false;
  Loading:boolean = false;

  ErroCadastro:boolean = false;
  estados: Estado[];
  user:Usuario;
  _init_point:{};

  constructor(private store:Store,
    private CEPService:CEPService,
    private EstadoService:EstadoService,
    private snack: MatSnackBar,
    private checkoutService: MercadoPagoCheckoutService,
    private integracoesService: IntegracoesService,
    private auth:AuthenticationService,
    private router: Router,
    private scrollService:PageScrollService
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
      if(this.Orcamento.Status == StatusOrcamento.enviado)
        this.Finalizado = true;
    })
    this.EstadoService.Listar().subscribe(x=>{
      this.estados = x;
    })
    this.auth.currentUser.subscribe(usr=>{this.user = usr});
    setTimeout(()=>{
      this.flip()
    },0);

  }
  Pagar:boolean = false;
  goCheckout(){
    this.ErroCadastro = true;
    this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento)).subscribe(()=>{
      this.CheckoutSeDadosValidos();
    })
  }

  private CheckoutSeDadosValidos() {
    if (this.ValidarDados()) {
      this.ErroCadastro = false;
      this.Orcamento$.subscribe(orcamento => {
        this.Loading = true;
        this.integracoesService.Ler().subscribe(x => {
          this.checkoutService.goCheckout(orcamento, x).subscribe(result => {
            console.log(x);
            this.cadastroTemporario();
            this._init_point = result;
            this.Loading = false;
            this.Pagar = true;
            if(isPlatformBrowser(PLATFORM_ID))
              this.scrollService.scrollDown()
          });
        });
      });
    } else {
      this.ErroCadastro = true;
      if (!this.Orcamento.Usuario.CPF)
        this.router.navigateByUrl('/checkout/dados');
    }
  }

  cadastroTemporario(){
    this.auth.currentUser.subscribe(usr=>{
      if(!usr){
        this.auth.signup(this.Orcamento.Usuario)
        .pipe(first())
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                this.snack.open('Erro ao cadastrar com senha temporária: '+error,'fechar',{duration:5000})
            });
      }
    })
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

  CarregarDetalhesCEP(){
    this.CEPService.ObterDetalhes(this.Orcamento.Usuario.EnderecoEntrega.CEP.replace('-','')).subscribe(x=>{
      console.log(x);
      this.Orcamento.Usuario.EnderecoEntrega.Rua = x.logradouro;
      this.Orcamento.Usuario.EnderecoEntrega.Bairro = x.bairro;
      this.Orcamento.Usuario.EnderecoEntrega.Cidade = x.localidade;
      this.Orcamento.Usuario.EnderecoEntrega.Estado = x.uf;
    });
  }

  ValidarDados(){
    if( this.cepFormControl.valid &&
      this.enderecoFormControl.valid &&
      this.numeroFormControl.valid &&
      this.bairroFormControl.valid &&
      this.cidadeFormControl.valid &&
      this.estadoFormControl.valid &&
      this.Orcamento.Usuario.CPF)
      return true;
    return false;
  }


}

