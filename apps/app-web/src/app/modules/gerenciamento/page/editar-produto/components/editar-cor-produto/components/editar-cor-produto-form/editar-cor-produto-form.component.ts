import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorProdutoService } from 'apps/app-web/src/app/data/service';
import { CorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-cor-produto-form',
  templateUrl: './editar-cor-produto-form.component.html',
  styleUrls: ['./editar-cor-produto-form.component.scss']
})
export class EditarCorProdutoFormComponent implements OnInit {
  @Input() CorProduto:CorProduto;
  @Output() onSend:EventEmitter<any> = new EventEmitter<any>();

  corProdutoForm: FormGroup;
  constructor( private fb: FormBuilder,
    protected snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.corProdutoForm = this.fb.group({
      Nome: [this.CorProduto?.Nome || '', [Validators.required]],
      Cor: [this.CorProduto?.Cor || '', [Validators.required]],
    })
  }

  Criar(){
    this.onSend.emit(this.corProdutoForm.getRawValue() as CorProduto);
  }
}
