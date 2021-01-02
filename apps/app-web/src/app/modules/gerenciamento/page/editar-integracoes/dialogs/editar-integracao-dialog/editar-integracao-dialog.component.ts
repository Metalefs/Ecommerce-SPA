import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Integracoes } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-integracao-dialog',
  templateUrl: './editar-integracao-dialog.component.html',
  styleUrls: ['./editar-integracao-dialog.component.scss']
})
export class EditarIntegracaoDialogComponent implements OnInit {

  Integracao:Integracoes;
  constructor(public dialogRef: MatDialogRef<EditarIntegracaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  Integracoes,
  ) {
    this.Integracao = data;

  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
