import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement } from 'src/app/Model/Leasemanagement';

@Component({
  selector: 'app-vacatecomponent',
  templateUrl: './vacatecomponent.component.html',
  styleUrls: ['./vacatecomponent.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class VacatecomponentComponent implements OnInit {
  Vacateformgroup: FormGroup;
  toppings = new FormControl();
  leaseData:LeaseManagement=new LeaseManagement();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(public dialogRef: MatDialogRef<VacatecomponentComponent>,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.leaseData=this.data;
      console.log("dialogData",this.leaseData)
      
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
    Proposeddate: ['',Validators.required],
    Accepteddate : ['',Validators.required],
    Inspectiondate: ['',Validators.required],
    Inspectedby: ['',Validators.required],
    Rentdue: ['',Validators.required],
    Maintenancedue: ['',Validators.required],
    DamageRecovery: ['',Validators.required],
    AdvanceBalance: ['',Validators.required],
    ExpectedDate: ['',Validators.required],
    Modeoftransfer : ['',Validators.required],
    ReturnableAssets : ['',Validators.required],
    Verifiedby : ['',Validators.required],
    Remarks: ['',Validators.required],
  });
}


}
