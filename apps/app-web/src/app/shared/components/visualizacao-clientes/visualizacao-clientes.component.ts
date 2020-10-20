import { Component, OnInit, Input, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { entities } from '@personalizados-lopes/data';
import { Observable } from 'rxjs';
import { sliderAnimations } from "../card-cliente/animations";


@Component({
  selector: 'personalizados-lopes-visualizacao-clientes',
  templateUrl: './visualizacao-clientes.component.html',
  styleUrls: ['./visualizacao-clientes.component.scss'],
  animations: [sliderAnimations]
})
export class VisualizacaoClientesComponent implements OnInit {

  @Input() Clientes: Observable<entities.Cliente[]>;
  @ViewChild('testimonialContent') testimonialContent;
  @ViewChild('sliderContent') sliderContent;
  contentSize = 1200;
  animationsStates = [];
  resizeWindow;
  catchSlider = false;
  mouseDownposition = 0;
  turnTimer;
  time = 0;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.createResizeListner();
    this.desideSliderSizeFromWindowSize();
  }

  desideSliderSizeFromWindowSize() {
    this.contentSize = this.testimonialContent.nativeElement.clientWidth;
    if (this.contentSize >= 1200) {
      this.makeAnimationsState();
    } else if (this.contentSize >= 768) {
      this.makeAnimationStateForMiddleSize();
    } else {
      this.makeAnimationStateForSmallSize();
    }
  }
  makeAnimationsState() {
    this.animationsStates = [];
    this.Clientes.subscribe(x=>{
      for (let i = 0; i < x.length; i++) {
        if ( i === 0 ) {
          this.animationsStates.push('left');
        } else if ( i === 1 ) {
          this.animationsStates.push('right');
        } else if ( i === 2 ) {
          this.animationsStates.push('rightHalf');
        } else if (i ===  x.length - 2) {
          this.animationsStates.push('leftHiden');
        } else if (i ===  x.length - 1) {
          this.animationsStates.push('leftHalf');
        } else {
          this.animationsStates.push('rightHiden');
        }
      }
    })

  }
  makeAnimationStateForMiddleSize() {
    this.animationsStates = [];
    this.Clientes.subscribe(x=>{
      for (let i = 0; i < x.length; i++) {
        if (i === 0 ) {
          this.animationsStates.push('centerMiddle');
        } else if ( i === 1 ) {
          this.animationsStates.push('rightHalfMiddle');
        } else if (i ===  x.length - 2) {
          this.animationsStates.push('leftHidenMiddle');
        } else if ( i === x.length - 1 ) {
          this.animationsStates.push('leftHalfMiddle');
        } else {
          this.animationsStates.push('rightHidenMiddle');
        }
      }
    })

  }
  makeAnimationStateForSmallSize() {
    this.animationsStates = [];
    this.Clientes.subscribe(x=>{
      for (let i = 0; i < x.length; i++) {
        if ( i === 0 ) {
          this.animationsStates.push('centerSmall');
        } else if ( i === x.length - 1 ) {
          this.animationsStates.push('leftHidenSmall');
        } else {
          this.animationsStates.push('rightHidenSmall');
        }
      }
    })

  }
  createResizeListner() {
  this.resizeWindow = this.renderer.listen(window, 'resize', () => {
      this.desideSliderSizeFromWindowSize();
    });
  }
  clickToLeft() {
    this.turnTimer ? this.time += 300 : this.time = 100;
    this.turnTimer = setTimeout(() => {
      const toRight = this.animationsStates.shift();
      this.animationsStates.push(toRight);
      this.turnTimer = null;
    }, this.time);
  }
  clickToRight() {
    this.turnTimer ? this.time += 300 : this.time = 100;
    this.turnTimer = setTimeout(() => {
      const toLeft = this.animationsStates.pop();
      this.animationsStates.unshift(toLeft);
      this.turnTimer = null;
    }, this.time);
  }
  mousedownInSlider(event) {
    this.catchSlider = true;
    this.mouseDownposition = event.clientX;
  }
  leftSlider() {
    this.catchSlider = false;
  }
  sliderMuve(event) {
    if (this.catchSlider) {
      const x = event.clientX;
      if (this.mouseDownposition - x > 150) {
        this.mouseDownposition = x;
        this.clickToRight();
      } else if (this.mouseDownposition - x < - 150) {
        this.mouseDownposition = x;
        this.clickToLeft();
      }
    }
  }
  ngOnDestroy() {
      if (this.resizeWindow) {
        this.resizeWindow();
      }
  }
}
