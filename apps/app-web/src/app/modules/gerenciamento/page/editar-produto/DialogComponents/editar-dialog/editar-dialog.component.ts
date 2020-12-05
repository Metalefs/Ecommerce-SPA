import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { CategoriaService } from 'apps/app-web/src/app/data/service';
import { Produto } from 'libs/data/src/lib/classes';
import { Cor } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-editar-dialog',
  templateUrl: './editar-dialog.component.html',
  styleUrls: ['./editar-dialog.component.scss']
})
export class EditarProdutoDialogComponent implements OnInit {
  fileNames:string="nenhum arquivo selecionado.";
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  colorCtrl = new FormControl();
  filteredColors: Observable<Cor[]>;
  allColors: Cor[] = [
    {nome: 'Branco', cor:'white'},
    {nome: 'Preto', cor:'black'},
    {nome: 'Azul Marinho', cor:'tealblue'},
  ];

  sizeCtrl = new FormControl();
  filteredSizes: Observable<string[]>;
  allSizes: string[] = ['P','M','G','GG','XGG'];

  @ViewChild('colorInput') colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('tamanhoInput') tamanhoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocompleteCor: MatAutocomplete;
  @ViewChild('auto2') matAutocompleteTamanho: MatAutocomplete;

  @Input() Produto:Produto;
  Categorias: entities.Categoria[];
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Produto,
    private ServicoCategoria: CategoriaService
  ) {
    this.Produto = data;
  }

  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x;console.log(x)});
  }

  ngOnInit() {
    this.CarregarCategorias();
  }

  upload($event){
    this.Produto.FileList = $event.target.files;
    console.log(this.Produto.FileList);
  }

  addCor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.Produto.Cores.push(
        {
          nome:value.split(';')[0].trim(),
          cor:value.split(';')[1].trim()
        }
      );

    if (input)
      input.value = '';

    this.colorCtrl.setValue(null);
  }
  addTamanho(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.Produto.Tamanhos.push(value.trim());
    if (input)
      input.value = '';

    this.sizeCtrl.setValue(null);
  }
  removeCor(color: Cor): void {
    const index = this.Produto.Cores.indexOf(color);
    if (index >= 0) {
      this.Produto.Cores.splice(index, 1);
    }
  }
  removeTamanho(tamanho: string): void {
    const index = this.Produto.Tamanhos.indexOf(tamanho);
    if (index >= 0) {
      this.Produto.Tamanhos.splice(index, 1);
    }
  }


  selectedCor(event: MatAutocompleteSelectedEvent): void {
    alert(event.option.viewValue);
    // this.Produto.Cores.push();
    this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
  }
  selectedTamanho(event: MatAutocompleteSelectedEvent): void {
    this.Produto.Tamanhos.push(event.option.viewValue);
    this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
  }
  SelecionarCategoria($event){
    console.log($event);
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    console.log(this.Produto.Categoria)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
