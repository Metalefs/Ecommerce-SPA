import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  state,
  animate,
  keyframes,
} from '@angular/animations';

export let fade = trigger('fadeIn',[
    state('void', style({opacity:0})),

    transition(':enter, :leave', [ //void <=> *
      animate(500)
    ]),
]);

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('top') ),
    transition('* => isRight', slideTo('top') ),
    transition('isRight => *', slideTo('top') ),
    transition('isLeft => *', slideTo('top') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        // opacity: '.50',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ],optional),
    group([
      query(':leave', [
        animate('1150ms ease-in-out', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('1150ms ease-in-out', style({ [direction]: '0%'}))
      ],optional)
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
