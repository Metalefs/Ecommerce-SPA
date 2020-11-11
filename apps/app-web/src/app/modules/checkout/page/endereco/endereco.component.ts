import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { Estado } from 'apps/app-web/src/app/data/models';
import { AdicionarOrcamento } from 'apps/app-web/src/app/data/store/actions/Orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

import {CEPService,EstadoService} from '../../../../data/service';

@Component({
  selector: 'personalizados-lopes-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  animations:[fade]
})
export class EnderecoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  registerForm: FormGroup;

  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  enderecoFormControl = new FormControl('', [
    Validators.required,
  ]);

  numeroFormControl = new FormControl('', [
    Validators.required,
  ]);

  complementoFormControl = new FormControl('', [
    Validators.required
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
  ErroCadastro:boolean = false;
  estados: Estado[];

  constructor(private store:Store,
    private CEPService:CEPService,
    private EstadoService:EstadoService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
    })
    this.EstadoService.Listar().subscribe(x=>{
      this.estados = x;
    })
  }

  CarregarDetalhesCEP(){
    this.CEPService.ObterDetalhes(this.Orcamento.Usuario.CEP.replace('-','')).subscribe(x=>{
      console.log(x);
      this.Orcamento.Usuario.Rua = x.logradouro;
      this.Orcamento.Usuario.Bairro = x.bairro;
      this.Orcamento.Usuario.Cidade = x.localidade;
      this.Orcamento.Usuario.Estado = x.uf;
    });
  }

  FinalizarOrcamento(){
    this.ErroCadastro = true;
    if(this.ValidarDados()){
      this.ErroCadastro = false;
      this.Finalizado = true;
      this.store.dispatch(new AdicionarOrcamento()).subscribe(x=>{
        this.snack.open("Orçamento enviado! Responderemos em até 48 horas", "Fechar");
      });
    }
  }

  ValidarDados(){
    if( this.cepFormControl.valid &&
      this.enderecoFormControl.valid &&
      this.numeroFormControl.valid &&
      this.complementoFormControl.valid &&
      this.bairroFormControl.valid &&
      this.cidadeFormControl.valid &&
      this.estadoFormControl.valid)
      return true;
    return false;
  }

}

