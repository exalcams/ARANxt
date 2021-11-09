import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormArray, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { DraftDialogComponent } from '../draft-dialog/draft-dialog.component';
import { LeaseBankDetalis, LeaseManagement } from '../Model/Leasemanagement';
import { NotificationSnackBarComponent } from '../notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from '../notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseManagementService } from '../service/lease-management.service';
import * as moment from "moment"
@Component({
  selector: 'app-upload-signed-dialog',
  templateUrl: './upload-signed-dialog.component.html',
  styleUrls: ['./upload-signed-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UploadSignedDialogComponent implements OnInit {
  SignedDocumentDetailsForm: FormGroup;
  files:File[] =[];
  notificationSnackBarComponent: NotificationSnackBarComponent;
  modeoftransfer:any[]=["Cash","Online"];
  modetransfer_selected:any;
  date_input:any;
  noticePeriods:number[]=[1,2,3,4,5,6];
  currentDate:Date=new Date();
  NUMERIC_PATTREN = '^([0-9]{4,10})([.][0-9]{1,2})?$';
  NameFilter:any;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UploadSignedDialogComponent>,private service: LeaseManagementService, public snackBar: MatSnackBar,public _datePipe:DatePipe,   private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any, ) 
    {   
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    this.currentDate.setMonth(this.currentDate.getMonth()+1);
    }

  ngOnInit(): void {
    this.SignedFormGroup();
    if(this.data.clientdata)
    {
      console.log("clientdata",this.data);
      
      this.Initializeform();
    }
  }
  Initializeform()
  {
this.SignedDocumentDetailsForm.patchValue({
  Client:this.data.clientdata.clientName,
  FileName:this.data.clientdata.documentName,
  ExpiryDate:this.data.clientdata.expiryDate,
  TotalDeposit:this.data.clientdata.totalDeposit,
  BankName:this.data.clientdata.bankName,
  HolderName:this.data.clientdata.holderName,
  AccountNo:this.data.clientdata.accountNo,
  ModeofTransfer:this.data.clientdata.modeOfTransfer,
  IFSCCode:this.data.clientdata.ifsc,
  Maintenance:this.data.clientdata.manintenace,
  Electrical:this.data.clientdata.electrical,
  Condition:this.data.clientdata.condition,
  Remarks:this.data.clientdata.remarks,
  NoticePeriod:this.data.clientdata.noticePeriod,
  AccType:this.data.clientdata.accountType,
  SPOC:this.data.clientdata.spocPerson,
  SPOCMobile1:this.data.clientdata.contactNumber1,
  SPOCMobile2:this.data.clientdata.contactNumber2,
  SPOCMail1:this.data.clientdata.email1,
  SPOCMail2:this.data.clientdata.email2,
  Rental:this.data.clientdata.rental,

});
this.SignedDocumentDetailsForm.get("ModeofTransfer").setValue(this.data.clientdata.modeOfTransfer)
// this.SignedDocumentDetailsForm.disable();
  }
  SignedFormGroup(): void
{
  
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    Client: ['',Validators.required],
    FileName :  ['',[Validators.required]],
    // CreatedOn:['',[Validators.required,this.invalidDateValidatorFn]],
    ExpiryDate: ['',[Validators.required,this.invalidDateValidatorFn]],

    TotalDeposit : ['',[Validators.required,Validators.pattern('^([0-9]{4,100000})([.][0-9]{1,2})?$' )]],
    Rental: ['',[Validators.required,Validators.pattern('^([0-9]{4,100000})([.][0-9]{1,2})?$' )]],
    BankName: [''],
    HolderName : ['',[Validators.required]],
    AccountNo : ['',[Validators.required,Validators.pattern('^([0-9]{9,16})?$')]],
    ModeofTransfer : ['', Validators.required],
    IFSCCode : ['',[Validators.required,Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
    // AdvanceRequest : ['', Validators.required],
    Maintenance:['',[Validators.required,Validators.pattern('^([0-9]{4,100000})([.][0-9]{1,2})?$')]],
    Electrical: ['',Validators.required],
    // Validators.pattern('^[A-Za-z0-9 ]+$' )]
    Condition: [''],
    Remarks: [''],
    // NoticePeriod: ['',Validators.required],
    NoticePeriod: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
    AccType:['',Validators.required],
    SPOC:['',Validators.required],
    SPOCMobile1:['',Validators.required],
    SPOCMobile2:[''],
    SPOCMail1:['',[Validators.required,Validators.email]],
    SPOCMail2:['',Validators.email]
  });
  // this.SignedDocumentDetailsForm.get('IFSCCode').valueChanges.subscribe((value) => {
 
  //   if (value && value != "") {
  //     this.GetBankNameByBankCode(value);
  //   }
  // })
}
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
GetBankNameByBankCode()
{
  const a=this.SignedDocumentDetailsForm.get('IFSCCode').value
  this.service.GetBankNameByBankCode(a).subscribe((res:LeaseBankDetalis)=>{
    console.log("res",res);
    const bankName=res.bankName
    this.SignedDocumentDetailsForm.get("BankName").setValue(bankName);
  },
  err => {
    console.log(err);
    
  })
}

// Date_func(eve)
// {
//   let ptDatePattern =   /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
//        if (eve.target.value.match(ptDatePattern))
//         {
//           this.SignedDocumentDetailsForm.get("CreatedOn").setErrors({dt:true})
//         }
// else
// {
//   this.SignedDocumentDetailsForm.get("CreatedOn").markAsUntouched();
//   this.SignedDocumentDetailsForm.get("CreatedOn").valid;
//   this.SignedDocumentDetailsForm.get("CreatedOn").setErrors({dt:null})
// }
 

// }
onSelect(event): void {
  console.log(event);
  this.files=[];
  this.files.push(...event.addedFiles);
  this.SignedDocumentDetailsForm.get('FileName').setValue(this.files[0].name);
}
onRemove(event): void {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
  close(){
    this.dialogRef.close(false);
  }
  
  upload()
  {
    this.spinner.show();
    if(this.data.clientdata)
    {
      if((this.SignedDocumentDetailsForm.valid )  )
      {
        const signeddetail = new LeaseManagement();
      signeddetail.clientName = this.SignedDocumentDetailsForm.get('Client').value;
      signeddetail.documentName = this.SignedDocumentDetailsForm.get('FileName').value;
      const myDate = new Date();
      console.log("myDate",myDate);
      signeddetail.leaseID=this.data.clientdata.leaseID
      signeddetail.signedOn = this._datePipe.transform(myDate , 'dd-MM-yyyy');
      signeddetail.expiryDate = this._datePipe.transform(this.SignedDocumentDetailsForm.get('ExpiryDate').value, 'dd-MM-yyyy');
      signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
      signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
      signeddetail.manintenace = this.SignedDocumentDetailsForm.get('Maintenance').value;
      signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
      signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
      signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
      signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
      signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
      signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
      signeddetail.modeOfTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
      signeddetail.ifsc = this.SignedDocumentDetailsForm.get('IFSCCode').value;
      signeddetail.noticePeriod = this.SignedDocumentDetailsForm.get('NoticePeriod').value;
      signeddetail.accountType = this.SignedDocumentDetailsForm.get('AccType').value;
      signeddetail.spocPerson = this.SignedDocumentDetailsForm.get('SPOC').value;
      signeddetail.contactNumber1 = this.SignedDocumentDetailsForm.get('SPOCMobile1').value;
      signeddetail.contactNumber2 = this.SignedDocumentDetailsForm.get('SPOCMobile2').value;
      signeddetail.email1 = this.SignedDocumentDetailsForm.get('SPOCMail1').value;
      signeddetail.email2 = this.SignedDocumentDetailsForm.get('SPOCMail2').value;
      signeddetail.site =this.data.SiteId;
      signeddetail.space =this.data.SpaceId;
      signeddetail.asset=0;
  
     console.log("upload",signeddetail);
     
      this.service.UpdateLeaseByLeaseId(signeddetail).subscribe((x) => {
      this.SignedDocumentDetailsForm.reset();
        this.spinner.hide();
        this.notificationSnackBarComponent.openSnackBar('Uploaded  successfully', SnackBarStatus.success);
        this.dialogRef.close(true);
      
   
      },
        err => {
          this.spinner.hide();
          console.log(err);
  
        })
  
      }
      else if(!this.SignedDocumentDetailsForm.valid)
      {
        this.spinner.hide();
      // this.SignedDocumentDetailsForm.invalid;
      this.ShowValidationErrors(this.SignedDocumentDetailsForm);
      }
    }
    else{

    
    if((this.SignedDocumentDetailsForm.valid  )&&(this.files[0])  )
    {
      const signeddetail = new LeaseManagement();
    signeddetail.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetail.documentName = this.SignedDocumentDetailsForm.get('FileName').value;
    const myDate = new Date();
    console.log("myDate",myDate);
    
    signeddetail.signedOn = this._datePipe.transform(myDate , 'dd-MM-yyyy');
    signeddetail.expiryDate = this._datePipe.transform(this.SignedDocumentDetailsForm.get('ExpiryDate').value, 'dd-MM-yyyy');
    signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
    signeddetail.manintenace = this.SignedDocumentDetailsForm.get('Maintenance').value;
    signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
    signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
    signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
    signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
    signeddetail.modeOfTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
    signeddetail.ifsc = this.SignedDocumentDetailsForm.get('IFSCCode').value;
    signeddetail.noticePeriod = this.SignedDocumentDetailsForm.get('NoticePeriod').value;
    signeddetail.accountType = this.SignedDocumentDetailsForm.get('AccType').value;
    signeddetail.spocPerson = this.SignedDocumentDetailsForm.get('SPOC').value;
    signeddetail.contactNumber1 = this.SignedDocumentDetailsForm.get('SPOCMobile1').value;
    signeddetail.contactNumber2 = this.SignedDocumentDetailsForm.get('SPOCMobile2').value;
    signeddetail.email1 = this.SignedDocumentDetailsForm.get('SPOCMail1').value;
    signeddetail.email2 = this.SignedDocumentDetailsForm.get('SPOCMail2').value;
    signeddetail.site =this.data.SiteId;
    signeddetail.space =this.data.SpaceId;
    signeddetail.asset=0;

   console.log("upload",signeddetail);
   
    this.service.AddSignedFileDetail(signeddetail,this.files[0]).subscribe((x) => {
    this.SignedDocumentDetailsForm.reset()
      this.spinner.hide();
      this.notificationSnackBarComponent.openSnackBar('Uploaded  successfully', SnackBarStatus.success);
      this.dialogRef.close(true);
    
 
    },
      err => {
        this.spinner.hide();
        console.log(err);

      })

    }
    else if(!this.files[0] && this.SignedDocumentDetailsForm.valid)
  {
    this.spinner.hide();
    this.notificationSnackBarComponent.openSnackBar('File need to be Uploaded', SnackBarStatus.warning);
  }
  else if(!this.SignedDocumentDetailsForm.valid)
  {
    this.spinner.hide();
  // this.SignedDocumentDetailsForm.invalid;
  this.ShowValidationErrors(this.SignedDocumentDetailsForm);
  }
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
  decimalOnlyWithoutDot(event): boolean {
    // this.AmountSelected();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 46
      || charCode === 37 || charCode === 39 || charCode === 123 ) {
      return true;
    }
    else if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }
  AlphabetsonlyOnly(event): boolean {
    // this.AmountSelected();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 46
      || charCode === 37 || charCode === 39 || charCode === 123 || charCode === 190 || charCode === 32) {
      return true;
    }
    else if (charCode < 65 || charCode > 90) {
      return false;
    }
    return true;
  }
  AlphabetsAndDecimalonlyOnly(event): boolean {
    let ptDatePattern = "^[A-Za-z0-9 ]+$"
    const val=this.SignedDocumentDetailsForm.get("Electrical").value;
    if (event.key.match(ptDatePattern))
            {
              return true;
            }
            else
            {
              return false;
            }
    // const charCode = (event.which) ? event.which : event.keyCode;
    // console.log("charCode",charCode);
    
    // if ((charCode >=48 && charCode <=57) || (charCode >=65 && charCode <=90) ||charCode === 8)  {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    

  }
  CustomDateValidator(control: FormControl): ValidationErrors | null {

    const format = "MM/dd/YYYY";
  
    const val = moment(control.value, format, true);
  
  
  
    if (!val.isValid()) {
  
      return { invalidDate: true };
  
    }
  
    return null;
  
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
}
