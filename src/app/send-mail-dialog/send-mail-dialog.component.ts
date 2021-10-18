import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips/chip-input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
  styleUrls: ['./send-mail-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SendMailDialogComponent implements OnInit {

  form: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<SendMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      toMail: [[], [Validators.required,Validators.email],],
      cc: [[],Validators.email],
      bcc: [[],Validators.email],
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
  get toList() {
    return this.form.get('toMail');
  }
  get ccList() {
    return this.form.get('cc');
  }
  get bccList() {
    return this.form.get('bcc');
  }
  add(event: MatChipInputEvent,control:string): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if(control=="to"){
        this.toList.setValue([...this.toList.value, value.trim()]);
        this.toList.updateValueAndValidity();
      }
      else if(control=="cc"){
        this.ccList.setValue([...this.ccList.value, value.trim()]);
        this.ccList.updateValueAndValidity();
      }
      else if(control=="bcc"){
        this.bccList.setValue([...this.bccList.value, value.trim()]);
        this.bccList.updateValueAndValidity();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  remove(item: string,control:string): void {
    if(control=="to"){
      const index = this.toList.value.indexOf(item);
      if (index >= 0) {
        this.toList.value.splice(index, 1);
        this.toList.updateValueAndValidity();
      }
    }
    else if(control=="cc"){
      const index = this.ccList.value.indexOf(item);
      if (index >= 0) {
        this.ccList.value.splice(index, 1);
        this.ccList.updateValueAndValidity();
      }
    }
    else if(control=="bcc"){
      const index = this.bccList.value.indexOf(item);
      if (index >= 0) {
        this.bccList.value.splice(index, 1);
        this.bccList.updateValueAndValidity();
      }
    }
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
