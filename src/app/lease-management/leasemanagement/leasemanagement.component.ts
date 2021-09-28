import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { GDriveComponent } from 'src/app/g-drive/g-drive.component';
export interface UserData {

  Documentname: string;
  Filesize: string;
  CreatedOn: string;
  Actions:any
}
const ELEMENT_DATA :UserData[] = [
  {Documentname :'Lease Document For Exalca',Filesize:'1mb',CreatedOn:'15/9/2021',Actions:'',},
  {Documentname :'Lease Document For Entity Data',Filesize:'1mb',CreatedOn:'17/9/2021',Actions:'',},
 

]
@Component({
  selector: 'app-leasemanagement',
  templateUrl: './leasemanagement.component.html',
  styleUrls: ['./leasemanagement.component.scss']
})
export class LeasemanagementComponent implements OnInit {
  displayedColumns: string[] = ['select','Documentname', 'Filesize', 'CreatedOn','Actions'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA) ;
  selection = new SelectionModel<UserData>(true, []);
  // tslint:disable-next-line:variable-name
  
  // tslint:disable-next-line:variable-name
  link_bool = false;
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:no-inferrable-types
  // tslint:disable-next-line:variable-name
  product_bool: boolean = false;
  // tslint:disable-next-line:variable-name
  drive_bool = false;
  // tslint:disable-next-line:variable-name
  search_bool: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bool1:Boolean=true;
  // tslint:disable-next-line:ban-types
  bool2: Boolean;
  bool3:Boolean;
  files:File[] =[];
  bool4: boolean;
  bool5: boolean;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {

  }
  // table work
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle(): any {
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

  func1(): void{
    this.bool1 = true;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;

  }
  func2(): void{
    this.bool1 = false;
    this.bool2 = true;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;

  }
  func3(): void{
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = true;
    this.bool4 = false;
    this.bool5 = false;

  }
  func4(): void{
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;

    this.bool4 = true;
    this.bool5 = false;
  }
  func5(): void{
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = true;
  }
  onSelect(event): void {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // ngAfterViewInit()  {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  chooseIcons(eve): void {
    if (eve === 'search') {
      this.search_bool = !this.search_bool;
      this.product_bool = false;
      this.link_bool = false;
      this.drive_bool = false
    }
    if (eve === 'product') {
      this.product_bool = !this.product_bool;
      this.search_bool = false;
      this.link_bool = false;
      this.drive_bool = false;
    }
    if (eve === 'drive') {
      this.drive_bool = !this.drive_bool;
      this.product_bool = false;
      this.link_bool = false;
      this.search_bool = false;
    }
    if (eve === 'link') {
      this.link_bool = !this.link_bool;
      this.product_bool = false;
      this.drive_bool = false;
      this.search_bool = false;
    }
  }
  openGdrive() {
    const dialogRef = this.dialog.open(GDriveComponent,
      {
        panelClass: "g-drive-dialog"
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        
      }
    });
  }
}
