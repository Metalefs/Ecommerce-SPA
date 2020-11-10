import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  animations:[fade]
})
export class EnderecoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;

  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  enderecoFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
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
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
    })
  }

  AtualizarOrcamento(){
    // this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento));
  }


}
