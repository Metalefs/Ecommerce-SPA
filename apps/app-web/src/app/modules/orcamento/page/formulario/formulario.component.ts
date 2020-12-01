import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditarOrcamento, EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { Orcamento } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() compact:boolean = false;
  @Input() Orcamento:Orcamento;

  nomeFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$"),
  ]);

  messageFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  AtualizarOrcamento(){
    this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento));
  }
}
