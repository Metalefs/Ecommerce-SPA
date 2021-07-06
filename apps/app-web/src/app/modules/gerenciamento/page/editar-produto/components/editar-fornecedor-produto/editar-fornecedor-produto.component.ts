import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedorProdutoService } from 'apps/app-web/src/app/data/service';
import { FornecedorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-fornecedor-produto',
  templateUrl: './editar-fornecedor-produto.component.html',
  styleUrls: ['./editar-fornecedor-produto.component.scss']
})
export class EditarFornecedorProdutoComponent implements OnInit {
  fornecedorProdutoForm: FormGroup;
  FornecedorProduto:FornecedorProduto;

  FornecedoresProduto:FornecedorProduto[];
  constructor( private fb: FormBuilder,
    protected snackBar: MatSnackBar,
    private fornecedorProdutoService: FornecedorProdutoService) { }

  ngOnInit(): void {
    this.fornecedorProdutoForm = this.fb.group({
      Nome: [this.FornecedorProduto?.Nome || '', [Validators.required]],
      Website: [this.FornecedorProduto?.Website || '', [Validators.required]],
    })
    this.CarregarCoresProduto();
  }

  CarregarCoresProduto(){
    this.fornecedorProdutoService.Ler().subscribe((fornecedores)=>{
      this.FornecedoresProduto = fornecedores as FornecedorProduto[];
    })
  }

  Criar(){

  }
}
