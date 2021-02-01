import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'personalizados-lopes-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['./importacao.component.scss']
})
export class ImportacaoComponent implements OnInit {
  fileLoaded:any;
  constructor(public dialogRef: MatDialogRef<ImportacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  any) {

  }
  toggleNumber:boolean = false;

  toggleImport(){
    this.toggleNumber = !this.toggleNumber;
  }

  ngOnInit(): void {
  }
  src:any = ''
  loadFile(event){
    this.fileLoaded = event
    this.src = URL.createObjectURL(event.target.files[0]);
  }
  importFile(){
    this.close(this.fileLoaded);
  }
  importSVG(){
    this.close();
  }
  close(event = null){
    this.dialogRef.close();
  }
}
