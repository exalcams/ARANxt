import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement, LeaseRenew } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseManagementService } from 'src/app/service/lease-management.service';

@Component({
  selector: 'app-renewcomponent',
  templateUrl: './renewcomponent.component.html',
  styleUrls: ['./renewcomponent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RenewcomponentComponent implements OnInit {
  Vacateformgroup: FormGroup;
  toppings = new FormControl();
  notificationSnackBarComponent: NotificationSnackBarComponent;
  leaseData: LeaseManagement = new LeaseManagement();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  leaseID: any;
  send_date: Date;
  formattedDate: any;
  validMonths: any;
  renewed_Input: Date;
  renewalById: LeaseRenew[] = [];
  selectedID: number;
  files: any;
  filename: any;
  i: number = 0;
  constructor(public dialogRef: MatDialogRef<RenewcomponentComponent>, private service: LeaseManagementService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.leaseData = this.data;
    this.leaseID = this.data.leaseID;
    console.log("dialogData", this.leaseData);
  }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetLeaseRenewals();
  }

  Close(): void {
    this.dialogRef.close();
  }
  GetLeaseRenewals(): void {
    this.service.GetLeaseRenewals(this.leaseID).subscribe((data) => {
      this.renewalById = <LeaseRenew[]>data;
      if (this.renewalById.length > 0) {
        // this.loadData(this.renewalById[0]);
      }
      console.log("renewalById", this.renewalById);

    },
      err => {
        console.log(err);
        // this.spinner.hide();
      });

  }
  SignedFormGroup(): void {
    this.Vacateformgroup = this.formBuilder.group({
      RenewOn: ['', Validators.required],
      Validfor: ['', Validators.required],
      NewExpiryDate: ['', Validators.required],
      RevisedRent: ['', Validators.required],
      Revisedratio: ['', Validators.required],
      Remarks: ['', Validators.required]
    });
    this.Vacateformgroup.get('Validfor').valueChanges.subscribe((value) => {
      console.log(this.Vacateformgroup.value);
      if (value && value != "") {
        this.ExpiryCalculation(value);
      }
    })
  }
  selectedIndex: any;
  public setRow(_index: number) {
    this.selectedIndex = _index;
  }

  Renew(): void {
    const renew = new LeaseRenew();
    renew.leaseID = this.leaseID;
    renew.renewedOn = this.Vacateformgroup.get('RenewOn').value;
    renew.expiryDate = this.Vacateformgroup.get('NewExpiryDate').value;
    renew.validFor = this.Vacateformgroup.get('Validfor').value;
    renew.revisedRent = this.Vacateformgroup.get('RevisedRent').value;
    renew.revisedRatio = this.Vacateformgroup.get('Revisedratio').value;

    if ((this.Vacateformgroup.valid) && (this.files)) {
      this.service.RenewLease(renew, this.files).subscribe((x) => {
        console.log(x);
        this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
        this.Vacateformgroup.reset();

      },
        err => {
          console.log(err);

        })
    }
    else if (!this.files && this.Vacateformgroup.valid) {
      this.notificationSnackBarComponent.openSnackBar('File need to be Uploaded', SnackBarStatus.danger);
    }
    else if (!this.Vacateformgroup.valid) {
      this.Vacateformgroup.setErrors({ item: true })
      // this.SignedDocumentDetailsForm.invalid;
      this.ShowValidationErrors(this.Vacateformgroup);
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

  ExpiryCalculation(value: number): void {

    let months = value;
    let renew = this.Vacateformgroup.get("RenewOn").value;
    let newdate = new Date();
    newdate.setDate(renew.getDate());
    newdate.setMonth(newdate.getMonth() + months);
    let formattedDate = newdate.toISOString().slice(0, 10);
    console.log(formattedDate);
    this.Vacateformgroup.get("NewExpiryDate").setValue(formattedDate);

  }


  handleFileInput(event): void {
    this.files = event.target.files[0];
    this.filename = event.target.files[0].name;
    console.log("this.files", this.files);

  }
  loadData(row: LeaseRenew): void {
    console.log("loaddata call");

    this.selectedID = row.renewalID;
    this.Vacateformgroup.patchValue({
      RenewOn: row.renewedOn,
      Validfor: row.validFor,
      NewExpiryDate: row.expiryDate,
      RevisedRent: row.revisedRent,
      Revisedratio: row.revisedRatio
    });
  }
  newlease(): void {
    this.Vacateformgroup.reset();
    this.selectedID = null;
  }

  GetRemainingDays(expiry) {
    let today = new Date();
    var diff = Math.floor(new Date(expiry).getTime() - today.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    // var months = Math.floor(days/31);
    // var years = Math.floor(months/12);
    return days;
  }

}
