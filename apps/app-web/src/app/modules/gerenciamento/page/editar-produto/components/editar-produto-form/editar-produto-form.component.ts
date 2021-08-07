import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { isEmpty } from 'apps/app-web/src/app/helper/ObjHelper';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarProdutoDialogComponent } from '../../DialogComponents/editar-dialog/editar-dialog.component';
import { EditarProdutoComponentBase } from '../../editar-produto.component.base';
import { EditarProdutoService } from '../../editar-produto.service';

@Component({
  selector: 'personalizados-lopes-editar-produto-form',
  templateUrl: './editar-produto-form.component.html',
  styleUrls: ['./editar-produto-form.component.scss']
})
export class EditarProdutoFormComponent extends EditarProdutoComponentBase implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input()
  Produto: Produto;
  @Output() onSelectedCor:EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedTamanho:EventEmitter<any> = new EventEmitter<any>();
  @Output() statusChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() produtoFormulario:EventEmitter<any> = new EventEmitter<any>();
  Valid:boolean;
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    protected produtoService: EditarProdutoService,
    protected dialog: MatDialog,
    protected store: Store,
    protected snack: MatSnackBar,
    protected authService: AuthenticationService,
    protected fb:FormBuilder
  ) {
    super(store, dialog, snack, produtoService, authService, fb)

  }

  ngOnInit(): void {
    this.CarregarCategorias();

    this.CarregarCores();

    this.CarregarTamanhos();

    this.CarregarFornecedores();

    this.produtoForm = this.fb.group({
      Categoria: [this.Produto?.Categoria,[Validators.required]],
      Nome: [this.Produto?.Nome,[Validators.required]],
      Subtitulo: [this.Produto?.Subtitulo,[Validators.required]],
      DescricaoRapida: [this.Produto?.DescricaoRapida,[Validators.required]],
      Marca: [this.Produto?.Marca,[Validators.required]],
      Modelo: [this.Produto?.Modelo,[Validators.required]],
      Preco: [this.Produto?.Preco,[Validators.required]],
      Quantidade: [this.Produto?.Quantidade ?? 1,[Validators.required]],
      QuantidadeMinima: [this.Produto?.QuantidadeMinima??1,[]],
      Cores: [this.Produto?.Cores,[Validators.required]],
      Dimensoes: [this.Produto?.Dimensoes,[Validators.required]],
      Peso: [this.Produto?.Peso,[Validators.required]],
      Tamanhos: [this.Produto?.Tamanhos,[Validators.required]],
      Status: [this.Produto?.Status ?? StatusProduto.novo,[Validators.required]],
      Tags: [this.Produto?.Tags,[Validators.required]],
      Imagem: [this.Produto?.Imagem ?? "",[]],
      Descricao: [this.Produto?.Descricao,[Validators.required]],
      Especificacoes: [this.Produto?.Especificacoes,[Validators.required]],
      Destaque: [this.Produto?.Destaque,[]],
    })

    this.produtoForm.statusChanges.subscribe(status=>{
      this.isValid = status =='VALID';
      this.statusChange.emit(status)
      if(this.isValid){
        this.produtoFormulario.emit(this.produtoForm.getRawValue())
      }
    })

  }

  SelecionarCategoria($event){
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    this.produtoForm?.get('Categoria').setValue(this.Produto.Categoria);
    console.log(this.produtoForm.getRawValue());
  }

  SelecionarStatus(event){
    this.Produto.Status = event;
    this.produtoForm.get('Status').setValue(this.Produto.Status);
  }

  selectedCor(event: any): void {
    this.Produto.Cores = event;
    this.produtoForm.get("Cores").setValue(this.Produto.Cores);
  }

  SelecionarTamanho(event: any): void {
    this.Produto.Tamanhos = event;
    this.produtoForm.get("Tamanhos").setValue(this.Produto.Tamanhos);
  }

  selectedFornecedor(event: any): void {
    this.Produto.Marca = event;
    this.produtoForm.get("Marca").setValue(this.Produto.Marca);
  }

  setAltura(event){
    this.Produto.Dimensoes.Altura = event;
    this.produtoForm.get("Dimensoes").setValue(this.Produto.Dimensoes)
  }
  setLargura(event){
    this.Produto.Dimensoes.Largura = event;
    this.produtoForm.get("Dimensoes").setValue(this.Produto.Dimensoes)
  }
  setComprimento(event){
    this.Produto.Dimensoes.Comprimento = event;
    this.produtoForm.get("Dimensoes").setValue(this.Produto.Dimensoes)
  }
  setPeso(event){
    this.Produto.Peso = event;
    this.produtoForm.get("Peso").setValue(this.Produto.Peso)
  }
  setDescricao(event){
    this.Produto.Descricao = event;
    this.produtoForm.get("Descricao").setValue(this.Produto.Descricao)
  }
  setEspecificacao(event){
    this.Produto.Especificacoes = event;
    this.produtoForm.get("Especificacoes").setValue(this.Produto.Especificacoes)
  }
}
