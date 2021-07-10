import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaixaObterEmailComponent } from 'apps/app-web/src/app/shared/components/dialogs/caixa-obter-email/caixa-obter-email.component';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-preview-produto',
  templateUrl: './preview-produto.component.html',
  styleUrls: ['./preview-produto.component.scss']
})
export class PreviewProdutoComponent implements OnInit {

  Produto:Produto;
  constructor(public dialogRef: MatDialogRef<CaixaObterEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  Produto) {
      this.Produto = data;
      console.log(data);
    }

  ngOnInit(): void {
  }

}
