import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseManagement } from 'src/app/Model/Leasemanagement';
import { LeaseManagementService } from 'src/app/service/lease-management.service';

@Component({
  selector: 'app-terminate',
  templateUrl: './terminate.component.html',
  styleUrls: ['./terminate.component.scss']
})
export class TerminateComponent implements OnInit {

  displayedColumns: string[] = ['ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action', 'ViewDetails'];
  dataSource = new MatTableDataSource<any>([]);
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

  terminatedLeases:LeaseManagement[]=[];

  constructor(private formBuilder: FormBuilder,
     private datepipe: DatePipe,private service:LeaseManagementService,
     private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetTerminatedLeases();
  }

  GetTerminatedLeases(){
    this.spinner.show();
    this.service.GetTerminatedLeases().subscribe((data)=>{
      console.log("terminated",data);
      this.terminatedLeases=<LeaseManagement[]>data;
      this.dataSource=new MatTableDataSource(this.terminatedLeases);
      this.spinner.hide();
    },
    err=>{
      this.spinner.hide();
      console.log(err);
    });
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
      console.log('update', this.terminatedLeases[index]);

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
    BankName:[''],
    HolderName:[''],
    AccountNo: [''],
    ModeOfTransfer: [''],
    IFSC: [''],
    AdvanceRequest: [''],
    Maintenance: [''],
    Electrical: [''],
    Condition: [''],
    Remarks: [''],
  });
}

loadLeaseDetails(row:LeaseManagement){
  console.log("selected",row);
  this.SignedDocumentDetailsForm.patchValue({
    ClientName: row.client,
    FileName :row.fileName,
    CreationDate: row.createdOn,
    ExpiryDate: row.expiryDate,
    TotalDeposit : row.totalDeposit,
    Rental: row.rental,
    Maintenance: row.maintenance,
    Electrical: row.electrical,
    Condition: row.condition,
    Remarks: row.remarks,
    BankName:row.bankName,
    HolderName:row.holderName,
    AccountNo:row.accountNo,
    ModeOfTransfer:row.modeofTransfer,
    IFSC:row.iFSC,
    AdvanceRequest:row.advanceRequest
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
GetRemainingDays(expiry){
  let today=new Date();
  let rDays=new Date(expiry).getDate()-today.getDate();
  return rDays;
}
}
