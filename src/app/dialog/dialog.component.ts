import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiteComponent } from '../site/site.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Finishpopup() {
    this.dialog.open(SiteComponent, {
      // width: '50%',
      // height: '40%',
      // height: '50%',
      width: '50%',
      panelClass: "site"
    });
  }

}
