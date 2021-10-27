import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SplashScreenComponent implements OnInit {

  splashScreenEl: any;
  player: AnimationPlayer;
  @ViewChild('splash', { static: true }) element: ElementRef;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._init();
  }

  private _init(): void {
    // Get the splash screen element
    this.splashScreenEl = this.element.nativeElement;

    // If the splash screen element exists...
    if (this.splashScreenEl) {
      // Hide it on the first NavigationEnd event
      this._router.events
        .pipe(
          filter((event => event instanceof NavigationEnd)),
          take(1)
        )
        .subscribe(() => {
          setTimeout(() => {
            this.hide();
          });
        });
    }
  }
  /**
     * Show the splash screen
     */
  show(): void {
    this.player =
      this._animationBuilder
        .build([
          style({
            opacity: '0',
            zIndex: '99999'
          }),
          animate('400ms ease', style({ opacity: '1' }))
        ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    this.player =
      this._animationBuilder
        .build([
          style({
            opacity: '1',
          }),
          animate('400ms ease', style({
            opacity: '0',
            zIndex: '-10',
          }))
        ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 2000);
  }

}
