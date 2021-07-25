import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CupomDesconto } from 'libs/data/src/lib/classes';
import { TipoDesconto } from 'libs/data/src/lib/classes/cupom-desconto';

@Component({
  selector: 'personalizados-lopes-editar-cupom-desconto-dialog',
  templateUrl: './editar-cupom-desconto-dialog.component.html',
  styleUrls: ['./editar-cupom-desconto-dialog.component.scss']
})
export class EditarCupomDescontoDialogComponent implements OnInit {

  CupomDesconto:CupomDesconto;
  TiposCupom: [
    { name:'Preço', value:TipoDesconto.Preco },
    { name:'Porcentagem', value:TipoDesconto.Porcentagem }
  ]

  TiposDesconto = TipoDesconto;

  constructor(public dialogRef: MatDialogRef<EditarCupomDescontoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  CupomDesconto,
  ) {
    this.CupomDesconto = data;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
