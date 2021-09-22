import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
export interface UserData {
 
  Documentname: string;
  Filesize: string;
  CreatedOn: string;
  ExpiredOn:string;
  Actions:any
}
const ELEMENT_DATA :UserData[] = [
  {Documentname :'Lease Document For Exalca',Filesize:'1mb',CreatedOn:'15/9/2021',ExpiredOn:'15/9/2022',Actions:'',},
  {Documentname :'Lease Document For Entity Data',Filesize:'1mb',CreatedOn:'17/9/2021',ExpiredOn:'17/9/2022',Actions:'',},
 

]
@Component({
  selector: 'app-leasemanagement',
  templateUrl: './leasemanagement.component.html',
  styleUrls: ['./leasemanagement.component.scss']
})
export class LeasemanagementComponent implements OnInit {
  displayedColumns: string[] = ['select','Documentname', 'Filesize', 'CreatedOn', 'ExpiredOn','Actions'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA) ;
  selection = new SelectionModel<UserData>(true, []);
  link_bool:boolean=false;
  product_bool:boolean=false;
  drive_bool:boolean=false;
  search_bool:boolean=false
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bool1:Boolean;
  bool2: Boolean;
  bool3:Boolean;
  files:File[] =[];
  constructor() { }

  ngOnInit(): void {
  }
  // table work
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Documentname + 1}`;
  }
// table work

  func1(){
    this.bool1 = true;
    this.bool2 = false;
    this.bool3 = false;
  }
  func2(){
    this.bool1 = false;
    this.bool2 = true;
    this.bool3 = false;
  }
  func3(){
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = true;
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  chooseIcons(eve): void
  {
if ( eve === 'search')
{
this.search_bool = !this.search_bool;
this.product_bool=false;
this.link_bool = false;
this.drive_bool=false
}
if ( eve === 'product')
{
this.product_bool = !this.product_bool;
this.search_bool =false;
this.link_bool = false;
this.drive_bool=false;
}
if ( eve === 'drive')
{
this.drive_bool = !this.drive_bool;
this.product_bool = false;
this.link_bool = false;
this.search_bool=false;
}
if ( eve === 'link')
{
this.link_bool = !this.link_bool;
this.product_bool = false;
this.drive_bool = false;
this.search_bool=false;
}
  }
}
