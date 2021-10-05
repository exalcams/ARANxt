import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';
import { SendMailDialogComponent } from 'src/app/send-mail-dialog/send-mail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { VacatecomponentComponent } from '../vacatecomponent/vacatecomponent.component';
import { RenewcomponentComponent } from '../renewcomponent/renewcomponent.component';
import { TerminatecomponentComponent } from '../terminatecomponent/terminatecomponent.component';
@Component({
  selector: 'app-leasemanagement-expiry',
  templateUrl: './leasemanagement-expiry.component.html',
  styleUrls: ['./leasemanagement-expiry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeasemanagementExpiryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action'];
  clientdata: LeaseManagement;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selectedRowIndex: any;
  selectedRowIndex2 = -1;
  
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];
  Mlease:LeaseManagement[]=[];
  Mleasebinddata:LeaseManagement[]=[];
  SelectedSpace:LeaseManagement=new LeaseManagement();
  Mget:LeaseManagement[]=[];
  days=new Date();
  valuetable :boolean = true;
  valueupload :boolean = false;
  SignedDocumentDetailsForm: FormGroup;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  sideNavStatus:boolean;
  Renewdialogdata:LeaseManagement=new LeaseManagement();
  @ViewChild ('drawer') sidenav :MatDrawer;
  Checked: boolean = false

  constructor(private formBuilder: FormBuilder, private spinner:NgxSpinnerService, private datepipe: DatePipe, private service:LeaseManagementService,public dialog: MatDialog, public snackBar: MatSnackBar) { 
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetExpiryLeases()
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
      // console.log('update', ELEMENT_DATA[index]);

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
loadallsigneddocuments(Mlease:LeaseManagement){
  this.SelectedSpace =Mlease;
  console.log("selected",this.SelectedSpace)
  this.SignedDocumentDetailsForm.get('ClientName').setValue(this.SelectedSpace.clientName);
  this.SignedDocumentDetailsForm.get('FileName').setValue(this.SelectedSpace.documentName);
  this.SignedDocumentDetailsForm.get('CreationDate').setValue(this.SelectedSpace.createdOn);
  this.SignedDocumentDetailsForm.get('ExpiryDate').setValue(this.SelectedSpace.expiryDate);
  this.SignedDocumentDetailsForm.get('TotalDeposit').setValue(this.SelectedSpace.totalDeposit);
  this.SignedDocumentDetailsForm.get('Rental').setValue(this.SelectedSpace.rental);
  this.SignedDocumentDetailsForm.get('Maintenance').setValue(this.SelectedSpace.manintenace);
  this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  this.SignedDocumentDetailsForm.get('Condition').setValue(this.SelectedSpace.condition);
  this.SignedDocumentDetailsForm.get('Remarks').setValue(this.SelectedSpace.remarks);
 
}


// // not used func
// GetSpaceValues() {
//   this.SelectedSpace.client = this.SignedDocumentDetailsForm.get('ClientName').value;
// }


GetExpiryLeases(){
  this.spinner.show();
  this.service.GetExpiryLeases().subscribe((data)=>{
    this.Mlease=<any[]>data;
    console.log("expiry" ,data);
    this.dataSource=new MatTableDataSource(this.Mlease);
    if(this.Mlease.length>0){
      this.loadallsigneddocuments(this.Mlease[0]);
    }
    this.allplaces(this.Mlease);
    console.log(this.Mlease)
    this.spinner.hide();
  },
  err=>{
    console.log(err);
    this.spinner.hide();
  });
  this.Mleasebinddata = this.Mlease
  console.log(this.Mleasebinddata)
}

allplaces(bindingdatalase){
  this.SelectedSpace = bindingdatalase
   console.log(this.SelectedSpace)
   console.log(this.Mlease)
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
    this.varIFSCCode = this.clientdata.ifsc

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


GetRemainingDays(expiry){
  let today=new Date();
    var diff = Math.floor(new Date(expiry).getTime() - today.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    // var months = Math.floor(days/31);
    // var years = Math.floor(months/12);
    return days;
}
rdayscolorchange(days){

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

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
getWidth(days) {
  if (days >= 30) {
    return "#3ec725"
  }
  else if (days >= 10 && days <= 30) {
    return " #faa542";
  }
  else if (days < 10) {
    return "red"
  }
}

changeSelection(row){
  setTimeout(()=>{
    this.selection.toggle(row);
  })
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
  // this.Mleasebinddata[row]
  this.selectedRowIndex2 = row.leaseID;
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
drawerToggled(event){
  this.sideNavStatus=event;
}
openDialogvacate() {
  if (this.Checked) {
    const dialogRef = this.dialog.open(VacatecomponentComponent, {
      panelClass: 'upload-vacate-dialog',
      data: this.Renewdialogdata,
      // position: { top: '3%', right: '3%' },
      width: '80%',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  else {

    this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning);
    this.Checked = false
  }
}
go(row) {
  this.Checked = true;
  this.Renewdialogdata = row;
  // if(this.selection.selected)

}
openDialogrenew() {
  if (this.Checked) {

    const dialogRef = this.dialog.open(RenewcomponentComponent, {
      panelClass: 'upload-renew-dialog',
      data: this.Renewdialogdata,
      // position: { top: '3%', right: '3%' },
      width: '80%',

    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  else {

    this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning);
    this.Checked = false
  }
}
openDialogterminate() {
  if (this.Checked) {
    const dialogRef = this.dialog.open(TerminatecomponentComponent, {
      panelClass: 'upload-terminate-dialog',
      data: this.Renewdialogdata,
      // position: { top: '3%', right: '3%' },
      width: '80%',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  else {

    this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning);
    this.Checked = false
  }
}
}


