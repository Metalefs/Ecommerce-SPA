import { trigger, state, style, transition, animate } from '@angular/animations';

export const sliderAnimations = trigger('sliderAnimations', [
  // for big divace.
    state('leftHiden', style({
      left: '-50%'
    })),
    state('leftHalf', style({
      left: '-16%'
    })),
    state('left', style({
      left: '18%'
    })),
    state('right', style({
      left: '52%'
    })),
    state('rightHalf', style({
      left: '86%'
    })),
    state('rightHiden', style({
      left: '120%'
    })),
    // for midle size divace.
    state('leftHidenMiddle', style({
      width: '46%',
      left: '-50%'
    })),
    state('leftHalfMiddle', style({
      width: '46%',
      left: '-23%'
    })),
    state('centerMiddle', style({
      width: '46%',
      left: '27%'
    })),
    state('rightHalfMiddle', style({
      width: '46%',
      left: '77%',
    })),
    state('rightHidenMiddle', style({
      width: '46%',
      left: '125%',
    })),
    // for mobile divace.
    state('leftHidenSmall', style({
      width: '90%',
      left: '-120%'
    })),
    state('centerSmall', style({
      width: '90%',
      left: '5%',
    })),
    state('rightHidenSmall', style({
      width: '90%',
      left: '120%',
    })),

    // for big divace.
    transition('leftHiden <=> leftHalf', [animate('0.35s')]),
    transition('leftHalf <=> left', [animate('0.35s')]),
    transition('left <=> right', [animate('0.35s')]),
    transition('right <=> rightHalf', [animate('0.35s')]),
    transition('rightHalf <=> rightHiden', [animate('0.35s')]),
    // for midle size divace.
    transition('leftHidenMiddle <=> leftHalfMiddle', [animate('0.35s')]),
    transition('leftHalfMiddle <=> centerMiddle', [animate('0.35s')]),
    transition('centerMiddle <=> rightHalfMiddle', [animate('0.35s')]),
    transition('rightHalfMiddle <=> rightHidenMiddle', [animate('0.35s')]),
    // for mobile divace.
    transition('leftHidenSmall <=> centerSmall', [animate('0.35s')]),
    transition('centerSmall <=> rightHidenSmall', [animate('0.35s')]),
  ]);

