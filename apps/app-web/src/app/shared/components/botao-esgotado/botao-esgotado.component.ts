import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'libs/data/src/lib/classes';
import { CaixaObterEmailComponent } from '../dialogs/caixa-obter-email/caixa-obter-email.component';

@Component({
  selector: 'personalizados-lopes-botao-esgotado',
  templateUrl: './botao-esgotado.component.html',
  styleUrls: ['./botao-esgotado.component.scss']
})
export class BotaoEsgotadoComponent implements OnInit {

  constructor( public dialog: MatDialog) { }
  @Input()Produto:Produto;
  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(CaixaObterEmailComponent, {
      restoreFocus: false,
      panelClass:['no-padding'],
      data:this.Produto
    });
  }
}
