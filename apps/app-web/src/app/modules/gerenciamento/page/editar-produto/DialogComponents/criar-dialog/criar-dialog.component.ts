import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { CorProduto, FornecedorProduto, Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarProdutoDialogComponent } from '../editar-dialog/editar-dialog.component';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { EditarProdutoService } from '../../editar-produto.service';
import { EditarProdutoComponentBase } from '../../editar-produto.component.base';
import { FormBuilder, Validators } from '@angular/forms';

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
  Status:string;
  produtoFormulario;
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: entities.Produto,
    protected dialog: MatDialog,
    protected produtoService: EditarProdutoService,
    protected store: Store,
    protected snack: MatSnackBar,
    protected authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: any,
    protected fb:FormBuilder
  ) {
    super(store,dialog,snack,produtoService,authService,fb);
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
      new TamanhoProduto("",[]),
      null,
      0,
      [],
      [],
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
      new FornecedorProduto("",""),
      "",
      0
    )
  }

  ngOnInit() {
    this.CarregarCategorias();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    const auxProduto = {...this.Produto, ...this.produtoFormulario};
    this.dialogRef.close(auxProduto);
  }
}
