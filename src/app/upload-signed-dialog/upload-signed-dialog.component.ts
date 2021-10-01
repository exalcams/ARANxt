import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DraftDialogComponent } from '../draft-dialog/draft-dialog.component';

@Component({
  selector: 'app-upload-signed-dialog',
  templateUrl: './upload-signed-dialog.component.html',
  styleUrls: ['./upload-signed-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UploadSignedDialogComponent implements OnInit {
  SignedDocumentDetailsForm: FormGroup;
  files:File[] =[];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DraftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

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

}
