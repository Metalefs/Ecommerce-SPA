import { Component, OnInit, ViewChild } from '@angular/core';
import { fabric } from "fabric";

@Component({
  selector: 'personalizados-lopes-costumization',
  templateUrl: './costumization.component.html',
  styleUrls: ['./costumization.component.scss'],
})
export class CostumizationComponent implements OnInit {
  constructor() {}
  __canvas:any;
  deleteIcon:any;
  img:any;
  fabric:any;
  cornerSize:any;
  fileLoaded:any;
  objType:any;
  radios5:any;
  node:any;
  obj:any;
  bold:any;
  italic:any;
  toggleNumber:boolean = false;

  imgSrc = [
    {
      img: "https://unsplash.it/400/500?random",
      name: "Item 1",
      price: "4€"
    },
    {
      img: "https://unsplash.it/500/500?random",
      name: "Item 2",
      price: "4€"
    },
    {
      img: "https://unsplash.it/500/400?random",
      name: "Item 3",
      price: "4€"
    },
    {
      img: "https://unsplash.it/500/300?random",
      name: "Item 4",
      price: "3€"
    }];
  girlSrc = [
    {
      img: "https://drawinghowtos.com/wp-content/uploads/2019/11/unicorn-colored.png",
      name: "Licorne",
      price: "5€"
    },
    {
      img: "https://i.pinimg.com/originals/69/64/94/69649494d972df188fbbd2f15988419c.png",
      name: "Papillon",
      price: "2€"
    },
    {
      img: "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/12597.png",
      name: "Fleur de cerisier",
      price: "5€"
    }];
  illuSrc = [
    {
      img: "https://isometric.online/wp-content/uploads/2020/05/people_svg.svg",
      name: "People",
      price: "5€"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/fitness_svg.svg",
      name: "Fitness",
      price: "5€"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/instagram_svg.svg",
      name: "Instagram",
      price: "4€"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/tv_svg.svg",
      name: "Télévision",
      price: "3€"
    }];

  ngOnInit(): void {
    this.__canvas = new fabric.Canvas('c');

    this.deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    this.img = document.createElement('img');
    this.img.src = this.deleteIcon;
    this.fabric.Object.prototype.cornerColor = '#131313';
    this.fabric.Object.prototype.transparentCorners = false;

    this.setup();
  }

  setup(){
    this.changeImgSrc(this.imgSrc)

    var importInput = document.getElementById('largeFile');

    var fileLoaded
    var loadFile = function (event) {
      fileLoaded = event
      var output = document.getElementById('output') as any;
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
      }

    };
    this.__canvas.on('selection:created', this.onObjectSelected);
    this.__canvas.on('selection:cleared', this.onObjectCleared);
    this.__canvas.on('selection:updated', this.onObjectUpdated);
    this.radios5 = document.getElementsByName("fonttype");

