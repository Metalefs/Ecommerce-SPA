import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { Estampa, Produto } from 'libs/data/src/lib/classes';
import { fade } from '../../../animations';
import { CostumizationComponent } from './costumization/costumization.component';

@Component({
  selector: 'personalizados-lopes-exibicao-arte-produto',
  templateUrl: './exibicao-arte-produto.component.html',
  styleUrls: ['./exibicao-arte-produto.component.scss'],
  animations: [fade]
})
export class ExibicaoArteProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() Estampa:Estampa;
  @ViewChild(CostumizationComponent)
  costumizationComponent: CostumizationComponent;

  arte_traseira:boolean=false;
  action:string;
  constructor(public dialogRef?: MatDialogRef<ExibicaoArteProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data?:{Produto:Produto, Estampa:Estampa, action:string}) {
      this.Produto = data.Produto;
      this.Estampa = data.Estampa;

      this.action = data.action;
  }

  ngAfterViewInit(){
    if(this.Produto.Canvas){
      console.log(this.Produto.Canvas)
      this.costumizationComponent.importJson(this.Produto.Canvas)
    }
    if(this.Estampa){
      this.costumizationComponent.uploadImageURL(this.Estampa.Imagem[0].Src);


      this.Produto.Arte = this.Estampa.Imagem[0].Src;
      this.Produto.Estampas = [this.Estampa];
      this.Produto.RecalcularPreco();
    }
    if(this.action == "addImg"){
      this.costumizationComponent.importFile();
    }
  }
  ngOnInit(): void {

  }
  fileNames:string="";
  secondaryfileNames:string="";
  rules:string[] = [
    "É permitido o uso de nomes de marcas ou logomarcas, apenas da sua empresa. Não é permitido utilizar outras, incluindo a Personalizados Lopes."

    ,"Não é permitido o uso de imagem ou nome de celebridades."

    ,"Não é permitido conteúdo de caráter político, religioso, violento ou que contenha partes de música ou livros."
  ]
  upload($event){
    getPreviewURL($event,this.fileNames,(res,name)=>{this.Produto.Arte = res;this.fileNames = name})
  }
  uploadSecundario($event){
    getPreviewURL($event,this.secondaryfileNames,(res,name)=>{this.Produto.ArteSecundaria = res;this.secondaryfileNames = name})
  }
  attCanvas($event){
    this.Produto.Canvas = $event;
    console.log(this.Produto.Canvas)
  }
}
