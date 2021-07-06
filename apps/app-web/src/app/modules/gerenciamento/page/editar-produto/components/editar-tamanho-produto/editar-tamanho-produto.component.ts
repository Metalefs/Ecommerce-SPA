import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TamanhoProdutoService } from 'apps/app-web/src/app/data/service';
import { TamanhoProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-tamanho-produto',
  templateUrl: './editar-tamanho-produto.component.html',
  styleUrls: ['./editar-tamanho-produto.component.scss']
})
export class EditarTamanhoProdutoComponent implements OnInit {
  tamanhoProdutoForm: FormGroup;
  tamanhoProduto:TamanhoProduto;

  tamanhoesProduto:TamanhoProduto[];
  constructor( private fb: FormBuilder,
    protected snackBar: MatSnackBar,
    private tamanhoProdutoService: TamanhoProdutoService) { }

  ngOnInit(): void {
    this.tamanhoProdutoForm = this.fb.group({
      Nome: [this.tamanhoProduto?.Nome || '', [Validators.required]],
      // Website: [this.tamanhoProduto?.Website || '', [Validators.required]],
    })
    this.CarregarCoresProduto();
  }

  CarregarCoresProduto(){
    this.tamanhoProdutoService.Ler().subscribe((tamanhoes)=>{
      this.tamanhoesProduto = tamanhoes as TamanhoProduto[];
    })
  }

  Criar(){

  }
}
