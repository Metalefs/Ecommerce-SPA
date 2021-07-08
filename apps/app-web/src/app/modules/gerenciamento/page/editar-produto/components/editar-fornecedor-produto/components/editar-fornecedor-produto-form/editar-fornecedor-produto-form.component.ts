import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedorProdutoService } from 'apps/app-web/src/app/data/service';
import { FornecedorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-fornecedor-produto-form',
  templateUrl: './editar-fornecedor-produto-form.component.html',
  styleUrls: ['./editar-fornecedor-produto-form.component.scss']
})
export class EditarFornecedorProdutoFormComponent implements OnInit {
  @Input() FornecedorProduto:FornecedorProduto;
  fornecedorProdutoForm: FormGroup;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  FornecedoresProduto:FornecedorProduto[];
  constructor( private fb: FormBuilder,
    protected snackBar: MatSnackBar,
    private fornecedorProdutoService: FornecedorProdutoService) { }

  ngOnInit(): void {
    this.fornecedorProdutoForm = this.fb.group({
      Nome: [this.FornecedorProduto?.Nome || '', [Validators.required]],
      Website: [this.FornecedorProduto?.Website || '', [Validators.required]],
    })
    this.CarregarFornecedoresProduto();
  }

  CarregarFornecedoresProduto(){
    this.fornecedorProdutoService.Ler().subscribe((fornecedores)=>{
      this.FornecedoresProduto = fornecedores as FornecedorProduto[];
    })
  }

  Criar(){
    const fornecedor = this.fornecedorProdutoForm.getRawValue();
    this.fornecedorProdutoService.Incluir(fornecedor).subscribe((result:FornecedorProduto)=>{
      this.snackBar.open(`Fornecedor ${fornecedor} criado com sucesso.`, "Fechar", {verticalPosition:"top"});
      this.CarregarFornecedoresProduto();
      this.onUpdate.emit();
    })
  }
}
