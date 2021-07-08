import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Produto } from 'libs/data/src/lib/classes';
import { EditarProdutoDialogComponent } from '../../DialogComponents/editar-dialog/editar-dialog.component';
import { EditarProdutoComponentBase } from '../../editar-produto.component.base';
import { EditarProdutoService } from '../../editar-produto.service';

@Component({
  selector: 'personalizados-lopes-editar-produto-form',
  templateUrl: './editar-produto-form.component.html',
  styleUrls: ['./editar-produto-form.component.scss']
})
export class EditarProdutoFormComponent extends EditarProdutoComponentBase implements OnInit {
  @Input() Produto:Produto;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Output() onSelectedCor:EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedTamanho:EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    protected produtoService: EditarProdutoService,
    protected dialog: MatDialog,
    protected store: Store,
    protected snack: MatSnackBar,
    protected authService: AuthenticationService,
  ) {
    super(store, dialog, snack, produtoService, authService)

  }

  ngOnInit(): void {
    this.CarregarCategorias();

    this.CarregarCores();

    this.CarregarTamanhos();

    this.CarregarFornecedores();
  }

  selectedCor(event: any): void {
    this.Produto.Cores = event;
  }

  selectedTamanho(event: any): void {
    this.Produto.Tamanhos = event;
  }

  selectedFornecedor(event: any): void {
    this.Produto.Marca = event;
  }

}
