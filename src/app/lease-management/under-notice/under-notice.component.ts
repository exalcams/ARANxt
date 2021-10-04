import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SendMailDialogComponent } from 'src/app/send-mail-dialog/send-mail-dialog.component';
import { saveAs } from 'file-saver';
import { MatDrawer } from '@angular/material/sidenav';
export interface PeriodicElement {
  select: string;
  ClientName: string;
  FileName: string;
  DaysRemaining: string;
  ExpiryDate:string;
  Action:string
}

@Component({
  selector: 'app-under-notice',
  templateUrl: './under-notice.component.html',
  styleUrls: ['./under-notice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnderNoticeComponent implements OnInit {

  displayedColumns: string[] = ['select','ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selectedRowIndex: any;
  selectedRowIndex2 = -1;
  days=new Date();
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];
  valuetable :boolean = true;
  valueupload :boolean = false;
  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  underNoticeLeases:LeaseManagement[]=[];
  clientdata: LeaseManagement;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  sideNavStatus:boolean;
  @ViewChild ('drawer') sidenav :MatDrawer;
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe,public dialog: MatDialog,
    private service:LeaseManagementService,private spinner:NgxSpinnerService, public snackBar: MatSnackBar) {
      this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
     }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetUnderNoticeLeased();
  }
  GetUnderNoticeLeased(){
    this.spinner.show();
    this.service.GetNoticePeriodLeases().subscribe((data)=>{
      console.log("under notice",data);
      this.underNoticeLeases=<LeaseManagement[]>data;
      this.dataSource=new MatTableDataSource(this.underNoticeLeases);
      
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
      console.log('update', this.underNoticeLeases[index]);

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
    ClientName: row.clientName,
    FileName :row.documentName,
    CreationDate: row.createdOn,
    ExpiryDate: row.expiryDate,
    TotalDeposit : row.totalDeposit,
    Rental: row.rental,
    Maintenance: row.manintenace,
    Electrical: row.electrical,
    Condition: row.condition,
    Remarks: row.remarks,
    BankName:row.bankName,
    HolderName:row.holderName,
    AccountNo:row.accountNo,
    ModeOfTransfer:row.modeOfTransfer,
    IFSC:row.iFSC,
    AdvanceRequest:row.advance
  });
  this.highlight2(row)
}
variableclient:any;
variablefilename:any;
variableCreatedOn:any;
variableExpiryDate:any;
variableTotalDeposit:any;
variableRental:any;
variableBankName:any;
variableHolderName:any;
variableAccountNo:any;
variaModeofTransfer:any;
varIFSCCode:any;
vAdvanceRequest:any;
vMaintenance:any;
vElectrical:any;
vCondition:any;
vRemarks:any;


docdata(ind){
    this.clientdata = ind;
   console.log(this.clientdata.clientName)
   this.variableclient = this.clientdata.clientName
   this.variablefilename = this.clientdata.documentName
   this.variableCreatedOn = this.clientdata.createdOn
   this.variableExpiryDate = this.clientdata.expiryDate
   this.variableTotalDeposit = this.clientdata.totalDeposit
   this.variableRental = this.clientdata.rental
   this.variableBankName = this.clientdata.bankName
   this.variableHolderName = this.clientdata.holderName
   this.variableAccountNo = this.clientdata.accountNo
 
   this.variaModeofTransfer = this.clientdata.modeOfTransfer
   this.varIFSCCode = this.clientdata.iFSC

   this.vAdvanceRequest = this.clientdata.advance
   this.vMaintenance = this.clientdata.manintenace
   this.vElectrical = this.clientdata.electrical
   this.vCondition = this.clientdata.condition
   this.vRemarks = this.clientdata.remarks
   if(!this.sideNavStatus)
     {
      this.sidenav.toggle();
     }
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

getWidth(days){
  if(days>=20 && days<=30){
    return "#3ec725"  
  }
  else   if(days>=10 && days<=20){
    return "#faa542"; 
  }
  else   if(days<10){
    return "red" 
  }
}


buttonvaluetable(){
  this.valuetable = true;
  this.valueupload = false;
  }
  buttonvalueupload(){
    this.valuetable = false;
    this.valueupload = true;
  }
  
  highlight2(row){
    this.selectedRowIndex2 = row.leaseID;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openSendMailDialog(documentID) {
    const dialogRef = this.dialog.open(SendMailDialogComponent,
      {
        panelClass: "send-mail-dialog",
        data: { documentID: documentID }
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log("send-mail-dialog", res);
        this.spinner.show();
        this.service.SendMailFromLease(res).subscribe(() => {
          console.log("Mail sent");
          this.notificationSnackBarComponent.openSnackBar("email has been sent", SnackBarStatus.success);
          this.spinner.hide();
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      }
    });
  }
  DownloadLeaseDocument(row)
{
  
   
      this.service.DownloadLeaseDocument(row.documentID).subscribe((res)=>{
        let blob:any = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(blob, `${row.documentName}.docx`);
        console.log(`${row.documentName} downloaded`);
      },
      err=>{
        console.log(err);
      });
  
 
}
drawerToggled(event){
  this.sideNavStatus=event;
}
}
