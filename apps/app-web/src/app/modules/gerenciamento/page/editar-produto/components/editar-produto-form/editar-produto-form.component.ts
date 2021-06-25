import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Produto } from 'libs/data/src/lib/classes';
import { EditarProdutoDialogComponent } from '../../DialogComponents/editar-dialog/editar-dialog.component';
import { EditarProdutoComponent } from '../../editar-produto.component';
import { EditarProdutoService } from '../../editar-produto.service';

@Component({
  selector: 'personalizados-lopes-editar-produto-form',
  templateUrl: './editar-produto-form.component.html',
  styleUrls: ['./editar-produto-form.component.scss']
})
export class EditarProdutoFormComponent extends EditarProdutoComponent implements OnInit {
  @Input() Produto:Produto;

  @Output() onSend:EventEmitter<any> = new EventEmitter<any>();
  @Output() onNoClick:EventEmitter<any> = new EventEmitter<any>();

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
  }

  Enviar(){
    this.onSend.emit(Produto);
  }
  NoClick(){
    this.onNoClick.emit();
  }
}
