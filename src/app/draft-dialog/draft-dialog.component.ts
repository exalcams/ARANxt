import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-draft-dialog',
  templateUrl: './draft-dialog.component.html',
  styleUrls: ['./draft-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DraftDialogComponent implements OnInit {

  form:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DraftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
    ) {
      this.form=this.fb.group({
        documentName:['',Validators.required],
        documentType:['Template',Validators.required],
        documentOwner:['',Validators.required]
      });
     }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close(false);
  }
  UploadFile(){
    console.log(this.form);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
    else{
      this.ShowValidationErrors(this.form);
    }
  }
  ShowValidationErrors(formGroup:FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
}

