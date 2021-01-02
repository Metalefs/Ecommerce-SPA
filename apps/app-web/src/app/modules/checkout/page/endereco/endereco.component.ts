import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cardFlip, fade, slideInOut } from 'apps/app-web/src/app/animations';
import { Estado, MercadoPagoCheckout } from 'apps/app-web/src/app/data/models';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';

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

  _init_point:{};

  constructor(private store:Store,
    private CEPService:CEPService,
    private EstadoService:EstadoService,
    private snack: MatSnackBar,
    private checkoutService: MercadoPagoCheckoutService,
    private integracoesService: IntegracoesService,
    private router: Router
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
    setTimeout(()=>{
      this.flip()
    },0);

  }
  Pagar:boolean = false;
  goCheckout(){
    this.ErroCadastro = true;
    if(this.ValidarDados()){
      this.ErroCadastro = false;
      this.Orcamento$.subscribe(orcamento => {
        this.Loading = true;
        this.integracoesService.Ler().subscribe(x=>{
          this.checkoutService.goCheckout(orcamento,x).subscribe(result => {
            this._init_point = result;
            console.log(this._init_point);
            this.Loading = false;
            this.Pagar = true;
            (function smoothscroll() {
              var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo(0, currentScroll - (currentScroll / 8));
              }
            })();
          })
        })
      })
    }else{
      this.ErroCadastro = true;
      if(!this.Orcamento.Usuario.CPF)
        this.router.navigateByUrl('/checkout/dados');
    }
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

