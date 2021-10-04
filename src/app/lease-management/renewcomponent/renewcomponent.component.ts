import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';

@Component({
  selector: 'app-renewcomponent',
  templateUrl: './renewcomponent.component.html',
  styleUrls: ['./renewcomponent.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RenewcomponentComponent implements OnInit {
  Vacateformgroup: FormGroup;
  toppings = new FormControl();
  notificationSnackBarComponent: NotificationSnackBarComponent;
  leaseData:LeaseManagement=new LeaseManagement();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(public dialogRef: MatDialogRef<RenewcomponentComponent>,private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.leaseData=this.data;
    console.log("dialogData",this.leaseData);
   }

  ngOnInit(): void {
    this.SignedFormGroup();
  }

  Close():void{
    this.dialogRef.close();
  }
  SignedFormGroup(): void
{
  this.Vacateformgroup = this.formBuilder.group({
    RenewOn: ['',Validators.required],
    Validfor : ['',Validators.required],
    NewExpiryDate: ['',Validators.required],
    RevisedRent: ['',Validators.required],
    Revisedratio: ['',Validators.required],
    Remarks: ['',Validators.required],
    
  });
}
selectedIndex:any;
public setRow(_index: number) {
  this.selectedIndex = _index;}


// renewsnackbar(){

//   this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.warning);
// }

}
