import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorProdutoService } from 'apps/app-web/src/app/data/service';
import { CorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-cor-produto',
  templateUrl: './editar-cor-produto.component.html',
  styleUrls: ['./editar-cor-produto.component.scss']
})
export class EditarCorProdutoComponent implements OnInit {
  corProdutoForm: FormGroup;
  CorProduto:CorProduto;

  CoresProduto:CorProduto[];
  constructor( private fb: FormBuilder,
    protected snackBar: MatSnackBar,
    private corProdutoService: CorProdutoService) { }

  ngOnInit(): void {
    this.corProdutoForm = this.fb.group({
      Nome: [this.CorProduto?.Nome || '', [Validators.required]],
      Cor: [this.CorProduto?.Cor || '', [Validators.required]],
    })
    this.CarregarCoresProduto();
  }

  CarregarCoresProduto(){
    this.corProdutoService.Ler().subscribe((cores)=>{
      this.CoresProduto = cores as CorProduto[];
    })
  }

  Criar(){

  }
}
