import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarProdutoDialogComponent } from '../editar-dialog/editar-dialog.component';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { EditarProdutoService } from '../../editar-produto.service';
import { EditarProdutoComponentBase } from '../../editar-produto.component.base';

declare var require: any;

@Component({
  selector: 'personalizados-lopes-criar-dialog',
  templateUrl: './criar-dialog.component.html',
  styleUrls: ['./criar-dialog.component.scss']
})
export class CriarProdutoDialogComponent extends EditarProdutoComponentBase implements OnInit {
  Produto: Produto;

  @ViewChild('colorInput') colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('tamanhoInput') tamanhoInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocompleteCor: MatAutocomplete;
  @ViewChild('auto2') matAutocompleteTamanho: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: entities.Produto,
    protected dialog: MatDialog,
    protected produtoService: EditarProdutoService,
    protected store: Store,
    protected snack: MatSnackBar,
    protected authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    super(store,dialog,snack,produtoService,authService);
    dialogRef.disableClose = true;
    this.Produto = this.ConstructProduct();

    if (isPlatformBrowser(this.platformId)) {
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.Editor = ClassicEditor;
    }
  }

  ConstructProduct() {
    return new Produto(
      "",
      "",
      "",
      null,
      "",
      [""],
      0,
      0,
      "",
      null,
      0,
      [{ nome: 'branco', cor: 'white' }],
      ["M"],
      StatusProduto.novo,
      0,
      false,
      [''],
      "",
      "",
      0,
      { Altura: 0, Largura: 0, Comprimento: 0 },
      "",
      "",
      [],
      "",
      "",
      0
    )
  }

  ngOnInit() {
    this.CarregarCategorias();

  }

  selectedCor(event: MatAutocompleteSelectedEvent): void {
    alert(event.option.viewValue);
    // this.Produto.Cores.push();
    //this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
  }

  selectedTamanho(event: MatAutocompleteSelectedEvent): void {
    this.Produto.Tamanhos.push(event.option.viewValue);
    //this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
