import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips/chip-input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
  styleUrls: ['./send-mail-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SendMailDialogComponent implements OnInit {

  form: FormGroup;
  ccList = new Set([]);
  bccList = new Set([]);
  removable:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<SendMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      toMail: ['', [Validators.required,Validators.email]],
      cc: [''],
      bcc: [''],
      subject: [''],
      body: [''],
      documentID: [this.data.documentID]
    });
    this.form.get('cc').setErrors({mail:true});
    console.log(this.data);
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close(false);
  }
  addCCFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.ccList.add(event.value);
      event.input.value="";
    }
  }

  removeCC(cc: string) {
    this.ccList.delete(cc);
  }

  addBCCFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.bccList.add(event.value);
      event.input.value="";
    }
  }

  removeBCC(bcc: string) {
    this.bccList.delete(bcc);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  sendMail(){
    console.log(this.form);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
    else{
      this.ShowValidationErrors(this.form);
    }
  }
}
