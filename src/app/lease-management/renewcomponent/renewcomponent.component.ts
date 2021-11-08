import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement, LeaseRenew } from 'src/app/Model/Leasemanagement';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { saveAs } from 'file-saver';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-renewcomponent',
  templateUrl: './renewcomponent.component.html',
  styleUrls: ['./renewcomponent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RenewcomponentComponent implements OnInit {
  Vacateformgroup: FormGroup;
  toppings = new FormControl();

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
  selectedDocId: number;
  selecteddocName: any;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  newbool: boolean;
  constructor(public dialogRef: MatDialogRef<RenewcomponentComponent>, public snackBar: MatSnackBar, private service: LeaseManagementService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.leaseData = this.data;
    this.leaseID = this.data.leaseID;
    console.log("dialogData", this.leaseData);
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    
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
      RenewOn: ['',[Validators.required,this.invalidDateValidatorFn]],
      Validfor: ['',Validators.required],
      NewExpiryDate: [''],
      RevisedRent: ['',[Validators.pattern('^([0-9]{4,10})([.][0-9]{1,2})?$')]],
      Revisedratio: [''],
      Remarks: ['']
    });
    this.Vacateformgroup.get('Validfor').valueChanges.subscribe((value) => {
      console.log("validforchange",this.Vacateformgroup.value);
      if (value && value != "" && !this.newbool && value<=36 &&value>=6) {
        this.ExpiryCalculation(value);
      }
      else{
        this.Vacateformgroup.get('Validfor').setErrors({qt:true});
      }
    });
    this.Vacateformgroup.get('NewExpiryDate').disable();
  }
  
  selectedIndex: any;
  public setRow(_index: number) {
    this.selectedIndex = _index;
  }
  monthvalidation():ValidatorFn
  {
    let invalidmonth;

    var a =  (control: AbstractControl): { [key: string]: any } => {
   
       const date = new Date(control.value);
   
       invalidmonth= !control.value ||control.value>=6||control.value<=36;
       console.log("invalidmonth",invalidmonth);
       
     
       return invalidmonth ? { 'invalidmonth': { value: control.value } } : null;
   
     };
     console.log("invaliddate",invalidmonth);
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
  invalidDateValidatorFn(): ValidatorFn {
    let invalidDate;

   var a =  (control: AbstractControl): { [key: string]: any } => {
  
      const date = new Date(control.value);
  
      invalidDate= !control.value || date.getMonth === undefined;
    
      return invalidDate ? { 'invalidDate': { value: control.value } } : null;
  
    };
    console.log("invaliddate",invalidDate);
  return a
  }
  Renew(): void {
    const renew = new LeaseRenew();
    renew.leaseID = this.leaseID;
    renew.renewedOn = this.Vacateformgroup.get('RenewOn').value;
    renew.expiryDate = this.Vacateformgroup.get('NewExpiryDate').value;
    renew.validFor = this.Vacateformgroup.get('Validfor').value;
    renew.revisedRent = this.Vacateformgroup.get('RevisedRent').value;
    renew.revisedRatio = this.Vacateformgroup.get('Revisedratio').value;
   
      renew.renewalID=this.renewalById.length;

    
    if ((this.Vacateformgroup.valid) && (this.files)) {
      this.service.RenewLease(renew, this.files).subscribe((x) => {
        console.log(x);        
        this.Vacateformgroup.reset();
        this.notificationSnackBarComponent.openSnackBar('Renewed Sucessfully', SnackBarStatus.success);
        this.GetLeaseRenewals();
        this.filename=""
        this.dialogRef.close(true);
      },
        err => {
          console.log(err);

        })
    }
    else if (!this.files && this.Vacateformgroup.valid) {
      this.notificationSnackBarComponent.openSnackBar('plaese upload document', SnackBarStatus.warning);
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

  ExpiryCalculation(value: string): void {

    let months =  Number(value);
    let renew=null;
    renew= this.Vacateformgroup.get("RenewOn").value;
    let newdate = new Date();
    console.log("renew",renew);
    
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
  loadData(row: LeaseRenew,docName:any): void {
    console.log("loaddata call",row);
  this.newbool=true
    this.selectedID = row.renewalID;
  this.selectedDocId=row.documentID;
this.selecteddocName=docName;

 
      this.Vacateformgroup.patchValue({
        RenewOn: row.renewedOn,
        Validfor: row.validFor,
        NewExpiryDate: row.expiryDate,
        RevisedRent: row.revisedRent,
        Revisedratio: row.revisedRatio,

      });
      this.Vacateformgroup.disable();
      this.filename=docName;
    
  
  }
  DownloadLeaseDocument()
{
 
      this.service.DownloadLeaseDocument(this.selectedDocId).subscribe((res)=>{
       
        let blob:any = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(blob, `${this.selecteddocName}.pdf`);
        console.log(`${this.selecteddocName} downloaded`);
      },
      err=>{
        console.log(err);
      });
}
  newlease(): void {
    this.Vacateformgroup.enable();
    this.Vacateformgroup.reset();
    console.log("newlease",this.Vacateformgroup.get("RenewOn").value);
    
    this.selectedID = null;
    this.newbool=false;
    this.filename=null;
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
