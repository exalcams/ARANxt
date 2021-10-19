import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LeaseManagement, LeaseVacate } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-vacatecomponent',
  templateUrl: './vacatecomponent.component.html',
  styleUrls: ['./vacatecomponent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacatecomponentComponent implements OnInit {

  Vacateformgroup: FormGroup;
  toppings = new FormControl();
  fromToOptions: string[] = ["person1", "person2"];
  modeoftransferoptions:string[]=["Cash","Online"];
  notificationSnackBarComponent: NotificationSnackBarComponent;
  leaseData: LeaseManagement = new LeaseManagement();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<VacatecomponentComponent>, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: LeaseManagementService, public snackBar: MatSnackBar, private _datePipe: DatePipe,) {
    this.leaseData = this.data;
    console.log("dialogData", this.leaseData),
      this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }
  ngOnInit(): void {
    this.SignedFormGroup();
  }

  Close(): void {
    this.dialogRef.close();
  }
  // VacatecomponentComponent.Date
  SignedFormGroup(): void {
    this.Vacateformgroup = this.formBuilder.group({
      Proposeddate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Accepteddate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Inspectiondate: ['', [Validators.required,this.invalidDateValidatorFn]],
      Inspectedby: ['', Validators.required],
      Rentdue: ['',  [Validators.required, this.nameValidator,Validators.pattern(/^([0-9]{4,100})([.][0-9]{1,2})?$/)]],
      Maintenancedue: ['', [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,100})([.][0-9]{1,2})?$/)]],
      DamageRecovery: ['',  [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,100})([.][0-9]{1,2})?$/)]],
      AdvanceBalance: ['',  [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,100})([.][0-9]{1,2})?$/)]],
      ExpectedDate: ['', [Validators.required,this.invalidDateValidatorFn]],
      Modeoftransfer: ['', Validators.required],
      ReturnableAssets: ['', Validators.required],
      Verifiedby: ['', Validators.required],
      Remarks: ['', Validators.required],
    });
  }

//  validation codes
  static Date(control: FormControl): { [key: string]: any } {
    let ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    if (!control.value.match(ptDatePattern))
      return { ptDate: true };
    return null;
  }
  nameValidator(control: FormControl): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  static Dateasync(eve): { [key: string]: any } {
    let ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    if (!eve.value.match(ptDatePattern))
      return { ptDate: true };
    return null;
  }
  // invalidDateValidatorFn(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     const date = new Date(control.value);
  //     const invalidDate = !control.value || date.getMonth === undefined;
  //     return invalidDate ? { 'invalidDate': { value: control.value } } : null;
  //   };
  // }
  invalidDateValidatorFn(): ValidatorFn {
    let invalidDate
    var a =  (control: AbstractControl): { [key: string]: any } => {
      const date = new Date(control.value);
      invalidDate= !control.value || date.getMonth === undefined;
      return invalidDate ? { 'invalidDate': { value: control.value } } : null;
    };
    console.log("invaliddate",invalidDate);
  return a
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
  // Only Integer Numbers ((charCode === 65 || charCode === 66 || charCode ===67 || charCode === 68 || charCode ===69
      // || charCode === 70 || charCode ===71 || charCode === 72 || charCode ===73 || charCode === 74 || charCode ===75
      // || charCode === 76 || charCode ===77 || charCode === 78 || charCode ===79 || charCode === 80 || charCode ===81
      // || charCode === 82 || charCode ===83 || charCode === 84 || charCode ===85 || charCode === 86 || charCode ===87
      // || charCode === 88 || charCode ===89 || charCode ===90))
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57 )) {
      event.preventDefault();
      return false;
    } else {
      //  if ((charCode >= 32 || charCode <= 47)){
      //   return true;
      // }
      return true;
    }
  }
 // validation codes


  Postvacatedetails() {
    if (this.Vacateformgroup.valid) {
      this.spinner.show();
      const signeddetail = new LeaseVacate();
      signeddetail.leaseID=this.leaseData.leaseID;
      signeddetail.proposedDate = this._datePipe.transform(this.Vacateformgroup.get('Proposeddate').value, 'yyyy-MM-dd');
      signeddetail.acceptedDate = this._datePipe.transform(this.Vacateformgroup.get('Accepteddate').value, 'yyyy-MM-dd');
      signeddetail.inspectionDate = this._datePipe.transform(this.Vacateformgroup.get('Inspectiondate').value, 'yyyy-MM-dd');
      signeddetail.inspectedBy = this.Vacateformgroup.get('Inspectedby').value;
      signeddetail.rentDue = this.Vacateformgroup.get('Rentdue').value;
      signeddetail.maintenanceDue = this.Vacateformgroup.get('Maintenancedue').value;
      signeddetail.damageRecovery = this.Vacateformgroup.get('DamageRecovery').value;
      signeddetail.advanceBalance = this.Vacateformgroup.get('AdvanceBalance').value;
      signeddetail.dateToTransfer = this.Vacateformgroup.get('ExpectedDate').value;
      signeddetail.modeOfTransfer = this.Vacateformgroup.get('Modeoftransfer').value;
      let assets=this.Vacateformgroup.get('ReturnableAssets').value;
      let assetString="";
      for (let i = 0; i < assets.length; i++) {
        if(i!=assets.length-1){
          assetString+=assets[i]+",";
        }
        else{
          assetString+=assets[i];
        }
      }
      signeddetail.returnableAssets = assetString;
      signeddetail.verifiedBy = this.Vacateformgroup.get('Verifiedby').value;
      signeddetail.remarks = this.Vacateformgroup.get('Remarks').value;
      this.service.VocateLease(signeddetail).subscribe((x) => {
        this.spinner.hide();
        console.log("vacate uploaded");
        this.Vacateformgroup.reset();
        
        this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
        this.dialogRef.close();
     
      },
        err => {
          console.log(err);
          this.spinner.hide();
        })
    }
    else {
      this.ShowValidationErrors(this.Vacateformgroup);
    }
  }

  ShowValidationErrors(Vacateformgroup: FormGroup): void {
    Object.keys(Vacateformgroup.controls).forEach(key => {
      Vacateformgroup.get(key).markAsTouched();
      Vacateformgroup.get(key).markAsDirty();
    });
  }

  get assets() {
    return this.Vacateformgroup.get('ReturnableAssets');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.assets.setValue([...this.assets.value, value.trim()]);
        this.assets.updateValueAndValidity();
    }
    if (input) {
      input.value = '';
    }
  }

  remove(item: string): void {
    const index = this.assets.value.indexOf(item);
      if (index >= 0) {
        this.assets.value.splice(index, 1);
        this.assets.updateValueAndValidity();
      }
  }
}
