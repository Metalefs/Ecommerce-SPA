import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-estampa-dialog',
  templateUrl: './editar-estampa-dialog.component.html',
  styleUrls: ['./editar-estampa-dialog.component.scss']
})
export class EditarEstampaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditarEstampaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estampa) { }

  ngOnInit(): void {
  }

}
