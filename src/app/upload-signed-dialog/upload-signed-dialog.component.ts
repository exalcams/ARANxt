import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DraftDialogComponent } from '../draft-dialog/draft-dialog.component';
import { LeaseManagement } from '../Model/Leasemanagement';
import { NotificationSnackBarComponent } from '../notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from '../notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseManagementService } from '../service/lease-management.service';

@Component({
  selector: 'app-upload-signed-dialog',
  templateUrl: './upload-signed-dialog.component.html',
  styleUrls: ['./upload-signed-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UploadSignedDialogComponent implements OnInit {
  SignedDocumentDetailsForm: FormGroup;
  files:File[] =[];
  notificationSnackBarComponent: NotificationSnackBarComponent;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DraftDialogComponent>,private service: LeaseManagementService, public snackBar: MatSnackBar,public _datePipe:DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {   this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);}

  ngOnInit(): void {
    this.SignedFormGroup();
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
    NoticePeriod: ['', Validators.required],
  });
}
onSelect(event): void {
  console.log(event);
  this.files=[];
  this.files.push(...event.addedFiles);
}
onRemove(event): void {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
  close(){
    this.dialogRef.close(false);
  }
  
  upload()
  {
    if((this.SignedDocumentDetailsForm.valid  )&&(this.files[0]))
    {
      const signeddetail = new LeaseManagement();
    signeddetail.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetail.documentName = this.SignedDocumentDetailsForm.get('FileName').value;
    signeddetail.createdOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.expiryDate = this._datePipe.transform(this.SignedDocumentDetailsForm.get('ExpiryDate').value, 'yyyy-MM-dd');
    signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
    signeddetail.manintenace = this.SignedDocumentDetailsForm.get('Maintenance').value;
    signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
    signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    signeddetail.signedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
    signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
    signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
    signeddetail.modeOfTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
    signeddetail.advance = this.SignedDocumentDetailsForm.get('AdvanceRequest').value;
    signeddetail.ifsc = this.SignedDocumentDetailsForm.get('IFSCCode').value;
    signeddetail.noticePeriod = this.SignedDocumentDetailsForm.get('NoticePeriod').value;

   console.log("upload");
   
    this.service.AddSignedFileDetail(signeddetail,this.files[0]).subscribe((x) => {
     if(x)
     {
      this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
     }
 
    },
      err => {
        console.log(err);

      })

    }
    else if(!this.files[0] && this.SignedDocumentDetailsForm.valid)
  {
    this.notificationSnackBarComponent.openSnackBar('File need to be Uploaded', SnackBarStatus.danger);
  }
  else if(!this.SignedDocumentDetailsForm.valid)
  {
  // this.SignedDocumentDetailsForm.invalid;
  this.ShowValidationErrors(this.SignedDocumentDetailsForm);
  }
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
        if (!formGroup.get(key).valid) {
            console.log(key);
        }
        formGroup.get(key).markAsTouched();
        formGroup.get(key).markAsDirty();
        if (formGroup.get(key) instanceof FormArray) {
            const FormArrayControls = formGroup.get(key) as FormArray;
            Object.keys(FormArrayControls.controls).forEach(key1 => {
                if (FormArrayControls.get(key1) instanceof FormGroup) {
                    const FormGroupControls = FormArrayControls.get(key1) as FormGroup;
                    Object.keys(FormGroupControls.controls).forEach(key2 => {
                        FormGroupControls.get(key2).markAsTouched();
                        FormGroupControls.get(key2).markAsDirty();
                        if (!FormGroupControls.get(key2).valid) {
                            console.log(key2);
                        }
                    });
                } else {
                    FormArrayControls.get(key1).markAsTouched();
                    FormArrayControls.get(key1).markAsDirty();
                }
            });
        }
    });

}
}
