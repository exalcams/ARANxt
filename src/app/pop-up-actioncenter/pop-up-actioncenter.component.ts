import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-actioncenter',
  templateUrl: './pop-up-actioncenter.component.html',
  styleUrls: ['./pop-up-actioncenter.component.scss']
})
export class PopUpActioncenterComponent implements OnInit {
  searchbutton: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  search(){
    this.searchbutton=true;
  }

}
