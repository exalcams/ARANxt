import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement, LeaseTerminate } from 'src/app/Model/Leasemanagement';
import { ShiftConfirmationComponent } from '../shift-confirmation/shift-confirmation.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatChipInputEvent } from '@angular/material/chips';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
@Component({
  selector: 'app-terminatecomponent',
  templateUrl: './terminatecomponent.component.html',
  styleUrls: ['./terminatecomponent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TerminatecomponentComponent implements OnInit {
  Terminateformgroup: FormGroup;
  toppings = new FormControl();
  fromToOptions: string[] = ["person1", "person2"];
  modeoftransferoptions:string[]=["Cash","Online"]
  notificationSnackBarComponent: NotificationSnackBarComponent;
  leaseData: LeaseManagement = new LeaseManagement();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  shiftConfirmation;
  constructor(public dialogRef: MatDialogRef<TerminatecomponentComponent>, private formBuilder: FormBuilder, public dialog: MatDialog, private spinner: NgxSpinnerService,
    private service: LeaseManagementService, public snackBar: MatSnackBar, private _datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar)
    this.leaseData = this.data;
    console.log("dialogData", this.leaseData)
  }
  ngOnInit(): void {
    this.SignedFormGroup();
  }
  Close(): void {
    this.dialogRef.close();
  }
  SignedFormGroup(): void {
    this.Terminateformgroup = this.formBuilder.group({
      Proposeddate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Accepteddate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Inspectiondate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Inspectedby: ['', Validators.required],
      Rentdue: ['',  [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,10})([.][0-9]{1,2})?$/)]],
      Maintenancedue: ['', [Validators.required, this.nameValidator, Validators.pattern(/^([0-9]{4,10})([.][0-9]{1,2})?$/)]],
      DamageRecovery: ['',  [Validators.required, this.nameValidator,Validators.pattern(/^([0-9]{4,10})([.][0-9]{1,2})?$/)]],
      AdvanceBalance: ['',  [Validators.required, this.nameValidator,Validators.pattern(/^([0-9]{4,10})([.][0-9]{1,2})?$/)]],
      ExpectedDate: ['', [Validators.required, this.invalidDateValidatorFn]],
      Modeoftransfer: ['', Validators.required],
      ReturnableAssets: ['', Validators.required],
      Verifiedby: ['', Validators.required],
      Remarks: ['', Validators.required],
    });
  }
  // ,Validators.pattern(/^[0-9]*$/)
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

  invalidDateValidatorFn(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const date = new Date(control.value);
      const invalidDate = !control.value || date.getMonth === undefined;
      return invalidDate ? { 'invalidDate': { value: control.value } } : null;
    };
  }
  openShiftDialog() {
    const dialogRef = this.dialog.open(ShiftConfirmationComponent, {
      panelClass: 'upload-signed-dialog',
      data: this.leaseData.clientName,
      width: '630px',
      // maxWidth: '85.5vw ',
      // height: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shiftConfirmation = result;
        console.log("shift dialog data", result);
        this.Postterminatedetails(true);
      }
    });
  }
  Postterminatedetails(isShift: boolean = false) {
    if (this.Terminateformgroup.valid) {
      this.spinner.show();
      const signeddetail = new LeaseTerminate();
      signeddetail.leaseID = this.leaseData.leaseID;
      signeddetail.proposedDate = this._datePipe.transform(this.Terminateformgroup.get('Proposeddate').value, 'yyyy-MM-dd');
      signeddetail.acceptedDate = this._datePipe.transform(this.Terminateformgroup.get('Accepteddate').value, 'yyyy-MM-dd');
      signeddetail.inspectionDate = this._datePipe.transform(this.Terminateformgroup.get('Inspectiondate').value, 'yyyy-MM-dd');
      signeddetail.inspectedBy = this.Terminateformgroup.get('Inspectedby').value;
      signeddetail.rentDue = this.Terminateformgroup.get('Rentdue').value;
      signeddetail.maintenanceDue = this.Terminateformgroup.get('Maintenancedue').value;
      signeddetail.damageRecovery = this.Terminateformgroup.get('DamageRecovery').value;
      signeddetail.advanceBalance = this.Terminateformgroup.get('AdvanceBalance').value;
      signeddetail.dateToTransfer = this.Terminateformgroup.get('ExpectedDate').value;
      signeddetail.modeOfTransfer = this.Terminateformgroup.get('Modeoftransfer').value;
      let assets = this.Terminateformgroup.get('ReturnableAssets').value;
      let assetString = "";
      for (let i = 0; i < assets.length; i++) {
        if (i != assets.length - 1) {
          assetString += assets[i] + ",";
        }
        else {
          assetString += assets[i];
        }
      }
      signeddetail.returnableAssets = assetString;
      if (isShift) {
        signeddetail.penaltyAmount = this.shiftConfirmation.Penalty;
        signeddetail.penaltyFrom = this.shiftConfirmation.From;
        signeddetail.penaltyTo = this.shiftConfirmation.To;
        signeddetail.isShift = true;
      }
      signeddetail.isShift = isShift;
      signeddetail.verifiedBy = this.Terminateformgroup.get('Verifiedby').value;
      signeddetail.remarks = this.Terminateformgroup.get('Remarks').value;
      this.service.TerminateLease(signeddetail).subscribe((x) => {
        this.spinner.hide();
        console.log("Terminate uploaded", signeddetail);
        this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
        this.dialogRef.close()
      },
        err => {
          console.log(err);
          this.spinner.hide();
        })
    }
    else {
      this.ShowValidationErrors(this.Terminateformgroup);
    }
  }
  ShowValidationErrors(Vacateformgroup: FormGroup): void {
    Object.keys(Vacateformgroup.controls).forEach(key => {
      Vacateformgroup.get(key).markAsTouched();
      Vacateformgroup.get(key).markAsDirty();
    });
  }
  get assets() {
    return this.Terminateformgroup.get('ReturnableAssets');
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
