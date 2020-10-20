import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'libs/data/src/lib/classes';
@Component({
  selector: 'personalizados-lopes-criar-dialog',
  templateUrl: './criar-dialog.component.html',
  styleUrls: ['./criar-dialog.component.scss']
})
export class CriarCategoriaDialogComponent implements OnInit {

  Categoria:Categoria = new Categoria (
    "",
    "",
    "",
    );
  constructor(public dialogRef: MatDialogRef<CriarCategoriaDialogComponent>,
    ) {
    }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
