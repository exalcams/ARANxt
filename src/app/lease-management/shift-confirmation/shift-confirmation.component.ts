import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shift-confirmation',
  templateUrl: './shift-confirmation.component.html',
  styleUrls: ['./shift-confirmation.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShiftConfirmationComponent implements OnInit {

  formoptions=new FormControl();
  fromToOptions:string[]=["India Land"];
  @Output() public found = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<ShiftConfirmationComponent>,private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
      this.fromToOptions.push(data);
    }
    ShiftConformationForm: FormGroup;

  ngOnInit(): void {
    this.SignedFormGroup();
  }
  close(){
    this.dialogRef.close(false);
  }
  SignedFormGroup(): void
{
  this.ShiftConformationForm = this.formBuilder.group({
    Penalty: ['', Validators.required],
    From:['',Validators.required],
    To:['',Validators.required],
    Remarks:['',Validators.required]
  });
}
Save(){
  if(this.ShiftConformationForm.valid){
    console.log(this.ShiftConformationForm.value);
    this.dialogRef.close(this.ShiftConformationForm.value);
  }
  else{
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
