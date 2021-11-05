import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shift-confirmation',
  templateUrl: './shift-confirmation.component.html',
  styleUrls: ['./shift-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftConfirmationComponent implements OnInit {

  formoptions = new FormControl();
  fromToOptions: string[] = ["India Land"];
  @Output() public found = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<ShiftConfirmationComponent>, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.fromToOptions.push(data);
  }
  ShiftConformationForm: FormGroup;

  ngOnInit(): void {
    this.SignedFormGroup();
  }
  close() {
    this.dialogRef.close(false);
  }
  SignedFormGroup(): void {
    this.ShiftConformationForm = this.formBuilder.group({
      Penalty: ['', [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,10})([.][0-9]{1,2})?$/)]],
      From: ['', Validators.required],
      To:[''],
      Remarks: ['']
    });
    this.ShiftConformationForm.get('From').valueChanges.subscribe((value)=>{
      this.ShiftConformationForm.get('To').setValue(this.fromToOptions.filter(x=>x!=value)[0]);
    });
  }
// validation codes
  nameValidator(control: FormControl): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  decimalOnly(event): boolean {
    // this.AmountSelected();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 46
      || charCode === 37 || charCode === 39 || charCode === 123 || charCode === 190) {
      return true;
    }
    else if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }
  // validation codes


  Save() {
    if (this.ShiftConformationForm.valid) {
      console.log(this.ShiftConformationForm.value);
      this.dialogRef.close(this.ShiftConformationForm.value);
    }
    else {
      this.ShowValidationErrors(this.ShiftConformationForm);
    }
  }
  ShowValidationErrors(Vacateformgroup: FormGroup): void {
    Object.keys(Vacateformgroup.controls).forEach(key => {
      Vacateformgroup.get(key).markAsTouched();
      Vacateformgroup.get(key).markAsDirty();
    });
  }
}
