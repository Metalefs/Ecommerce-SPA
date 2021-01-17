import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibicao-arte-produto',
  templateUrl: './exibicao-arte-produto.component.html',
  styleUrls: ['./exibicao-arte-produto.component.scss']
})
export class ExibicaoArteProdutoComponent implements OnInit {
  Produto:Produto;

  arte_traseira:boolean=false;
  constructor(public dialogRef: MatDialogRef<ExibicaoArteProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  Produto) {
      this.Produto = data;
    }

  ngOnInit(): void {
  }
  fileNames:string="";
  secondaryfileNames:string="";

  upload($event){
    getPreviewURL($event,this.fileNames,(res,name)=>{this.Produto.Arte = res;this.fileNames = name})
  }
  uploadSecundario($event){
    getPreviewURL($event,this.secondaryfileNames,(res,name)=>{this.Produto.ArteSecundaria = res;this.secondaryfileNames = name})
  }
}
