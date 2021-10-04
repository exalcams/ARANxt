import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { SpaceService } from 'src/app/space/space.service';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { UserData } from '../leasemanagement/leasemanagement.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadSignedDialogComponent } from 'src/app/upload-signed-dialog/upload-signed-dialog.component';
import { VacatecomponentComponent } from '../vacatecomponent/vacatecomponent.component';
import { RenewcomponentComponent } from '../renewcomponent/renewcomponent.component';
import { TerminatecomponentComponent } from '../terminatecomponent/terminatecomponent.component';
import { saveAs } from 'file-saver';
import { SendMailDialogComponent } from 'src/app/send-mail-dialog/send-mail-dialog.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-leasemanagement-signed',
  templateUrl: './leasemanagement-signed.component.html',
  styleUrls: ['./leasemanagement-signed.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LeasemanagementSignedComponent implements OnInit {
  displayedColumns: string[] = [ 'select','ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action'];
  valueforrenewdialog = 0;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  SelectedSpace:any[]=[];
  selectedRowIndex2 = -1;
  @ViewChild('fileInput1') fileInput1: ElementRef;
  selectedRowIndex: any;
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];
  days=new Date();
  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  minDate: Date;
  AllLeases:LeaseManagement[]=[];
  valuetable :boolean = true;
  valueupload :boolean = false;
  Checked : boolean = false
  notificationSnackBarComponent: NotificationSnackBarComponent;
  clientdata: LeaseManagement;
  Renewdialogdata: any;
  sideNavStatus:boolean;
  @ViewChild ('drawer') sidenav :MatDrawer;
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private service: LeaseManagementService,
    // tslint:disable-next-line:align
    private spinner:NgxSpinnerService,   public snackBar: MatSnackBar,public dialog: MatDialog) { 
      this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetAllLeases();
  }

  GetAllLeases(){
    this.spinner.show();
    this.service.GetAllSignedLeases().subscribe((data)=>{
      this.AllLeases=<LeaseManagement[]>data;
      
      console.log("getallleases",data);
      this.dataSource=new MatTableDataSource(this.AllLeases);
      // if(this.AllLeases.length>0){
      //   this.loadallsigneddocuments(this.AllLeases[0]);
      // }
      this.spinner.hide();
      this.allplaces(this.AllLeases);
      console.log(this.AllLeases)
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
   
  }
  allplaces(bindingdatalase){
   this.SelectedSpace = bindingdatalase
    console.log(this.SelectedSpace)
    console.log(this.AllLeases)
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
  GetRemainingDays(expiry){
    let today=new Date();
    var diff = Math.floor(new Date(expiry).getTime() - today.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    // var months = Math.floor(days/31);
    // var years = Math.floor(months/12);
    return days;
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
    if (event.checked) {
      // console.log('update', ELEMENT_DATA[index]);

    }
  }
  uploadDocument(): void {
    this.openDialog();
    // if (this.btn_name === 'Upload Document') {
    //   this.btn_name = 'Cancel';
    //   this.buttonvalueupload()
    // }
    // else if (this.btn_name === 'Cancel') {
    //   this.btn_name = 'Upload Document';
    //   this.buttonvaluetable()
    // }

    // this.openDialog()
  }
SignedFormGroup(): void
{
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    Client: ['', Validators.required],
    FileName : ['', Validators.required],
    CreatedOn: ['', Validators.required],
    ExpiryDate: ['', Validators.required],
    TotalDeposit : ['', Validators.required],
    Rental: ['', Validators.required],
    BankName: ['', Validators.required],
    HolderName : ['', Validators.required],
    AccountNo : ['', Validators.required],
    ModeofTransfer : ['', Validators.required],
    IFSCCode : ['', Validators.required],
    AdvanceRequest : ['', Validators.required],
    Maintenance: ['', Validators.required],
    Electrical: ['', Validators.required],
    Condition: ['', Validators.required],
    Remarks: ['', Validators.required],

  });
}
// loadallsigneddocuments(AllLeases:LeaseManagement){
  // this.SelectedSpace =AllLeases;
  // console.log("selected",this.AllLeases)
  // this.SignedDocumentDetailsForm.get('ClientName').setValue(this.SelectedSpace.client);
  // this.SignedDocumentDetailsForm.get('FileName').setValue(this.SelectedSpace.fileName);
  // this.SignedDocumentDetailsForm.get('CreationDate').setValue(this.SelectedSpace.createdOn);
  // this.SignedDocumentDetailsForm.get('ExpiryDate').setValue(this.SelectedSpace.expiryDate);
  // this.SignedDocumentDetailsForm.get('TotalDeposit').setValue(this.SelectedSpace.totalDeposit);
  // this.SignedDocumentDetailsForm.get('Rental').setValue(this.SelectedSpace.rental);
  // this.SignedDocumentDetailsForm.get('BankName').setValue(this.SelectedSpace.bankName);
  // this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  // this.SignedDocumentDetailsForm.get('Condition').setValue(this.SelectedSpace.condition);
  // this.SignedDocumentDetailsForm.get('Remarks').setValue(this.SelectedSpace.remarks);

  // this.SignedDocumentDetailsForm.get('ModeofTransfer').setValue(this.SelectedSpace.modeofTransfer);
  // this.SignedDocumentDetailsForm.get('AccountNo').setValue(this.SelectedSpace.accountNo);
  // this.SignedDocumentDetailsForm.get('HolderName').setValue(this.SelectedSpace.holderName);

  // this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  // this.SignedDocumentDetailsForm.get('AdvanceRequest').setValue(this.SelectedSpace.advanceRequest);
  // this.SignedDocumentDetailsForm.get('IFSCCode').setValue(this.SelectedSpace.iFSC);
// }


upload(): void {
  this.uploadVisible = false;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:align
  this.btn_name = 'Upload Document';
}
handleFileInput(event): void {
    // tslint:disable-next-line:semicolon
    // tslint:disable-next-line:align

    // tslint:disable-next-line:align
    this.btn_name = 'Upload Document';
    // tslint:disable-next-line:align
    console.log(event);
    // tslint:disable-next-line:align
    this.files.push(event.target.files[0]);
    const signeddetailFile = new LeaseDocument();
    signeddetailFile.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetailFile.site = "Site 1";
    signeddetailFile.company = "EXA";
    signeddetailFile.isDraft = false;
    signeddetailFile.documentName = event.target.files[0].name;
    signeddetailFile.contentLength = event.target.files[0].type;
    signeddetailFile.contentLength = event.target.files[0].size;
    const selectedFiles = event.target.files[0];
    this.service.AddSignedFile(signeddetailFile,selectedFiles).subscribe((x) => {
      console.log(x);
      this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
    },
      err => {
        console.log(err);

      })
  }
  saveclk(): void {
    // const signeddetail = new LeaseManagement();
    // signeddetail.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    // signeddetail.documentName = this.SignedDocumentDetailsForm.get('FileName').value;
    // signeddetail.createdOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    // signeddetail.expiryDate = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    // signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
    // signeddetail.maintenance = this.SignedDocumentDetailsForm.get('Maintenance').value;
    // signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    // signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
    // signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    // signeddetail.site = "Site 1";
    // signeddetail.company = "EXA";
    // signeddetail.signedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    // signeddetail.siteSign = 'ABC';
    // signeddetail.renewalCount = 0;
    // signeddetail.renewedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.vacatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.terminatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.isVocated = false;
    // signeddetail.isTerminated = false;
    // signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
    // signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
    // signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
    // signeddetail.modeofTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
    // signeddetail.iFSC = this.SignedDocumentDetailsForm.get('IFSCCode').value;
    // signeddetail.advanceRequest = this.SignedDocumentDetailsForm.get('AdvanceRequest').value;
    // this.service.AddSignedFileDetail(signeddetail).subscribe((x) => {
    //   console.log(x);
    //     const event = new MouseEvent('click', { bubbles: false });
    // // tslint:disable-next-line:align
    // this.fileInput1.nativeElement.dispatchEvent(event);
    //   // tslint:disable-next-line:align
    //   // this.filehandle();
    // },
    //   err => {
    //     console.log(err);

    //   })

  this.ShowValidationErrors(this.SignedDocumentDetailsForm)
  }

  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filehandle() {
  
    
    // setTimeout(() => {
    //   const el: HTMLElement = this.fileInput1.nativeElement;
    //   // tslint:disable-next-line:align
    //   el.click();
    // }, 10);
  
  }
  createdDate(): void {
    this.minDate = this.SignedDocumentDetailsForm.get('CreatedOn').value;
  }
  // tslint:disable-next-line:eofline


  getWidth(days){
    if(days>=20 && days<=30){
      return "#3ec725" 
    }
    else   if(days>=10 && days<=20){
      return " #faa542"; 
    }
    else   if(days<10){
      return "red" 
    }
}

openDialog() {
  const dialogRef = this.dialog.open(UploadSignedDialogComponent,{
    panelClass: 'upload-signed-dialog',
    // position: { top: '3%', right: '3%' },
    width: '80%',
    maxWidth: '85.5vw ',
    height: '90%',

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


openDialogvacate() {
  if(this.Checked){
  const dialogRef = this.dialog.open(VacatecomponentComponent,{
    panelClass: 'upload-vacate-dialog',
    // position: { top: '3%', right: '3%' },
    width: '80%',

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
else{
  
  this.notificationSnackBarComponent.openSnackBar('Please select a checkbox', SnackBarStatus.warning);
  this.Checked = false
}
}
go(row){
  this.valueforrenewdialog=row
  console.log(this.valueforrenewdialog)
  this.Checked = true;
  this.Renewdialogdata = row;
  // if(this.selection.selected)
 
}
openDialogrenew() {
  if(this.Checked){

  const dialogRef = this.dialog.open(RenewcomponentComponent,{
    panelClass: 'upload-renew-dialog',
    data : this.Renewdialogdata,
    // position: { top: '3%', right: '3%' },
    width: '80%',

  });


  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
else{
  
  this.notificationSnackBarComponent.openSnackBar('Please select a checkbox', SnackBarStatus.warning);
  this.Checked = false
}
}
openDialogterminate() {
  if(this.Checked){
  const dialogRef = this.dialog.open(TerminatecomponentComponent,{
    panelClass: 'upload-terminate-dialog',
    // position: { top: '3%', right: '3%' },
    width: '80%',

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
else{
  
  this.notificationSnackBarComponent.openSnackBar('Please select a checkbox', SnackBarStatus.warning);
  this.Checked = false
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
  console.log(row)
  this.selectedRowIndex2 = row.leaseID;
  console.log(this.selectedRowIndex2);
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
}