import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UtilityComponent implements OnInit {
  tabindex=0;
  constructor() { }

  ngOnInit(): void {
  }

}