import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { SpaceService } from 'src/app/space/space.service';

const ELEMENT_DATA: any[] = [
  // tslint:disable-next-line:max-line-length
  { ClientName: 'Hari', FileName: 'Laese Document for Exalca', DaysRemaining: '5', ExpiryDate: '1/10/2022', Action: '', ViewDetails: '' },
  { ClientName: 'Ram', FileName: 'Laese Document for Exalca', DaysRemaining: '3', ExpiryDate: '29/9/2022', Action: '', ViewDetails: '' },
];
@Component({
  selector: 'app-leasemanagement-signed',
  templateUrl: './leasemanagement-signed.component.html',
  styleUrls: ['./leasemanagement-signed.component.scss']
})
export class LeasemanagementSignedComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action', 'ViewDetails'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  @ViewChild('fileInput1') fileInput1: ElementRef;
  selectedRowIndex: any;
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];

  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  minDate: Date;
  AllLeases:any[]=[];
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private service: LeaseManagementService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetAllLeases();
  }

  GetAllLeases(){
    this.spinner.show();
    this.service.GetAllSignedLeases().subscribe((data)=>{
      this.AllLeases=<any[]>data;
      console.log(data);
      this.dataSource=new MatTableDataSource(this.AllLeases);
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }

  GetRemainingDays(expiry){
    let today=new Date();
    let rDays=new Date(expiry).getDate()-today.getDate();
    return rDays;
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
    if (event.checked) {
      console.log('update', ELEMENT_DATA[index]);

    }
  }
  uploadDocument(): void {
    if (this.btn_name === 'Upload Document') {
      this.btn_name = 'Cancel';
    }
    else if (this.btn_name === 'Cancel') {
      this.btn_name = 'Upload Document';
    }
  }
SignedFormGroup(): void
{
  this.SignedDocumentDetailsForm = this.formBuilder.group({
    Client: [''],
    FileName : [''],
    CreatedOn: [''],
    ExpiryDate: [''],
    TotalDeposit : [''],
    Rental: [''],
    BankName: [''],
    HolderName : [''],
    AccountNo : [''],
    ModeofTransfer : [''],
    IFSCCode : [''],
    AdvanceRequest : [''],
    Maintenance: [''],
    Electrical: [''],
    Condition: [''],
    Remarks: [''],

  });
}
upload(): void {
  this.uploadVisible = false;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:align
  this.btn_name = 'Upload Document';
}
handleFileInput(event): void {
    // tslint:disable-next-line:semicolon
    // tslint:disable-next-line:align

    // tslint:disable-next-line:align
    this.btn_name = 'Upload Document';
    // tslint:disable-next-line:align
    console.log(event);
    // tslint:disable-next-line:align
    this.files.push(...event.addedFiles);
    const signeddetailFile = new LeaseDocument();
    signeddetailFile.Client = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetailFile.Site = "Site 1";
    signeddetailFile.Company = "EXA";
    signeddetailFile.IsDraft = false;
    signeddetailFile.DocumentName = event.target.files[0].name;
    signeddetailFile.ContentLength = event.target.files[0].type;
    signeddetailFile.ContentLength = event.target.files[0].size;
    const selectedFiles = event.target.files[0];
  }
  saveclk(): void {
    const signeddetail = new LeaseManagement();
    // tslint:disable-next-line:align
    signeddetail.Client = this.SignedDocumentDetailsForm.get('Client').value;
    // tslint:disable-next-line:align
    signeddetail.FileName = this.SignedDocumentDetailsForm.get('FileName').value;
    signeddetail.CreatedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.ExpiryDate = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.TotalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    signeddetail.Rental = this.SignedDocumentDetailsForm.get('Rental').value;
    signeddetail.Maintenance = this.SignedDocumentDetailsForm.get('Maintenance').value;
    signeddetail.Electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    signeddetail.Condition = this.SignedDocumentDetailsForm.get('Condition').value;
    signeddetail.Remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    signeddetail.Site = "Site 1";
    signeddetail.Company = "EXA";
    signeddetail.SignedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.SiteSign = 'ABC';
    signeddetail.RenewalCount = 0;
    signeddetail.RenewedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.VacatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.TerminatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.IsVocated = false;
    signeddetail.IsTerminated = false
    this.service.AddSignedFileDetail(signeddetail).subscribe((x) => {
      console.log(x);
      // tslint:disable-next-line:align
      this.filehandle();
    },
      err => {
        console.log(err);

      })


  }
  filehandle() {
    const event = new MouseEvent('click', { bubbles: false });
    // tslint:disable-next-line:align
    this.fileInput1.nativeElement.dispatchEvent(event);
  }
  createdDate(): void {
    this.minDate = this.SignedDocumentDetailsForm.get('CreatedOn').value;
  }
  // tslint:disable-next-line:eofline
}