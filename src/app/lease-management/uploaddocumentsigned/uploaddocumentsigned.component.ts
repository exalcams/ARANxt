import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseManagementService } from 'src/app/service/lease-management.service';

@Component({
  selector: 'app-uploaddocumentsigned',
  templateUrl: './uploaddocumentsigned.component.html',
  styleUrls: ['./uploaddocumentsigned.component.scss']
})
export class UploaddocumentsignedComponent implements OnInit {

  SignedDocumentDetailsForm: FormGroup;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  btn_name: any = 'Upload Document';
  files: File[] = [];
  @ViewChild('fileInput1') fileInput1: ElementRef;
  minDate: Date;



  constructor(public dialogRef: MatDialogRef<UploaddocumentsignedComponent>,public snackBar: MatSnackBar,private formBuilder: FormBuilder, private datepipe: DatePipe, private service: LeaseManagementService,)
  { 
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  ngOnInit(): void {
  }
  Close():void{
    this.dialogRef.close();
  }
  SignedFormGroup(): void
{
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    Client: ['',Validators.required],
    FileName : ['',Validators.required],
    CreatedOn: ['',Validators.required],
    ExpiryDate: ['',Validators.required],
    TotalDeposit : ['',Validators.required],
    Rental: ['',Validators.required],
    BankName: ['',Validators.required],
    HolderName : ['',Validators.required],
    AccountNo : ['',Validators.required],
    ModeofTransfer : ['',Validators.required],
    IFSCCode : ['',Validators.required],
    AdvanceRequest : ['',Validators.required],
    Maintenance: ['',Validators.required],
    Electrical: ['',Validators.required],
    Condition: ['',Validators.required],
    Remarks: ['',Validators.required],

  });
}

// loadallsigneddocuments(AllLeases:LeaseManagement){
//   this.SelectedSpace =AllLeases;
//   console.log("selected",this.SelectedSpace)
//   this.SignedDocumentDetailsForm.get('ClientName').setValue(this.SelectedSpace.client);
//   this.SignedDocumentDetailsForm.get('FileName').setValue(this.SelectedSpace.fileName);
//   this.SignedDocumentDetailsForm.get('CreationDate').setValue(this.SelectedSpace.createdOn);
//   this.SignedDocumentDetailsForm.get('ExpiryDate').setValue(this.SelectedSpace.expiryDate);
//   this.SignedDocumentDetailsForm.get('TotalDeposit').setValue(this.SelectedSpace.totalDeposit);
//   this.SignedDocumentDetailsForm.get('Rental').setValue(this.SelectedSpace.rental);
//   this.SignedDocumentDetailsForm.get('BankName').setValue(this.SelectedSpace.bankName);
//   this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
//   this.SignedDocumentDetailsForm.get('Condition').setValue(this.SelectedSpace.condition);
//   this.SignedDocumentDetailsForm.get('Remarks').setValue(this.SelectedSpace.remarks);

//   this.SignedDocumentDetailsForm.get('ModeofTransfer').setValue(this.SelectedSpace.modeofTransfer);
//   this.SignedDocumentDetailsForm.get('AccountNo').setValue(this.SelectedSpace.accountNo);
//   this.SignedDocumentDetailsForm.get('HolderName').setValue(this.SelectedSpace.holderName);

//   this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
//   this.SignedDocumentDetailsForm.get('AdvanceRequest').setValue(this.SelectedSpace.advanceRequest);
//   this.SignedDocumentDetailsForm.get('IFSCCode').setValue(this.SelectedSpace.iFSC);
// }


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
  // // tslint:disable-next-line:align
  // signeddetail.client = this.SignedDocumentDetailsForm.get('Client').value;
  // // tslint:disable-next-line:align
  // signeddetail.fileName = this.SignedDocumentDetailsForm.get('FileName').value;
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

}


createdDate(): void {
  this.minDate = this.SignedDocumentDetailsForm.get('CreatedOn').value;
}
}
