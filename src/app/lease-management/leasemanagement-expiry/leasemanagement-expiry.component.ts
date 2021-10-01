import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-leasemanagement-expiry',
  templateUrl: './leasemanagement-expiry.component.html',
  styleUrls: ['./leasemanagement-expiry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeasemanagementExpiryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action'];
  clientdata: LeaseManagement;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  selectedRowIndex: any;
  selectedRowIndex2 = -1;
  
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];
  Mlease:LeaseManagement[]=[];
  Mleasebinddata:LeaseManagement[]=[];
  SelectedSpace:LeaseManagement=new LeaseManagement();
  Mget:LeaseManagement[]=[];
  days=new Date();
  valuetable :boolean = true;
  valueupload :boolean = false;
  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  constructor(private formBuilder: FormBuilder, private spinner:NgxSpinnerService, private datepipe: DatePipe, private service:LeaseManagementService) { }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetExpiryLeases()
  }

  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle(): any {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any, i?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Documentname + 1}`;
  }
  highlight(row): any {
    this.selectedRowIndex = row.position;
  }
  updateCheckedList(event, index): void {
    if (event.checked)
    {
      // console.log('update', ELEMENT_DATA[index]);

    }
  }
  // uploadDocument(): void {
  //   if (this.btn_name === 'Upload Document') {
  //     this.btn_name = 'Cancel';
  //   }
  //   else if (this.btn_name === 'Cancel')
  //   {
  //     this.btn_name = 'Upload Document';
  //   }
  // }
SignedFormGroup(): void
{
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    ClientName: [''],
    FileName : [''],
    CreationDate: [''],
    ExpiryDate: [''],
    TotalDeposit : [''],
    Rental: [''],
    Maintenance: [''],
    Electrical: [''],
    Condition: [''],
    Remarks: [''],
  });
}
loadallsigneddocuments(Mlease:LeaseManagement){
  this.SelectedSpace =Mlease;
  console.log("selected",this.SelectedSpace)
  this.SignedDocumentDetailsForm.get('ClientName').setValue(this.SelectedSpace.clientName);
  this.SignedDocumentDetailsForm.get('FileName').setValue(this.SelectedSpace.documentName);
  this.SignedDocumentDetailsForm.get('CreationDate').setValue(this.SelectedSpace.createdOn);
  this.SignedDocumentDetailsForm.get('ExpiryDate').setValue(this.SelectedSpace.expiryDate);
  this.SignedDocumentDetailsForm.get('TotalDeposit').setValue(this.SelectedSpace.totalDeposit);
  this.SignedDocumentDetailsForm.get('Rental').setValue(this.SelectedSpace.rental);
  this.SignedDocumentDetailsForm.get('Maintenance').setValue(this.SelectedSpace.manintenace);
  this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  this.SignedDocumentDetailsForm.get('Condition').setValue(this.SelectedSpace.condition);
  this.SignedDocumentDetailsForm.get('Remarks').setValue(this.SelectedSpace.remarks);
 
}


// // not used func
// GetSpaceValues() {
//   this.SelectedSpace.client = this.SignedDocumentDetailsForm.get('ClientName').value;
// }


GetExpiryLeases(){
  this.spinner.show();
  this.service.GetExpiryLeases().subscribe((data)=>{
    this.Mlease=<any[]>data;
    console.log(data);
    this.dataSource=new MatTableDataSource(this.Mlease);
    if(this.Mlease.length>0){
      this.loadallsigneddocuments(this.Mlease[0]);
    }
    this.allplaces(this.Mlease);
    console.log(this.Mlease)
    this.spinner.hide();
  },
  err=>{
    console.log(err);
    this.spinner.hide();
  });
  this.Mleasebinddata = this.Mlease
  console.log(this.Mleasebinddata)
}

allplaces(bindingdatalase){
  this.SelectedSpace = bindingdatalase
   console.log(this.SelectedSpace)
   console.log(this.Mlease)
 }
 variableclient:any;
 variablefilename:any;
variableCreatedOn:any;
variableExpiryDate:any;
variableTotalDeposit:any;
variableRental:any;
variableBankName:any;
variableHolderName:any;
variableAccountNo:any;
variaModeofTransfer:any;
varIFSCCode:any;
vAdvanceRequest:any;
vMaintenance:any;
vElectrical:any;
vCondition:any;
vRemarks:any;


 docdata(ind){
     this.clientdata = ind;
    console.log(this.clientdata.clientName)
    this.variableclient = this.clientdata.clientName
    this.variablefilename = this.clientdata.documentName
    this.variableCreatedOn = this.clientdata.createdOn
    this.variableExpiryDate = this.clientdata.expiryDate
    this.variableTotalDeposit = this.clientdata.totalDeposit
    this.variableRental = this.clientdata.rental
    this.variableBankName = this.clientdata.bankName
    this.variableHolderName = this.clientdata.holderName
    this.variableAccountNo = this.clientdata.accountNo
  
    this.variaModeofTransfer = this.clientdata.modeofTransfer
    this.varIFSCCode = this.clientdata.iFSC

    this.vAdvanceRequest = this.clientdata.advance
    this.vMaintenance = this.clientdata.manintenace
    this.vElectrical = this.clientdata.electrical
    this.vCondition = this.clientdata.condition
    this.vRemarks = this.clientdata.remarks
 }


GetRemainingDays(expiry){
  let today=new Date();
  let rDays=new Date(expiry).getDate()-today.getDate();
this.rdayscolorchange(rDays)
  return rDays;
}
rdayscolorchange(days){

}


upload(): void{
  this.uploadVisible = false;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:align
  this.btn_name = 'Upload Document';
}
handleFileInput(event): void {
  this.btn_name = 'Upload Document';
  console.log(event);
  this.files.push(...event.addedFiles);


}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
getWidth(days){
    if(days>=20 && days<=30){
      return "green"
    }
    else   if(days>=10 && days<=20){
      return "yellow"
    }
    else   if(days<10){
      return "red"
    }
}

changeSelection(row){
  setTimeout(()=>{
    this.selection.toggle(row);
  })
}


buttonvaluetable(){
  this.valuetable = true;
  this.valueupload = false;
  }
  buttonvalueupload(){
    this.valuetable = false;
    this.valueupload = true;
  }
  
highlight2(row){
  // this.Mleasebinddata[row]
  this.selectedRowIndex2 = row.id;
}
}


