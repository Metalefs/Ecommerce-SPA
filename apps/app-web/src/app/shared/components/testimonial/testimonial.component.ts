import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Input, ViewChild, Renderer2, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { sliderAnimations } from "./testimonial.animations";
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  animations: [sliderAnimations]
})
export class TestimonialComponent implements OnInit, OnDestroy {

  @Input() sliderData: any [];
  @ViewChild('testimonialContent', { static: false }) testimonialContent: ElementRef ;
  @ViewChild('sliderContent', { static: false }) sliderContent: ElementRef ;
  contentSize = 1200;
  animationsStates = [];
  resizeWindow;
  catchSlider = false;
  mouseDownposition = 0;
  turnTimer;
  AutoTurnTimer;
  time = 0;
  mobileQuery: MediaQueryList;
  TabletQuery: MediaQueryList;
  quoteR = faQuoteRight;
  quoteL = faQuoteLeft;
  private _mobileQueryListener: () => void;

  constructor(private cdr: ChangeDetectorRef,
    media: MediaMatcher,private renderer: Renderer2) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.TabletQuery = media.matchMedia('(min-width:767px) and (max-width: 992px)');
      this._mobileQueryListener = () => cdr.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  LerWindowSize(){
      return this.mobileQuery;
  }

  ngOnInit(){
    for (let i = this.sliderData.length - 1; i < 5; i++ ) {
      this.sliderData.push(this.sliderData[i]);
    }
    // if(this.sliderData.length > 6 || this.mobileQuery.matches && this.TabletQuery.matches)
    //this.AutoTurn()
    this.createResizeListener();
    this.decideSliderSizeFromWindowSize();
  }
  clicking:boolean = false;
  AutoTurn(){
    this.AutoTurnTimer = setInterval(() => {
      if(!this.clicking)
      this.clickToRight();
    }, 9000);
  }

  decideSliderSizeFromWindowSize() {
    if (!this.mobileQuery.matches && !this.TabletQuery.matches) {
      this.makeAnimationsState();
    }
    else if (this.TabletQuery.matches) {
      this.makeAnimationStateForMiddleSize();
    }
    else if (this.mobileQuery.matches)  {
      this.makeAnimationStateForSmallSize();
    }

    this.AutoTurn();

  }
  makeAnimationsState() {
    this.animationsStates = [];
    for (let i = 0; i < this.sliderData.length; i++) {
      if ( i === 0 ) {
        this.animationsStates.push('left');
      } else if ( i === 1 ) {
        this.animationsStates.push('right');
      } else if ( i === 2 ) {
        this.animationsStates.push('rightHalf');
      } else if (i ===  this.sliderData.length - 2) {
        this.animationsStates.push('leftHiden');
      } else if (i ===  this.sliderData.length - 1) {
        this.animationsStates.push('leftHalf');
      } else {
        this.animationsStates.push('rightHiden');
      }
    }
  }
  makeAnimationStateForMiddleSize() {
    this.animationsStates = [];
    for (let i = 0; i < this.sliderData.length; i++) {
      if (i === 0 ) {
        this.animationsStates.push('centerMiddle');
      } else if ( i === 1 ) {
        this.animationsStates.push('rightHalfMiddle');
      } else if (i ===  this.sliderData.length - 2) {
        this.animationsStates.push('leftHidenMiddle');
      } else if ( i ===  this.sliderData.length - 1 ) {
        this.animationsStates.push('leftHalfMiddle');
      } else {
        this.animationsStates.push('rightHidenMiddle');
      }
    }
  }
  makeAnimationStateForSmallSize() {
    this.animationsStates = [];
    for (let i = 0; i < this.sliderData.length; i++) {
      if ( i === 0 ) {
        this.animationsStates.push('centerSmall');
      } else if ( i === this.sliderData.length - 1 ) {
        this.animationsStates.push('leftHidenSmall');
      } else {
        this.animationsStates.push('rightHidenSmall');
      }
    }
  }
  createResizeListener() {
    this.resizeWindow = this.renderer.listen(window, 'resize', () => {
      this.decideSliderSizeFromWindowSize();
    });
    this.resizeWindow = this.renderer.listen(window, 'load', () => {
      this.decideSliderSizeFromWindowSize();
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
  sliderMove(event) {
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
