import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

import { fabric } from "fabric";
import { isPlatformBrowser } from '@angular/common';
import { Produto } from 'libs/data/src/lib/classes';
@Component({
  selector: 'personalizados-lopes-exibicao-canvas-design-produto',
  templateUrl: './exibicao-canvas-design-produto.component.html',
  styleUrls: ['./exibicao-canvas-design-produto.component.scss']
})
export class ExibicaoCanvasDesignProdutoComponent implements OnInit {
  @Input() Produto:Produto;

  fileLoaded:any;
  objType:any;

  __canvas:any;
  canvasId:string;
  fabric = fabric;
  constructor(@Inject(PLATFORM_ID) private platform: Object,) { }

  ngOnInit(): void {
    const rand = Math.random().toString().substr(2, 8);
    this.canvasId='design-canvas'+this.Produto._id+rand;
  }

  ngAfterViewInit(){
    if(isPlatformBrowser(this.platform)){
      this.__canvas = new this.fabric.Canvas(this.canvasId);

      this.fabric.Object.prototype.cornerColor = '#131313';
      this.fabric.Object.prototype.transparentCorners = false;

      this.setup();
      this.importJson(this.Produto.Canvas);
    }
  }

  setup(){
    fabric.Object.prototype.cornerColor = '#131313';
    fabric.Object.prototype.transparentCorners = false;
  }

  importJson(json) {
    this.__canvas.loadFromJSON(json, function (obj) {
      this.__canvas.renderAll();
    });
  }
}