    for (var i = 0, max = this.radios5.length; i < max; i++) {
      this.radios5[i].onclick = function () {
        if (document.getElementById(this.id)?.checked as unknown as boolean == true) {
          if (this.id == "text-cmd-bold") {
            this.__canvas.getActiveObject().set("fontWeight", "bold");
          }
          if (this.id == "text-cmd-italic") {
            this.__canvas.getActiveObject().set("fontStyle", "italic");
          }
          if (this.id == "text-cmd-underline") {
            this.__canvas.getActiveObject().set("textDecoration", "underline");
          }
        } else {
          if (this.id == "text-cmd-bold") {
            this.__canvas.getActiveObject().set("fontWeight", "");
          }
          if (this.id == "text-cmd-italic") {
            this.__canvas.getActiveObject().set("fontStyle", "");
          }
          if (this.id == "text-cmd-underline") {
            this.__canvas.getActiveObject().set("textDecoration", "");
          }
        }
        this.__canvas.renderAll();
      }
    }
    let __canvas = this.__canvas;


  }

  exportToSvg() {
    var exportSvg = this.__canvas.toSVG();
    localStorage.setItem('svg', exportSvg);
    var json_data = JSON.stringify(this.__canvas.toDatalessJSON());
    console.log(json_data);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json_data);
    document.querySelector('#list').innerHTML = '<a href="" id="downloadAnchorElem"></a>';
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();

  }

  toggleImport(val){
    this.toggleNumber = !this.toggleNumber;
  }

  addText() {
    var itext = new fabric.IText('This is a IText object', {
      left: 100,
      top: 150,
      fill: '#131313',
      selectable: true
    });

    this.__canvas.add(itext);
  }
  // add rectangle
  addRect() {
    var rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: 'yellow',
      width: 200,
      height: 100,
      objectCaching: false,
      strokeWidth: 4,
    });

    this.__canvas.add(rect);
    this.__canvas.setActiveObject(rect);
  }
  // upload image
  uploadImage(e) {
    console.log('ee', e)
    var file = e.target.files[0];
    var reader = new FileReader();
    let self = this;
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        img.scaleToWidth(300);
        var oImg = img.set({
          left: 0,
          top: 0,
          angle: 0,
        });

        self.__canvas.add(oImg).renderAll();
        var a = this.__canvas.setActiveObject(oImg);
        var dataURL = this.__canvas.toDataURL({ format: 'png', quality: 0.8 });

      });
    };
    reader.readAsDataURL(file);
  }
  loadFile(event) {
    this.fileLoaded = event
    var output = document.getElementById('output') as any;
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };
  // upload svg
  uploadSVG(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    fabric.loadSVGFromURL(url, function (objects, options) {
      objects.forEach(function (svg) {
        svg.set({
          top: 90,
          left: 90,
          originX: 'center',
          originY: 'center'
        });

        svg.scaleToWidth(50);
        this.__canvas.add(svg).renderAll();
      });
    });
  }
  // use modal images
  addStockImg(e) {
    var imgObj = e.srcElement.currentSrc;
    let self = this;
    fabric.Image.fromURL(imgObj, function (img) {
      img.scaleToWidth(300);
      var oImg = img.set({
        left: 0,
        top: 0,
        angle: 0,
        id: "00ab"
      });

      self.__canvas.add(oImg).renderAll();
      var a = this.__canvas.setActiveObject(oImg);
      document.location.href = "#"
    });
  }

  deleteObject(eventData, target) {
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.deleteObject,
      render: this.renderIcon,
      cornerSize: 24
    });
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  changeImgSrc(src) {
    // Setup the HTML string
    var html = '';

    // Loop through each wizard and create a list item
    src.forEach(function (item) {
      html += '<li class="item-modal"><img class="img-stock" src="' + item.img + '" onclick="addStockImg(event)" alt="image asset" width="400" height="500"/><div class="infos-item"><span class="name">' + item.name + '</span><span class="price">' + item.price + '</span></div></li>';
    });

    document.querySelector('#list').innerHTML = html;
  }

  importFile() {
    this.uploadImage(this.fileLoaded)
  }
  importSVG() {
    this.uploadSVG(this.fileLoaded)
  }
  importJson() {
    console.log('e', this.fileLoaded.target.files[0])
    var json = this.fileLoaded.target.files[0]
    //uploadJson(fileLoaded)
    var result
    var formatted
    var fr = new FileReader();
    fr.onload = function (e) {
      console.log("2", e);
      result = JSON.parse(e.target.result.toString());
      console.log("result", result);
      formatted = JSON.stringify(result, null, 2);
      console.log("formatted", formatted);

      loadJson(formatted)
    }

    fr.readAsText(json);
    function loadJson(formatted) {
      console.log('here');
      this.__canvas.loadFromJSON(formatted, function (obj) {
        console.log(' this is a callback. invoked when canvas is loaded!xxx ');
        this.__canvas.renderAll();

      });
    }
  }

  switchDisplayFont(obj) {
    switch (this.objType) {
      case 'i-text':
        this.obj = this.__canvas.getActiveObject()
        this.bold = document.getElementById('text-cmd-bold');
        this.italic = document.getElementById('text-cmd-italic');
        var color = document.getElementById('color-selected');
        this.node = document.getElementById('i-text');
        this.node.classList.add("visible");
        color.style.backgroundColor = obj.fill
        if (obj.fontWeight === 'bold') { this.bold.checked = true }
        else { this.bold.checked = false }
        if (obj.fontStyle === 'italic') { this.italic.checked = true }
        else { this.italic.checked = false }
        break;
      case 'image':
        this.node = document.getElementById('image');
        this.node.classList.add("visible");
        break;
      case 'rect':
        this.node = document.getElementById('image');
        this.node.classList.add("visible");
        break;
      default:
        console.log(`Sorry, we are out of`);
    }
  }
  onObjectSelected() {
    var node;
    // check if type is a property of active element
    console.log('canvas.getActiveObject()', this.__canvas.getActiveObject())
    this.objType = (this.__canvas.getActiveObject().type ? this.__canvas.getActiveObject().type : "");
    this.switchDisplayFont(this.objType)
  }
  onObjectCleared() {
    var node;
    var elements = document.getElementsByClassName('item-panel');
    this.clear()
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('visible');
    }
  }
  onObjectUpdated() {
    var node;
    var elements = document.getElementsByClassName('item-panel');
    this.back()
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('visible');
    }
    // check if type is a property of active element
    this.objType = (this.__canvas.getActiveObject().type ? this.__canvas.getActiveObject().type : "");
    this.switchDisplayFont(this.objType)
  }

  clickColor() {
    let colorList = ["131313", "FFFFFF", "192F97", "D41C3B", "FF9090", "A92355", "E35110"]
    var general = document.getElementById('general-controls');
    general.classList.add("display");
    this.node = document.getElementById('color-controls');
    this.node.classList.add("display");
    this.listColor(colorList)
  };
  back() {
    this.objType = (this.__canvas.getActiveObject().type ? this.__canvas.getActiveObject().type : "");
    this.switchDisplayFont(this.objType)
    var general = document.getElementById('general-controls');
    general.classList.remove("display");
    this.node = document.getElementById('color-controls');
    this.node.classList.remove("display");
  }
  clear() {
    var general = document.getElementById('general-controls');
    general.classList.remove("display");
    this.node = document.getElementById('color-controls');
    this.node.classList.remove("display");
  }

  listColor(src) {
    console.log(src)
    // Setup the HTML string
    var html = '';
    var currentColor = this.__canvas.getActiveObject().fill
    // Loop through each color and create a list item
    src.forEach(function (item) {
      if ('#' + item === currentColor) {
        html += '<div class="color-item active" id="' + item + '" style="background-color:#' + item + ';" onclick="changeColor(\'' + item + '\')"></div>';
      } else {
        html += '<div class="color-item" id="' + item + '" style="background-color:#' + item + ';" onclick="changeColor(\'' + item + '\')"></div>';
      }

    });

    document.querySelector('#color-list').innerHTML = html;
  }
  changeColor(color) {
    let elements = document.getElementsByClassName("color-item")
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    this.__canvas.getActiveObject().set("fill", "#" + color);
    this.__canvas.renderAll();
    var node = document.getElementById(color);
    node.classList.add("active")
  }
}
