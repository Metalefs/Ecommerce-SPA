import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-criar-cliente-dialog',
  templateUrl: './criar-cliente-dialog.component.html',
  styleUrls: ['./criar-cliente-dialog.component.scss']
})
export class CriarClienteDialogComponent implements OnInit {

  Cliente:Cliente = new Cliente (
    "",
    "",
    "",
    "",
    "",
  );

  constructor(public dialogRef: MatDialogRef<CriarClienteDialogComponent>
    ) {
  }

  ngOnInit() {
  }

  upload($event){
    this.Cliente.Foto = $event.target.files[0];
    console.log(this.Cliente.Foto);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
