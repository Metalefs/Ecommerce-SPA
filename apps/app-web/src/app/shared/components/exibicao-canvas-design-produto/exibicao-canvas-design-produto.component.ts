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
  fabric = fabric;
  constructor(@Inject(PLATFORM_ID) private platform: Object,) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platform)){
      this.__canvas = new this.fabric.Canvas('design-canvas');

      this.fabric.Object.prototype.cornerColor = '#131313';
      this.fabric.Object.prototype.transparentCorners = false;

      this.setup();
      this.importJson(this.Produto.Canvas);
    }
  }

  SaveDesign() {
    var exportSvg = this.__canvas.toSVG();
    localStorage.setItem('svg', exportSvg);
    ///var json = this.__canvas.toDatalessJSON();

    var json = JSON.stringify(this.__canvas.toDatalessJSON())
    console.log(json)

    if(!this.Produto.Canvas)
      Object.assign(this.Produto, {Canvas: json});
    else
      this.Produto.Canvas = json;

    // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json_data);
    // document.querySelector('#list').innerHTML = '<a href="" id="downloadAnchorElem"></a>';
    // var dlAnchorElem = document.getElementById('downloadAnchorElem');
    // dlAnchorElem.setAttribute("href",     dataStr     );
    // dlAnchorElem.setAttribute("download", "scene.json");
    // dlAnchorElem.click();
  }

  setup(){
    fabric.Object.prototype.cornerColor = '#131313';
    fabric.Object.prototype.transparentCorners = false;
  }

  importJson(json) {
    //uploadJson(fileLoaded)
    console.log(json);
    this.__canvas.loadFromJSON(json, function (obj) {
      console.log(' this is a callback. invoked when canvas is loaded!xxx ');
      this.__canvas.renderAll();
      this.SaveDesign();
    });
    // var result;
    // var formatted;
    // var fr = new FileReader();
    // fr.onload = function (e) {
    //   console.log("2", e);
    //   result = JSON.parse(e.target.result.toString());
    //   console.log("result", result);
    //   formatted = JSON.stringify(result, null, 2);
    //   console.log("formatted", formatted);

    //   loadJson(formatted);
    // }

    // fr.readAsText(json);
    // function loadJson(formatted) {
    //   console.log('here');
    //   this.__canvas.loadFromJSON(formatted, function (obj) {
    //     console.log(' this is a callback. invoked when canvas is loaded!xxx ');
    //     this.__canvas.renderAll();
    //     this.SaveDesign();
    //   });
    // }
  }
}
