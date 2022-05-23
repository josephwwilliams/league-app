import {
  trigger,
  transition,
  style,
  query,
  animate,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 1,
          transform: 'scale(0) translateY(100%)',
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '425ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
