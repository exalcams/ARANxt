import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: any[] = [
  // tslint:disable-next-line:max-line-length
  { ClientName: 'Hari', FileName: 'Laese Document for Exalca', DaysRemaining: '5', ExpiryDate: '1/10/2022', Action: '', ViewDetails: '' },
  { ClientName: 'Ram', FileName: 'Laese Document for Exalca', DaysRemaining: '3', ExpiryDate: '29/9/2022', Action: '', ViewDetails: '' },
];
@Component({
  selector: 'app-leasemanagement-expiry',
  templateUrl: './leasemanagement-expiry.component.html',
  styleUrls: ['./leasemanagement-expiry.component.scss']
})
export class LeasemanagementExpiryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action', 'ViewDetails'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  selectedRowIndex: any;
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];

  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.SignedFormGroup();
  }

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
  checkboxLabel(row?: any, i?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Documentname + 1}`;
  }
  highlight(row): any {
    this.selectedRowIndex = row.position;
  }
  updateCheckedList(event, index): void {
    if (event.checked)
    {
      console.log('update', ELEMENT_DATA[index]);

    }
  }
  // uploadDocument(): void {
  //   if (this.btn_name === 'Upload Document') {
  //     this.btn_name = 'Cancel';
  //   }
  //   else if (this.btn_name === 'Cancel')
  //   {
  //     this.btn_name = 'Upload Document';
  //   }
  // }
SignedFormGroup(): void
{
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    ClientName: [''],
    FileName : [''],
    CreationDate: [''],
    ExpiryDate: [''],
    TotalDeposit : [''],
    Rental: [''],
    Maintenance: [''],
    Electrical: [''],
    Condition: [''],
    Remarks: [''],
  });
}

upload(): void{
  this.uploadVisible = false;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:align
  this.btn_name = 'Upload Document';
}
handleFileInput(event): void {
  this.btn_name = 'Upload Document';
  console.log(event);
  this.files.push(...event.addedFiles);


}
}


