import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseManagement } from 'src/app/Model/Leasemanagement';
import { ShiftConfirmationComponent } from '../shift-confirmation/shift-confirmation.component';

@Component({
  selector: 'app-terminatecomponent',
  templateUrl: './terminatecomponent.component.html',
  styleUrls: ['./terminatecomponent.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TerminatecomponentComponent implements OnInit {
  form: FormGroup;
  toppings = new FormControl();
  leaseData:LeaseManagement=new LeaseManagement();
  toppingList: string[] = ['Chairs', 'Table', 'AC Units', 'Remot Control', 'Fridge'];
  constructor(public dialogRef: MatDialogRef<TerminatecomponentComponent>,private formBuilder: FormBuilder,public dialog:MatDialog,
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
  this.form = this.formBuilder.group({
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
openShiftDialog() {
  const dialogRef = this.dialog.open(ShiftConfirmationComponent,{
    panelClass: 'upload-signed-dialog',
    // position: { top: '3%', right: '3%' },
    width: '61%',
    maxWidth: '85.5vw ',
    height: '80%',

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
