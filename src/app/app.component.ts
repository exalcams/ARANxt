import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeSlideInOut_one', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),

    ]),

    trigger('fadeSlideInOut', [

      state('none, void', style({
        opacity: 0, transform: 'translateY(10px)'
      })),
      state('maximum', style({
        opacity: 1, transform: 'translateY(0)'
      })),
      transition('none => maximum', animate('0.8s'))
    ]),

  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit{
  ngOnInit(){

  }
}
