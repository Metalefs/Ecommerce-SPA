import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { AdicionarProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { CriarProdutoDialogComponent } from '../editar-produto/DialogComponents/criar-dialog/criar-dialog.component';
import { EditarEstampaService } from './editar-estampa.service';

@Component({
  selector: 'personalizados-lopes-editar-estampa',
  templateUrl: './editar-estampa.component.html',
  styleUrls: ['./editar-estampa.component.scss']
})
export class EditarEstampaComponent implements OnInit {

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected estampaService: EditarEstampaService) { }

  ngOnInit(): void {
  }


}
