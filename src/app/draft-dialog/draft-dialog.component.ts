import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseDraft } from '../Model/Leasemanagement';

@Component({
  selector: 'app-draft-dialog',
  templateUrl: './draft-dialog.component.html',
  styleUrls: ['./draft-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DraftDialogComponent implements OnInit {

  form: FormGroup;
  radio2_check: boolean;
  radio1_check: boolean;
  constructor(
    public dialogRef: MatDialogRef<DraftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      documentName: ['', Validators.required],
      documentType: ['Template'],
      documentOwner: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.InitializeFormGroup();
  }

  InitializeFormGroup(): void {
    if (this.data !=null) {
      this.form.patchValue({
        documentName: this.data.name,
        documentType: this.data.type,
        documentOwner: this.data.owner
      });
    }
  }
  close() {
    this.dialogRef.close(false);
  }
  UploadFile() {
    console.log(this.form);
    if (this.form.valid) {
      const  obj =new LeaseDraft();
      obj .documentName=this.form.get("documentName").value;
      obj.documentOwner=this.form.get("documentOwner").value;
      obj.documentType=this.form.get("documentType").value;
      console.log("draft-dialog",obj);
      
      this.dialogRef.close(obj);
    }
    else {
      this.ShowValidationErrors(this.form);
    }
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
}

