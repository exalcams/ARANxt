import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpActioncenterComponent } from '../pop-up-actioncenter/pop-up-actioncenter.component';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface Employee {
  Id: any;
  Name: string;
 
}
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    
    
  ];
  employees:Employee [] =[
    {Id:'1',Name:'Name'},
    {Id:'1',Name:'Name'},
    {Id:'1',Name:'Name'},
    {Id:'1',Name:'Name'},
    {Id:'1',Name:'Name'},
    {Id:'1',Name:'Name'},
    
  
  ]
  searchbutton: boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  addtask(){
    this.dialog.open(PopUpActioncenterComponent, {
      position: {top: '3.5%',right:'1%'},
      width:'50%',
      height:'40%'
    });
  }
  search(){
    this.searchbutton=true;
  }
}
