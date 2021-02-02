import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';

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
    getPreviewURL(event,[],(res,fnames)=>this.src=res);
  }
  importFile(){
    this.close(this.src);
  }
  importSVG(){
    this.close();
  }
  close(event = null){
    this.dialogRef.close(event);
  }
}
