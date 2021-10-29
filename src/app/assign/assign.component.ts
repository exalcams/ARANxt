import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../login.service';
import { SelectedRow } from '../Model/Object';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
// ];

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  selected = false;
  Assign: boolean = false;
  selectedRowIndex2 = -1;
  selected1: any;
  showassigned: boolean = true;
  name: any;
  employeeList = ['EMP0071', 'EMP0072', 'EMP0073', 'EMP0080', 'EMP0081', 'EMP0082', 'EMP0083', 'EMP0084', 'EMP0085', 'EMP0086', 'EMP0087'];
  dataSourceSS = ['EMP0071', 'EMP0072', 'EMP0073', 'EMP0080', 'EMP0081', 'EMP0082', 'EMP0083', 'EMP0084', 'EMP0085', 'EMP0086', 'EMP0087'];
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  assignRows: SelectedRow[] = [];
  onSelectCard(i: any) {
    this.selected = true;
    this.selected1 = i;
    console.log(this.employeeList[i]);
    this.name = this.employeeList[i];
    this.showassigned = false;
  }
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(public nav: LoginService) { this.nav.islogin(true); }

  ngOnInit(): void {
    let s = localStorage.getItem('assignedRows')
    this.assignRows = JSON.parse(s);
    console.log(this.assignRows);
    this.dataSource = new MatTableDataSource(this.assignRows)
  }
  AssignSuccessfulBt() {
    this.Assign = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  highlight2(row) {
    console.log(row)
    this.selectedRowIndex2 = row.AssertId;
    console.log(this.selectedRowIndex2);
  }
}
