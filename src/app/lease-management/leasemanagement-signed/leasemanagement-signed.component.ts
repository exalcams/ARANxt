import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { SpaceService } from 'src/app/space/space.service';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';


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
  displayedColumns: string[] = [ 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action', 'ViewDetails'];
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
  notificationSnackBarComponent: NotificationSnackBarComponent;
  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private service: LeaseManagementService,
    // tslint:disable-next-line:align
    private spinner:NgxSpinnerService,   public snackBar: MatSnackBar) { 
      this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    }

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
    this.files.push(event.target.files[0]);
    const signeddetailFile = new LeaseDocument();
    signeddetailFile.client = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetailFile.site = "Site 1";
    signeddetailFile.company = "EXA";
    signeddetailFile.isDraft = false;
    signeddetailFile.documentName = event.target.files[0].name;
    signeddetailFile.contentLength = event.target.files[0].type;
    signeddetailFile.contentLength = event.target.files[0].size;
    const selectedFiles = event.target.files[0];
    this.service.AddSignedFile(signeddetailFile,selectedFiles).subscribe((x) => {
      console.log(x);
      this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
    },
      err => {
        console.log(err);

      })
  }
  saveclk(): void {
    const signeddetail = new LeaseManagement();
    // tslint:disable-next-line:align
    signeddetail.client = this.SignedDocumentDetailsForm.get('Client').value;
    // tslint:disable-next-line:align
    signeddetail.fileName = this.SignedDocumentDetailsForm.get('FileName').value;
    signeddetail.createdOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.expiryDate = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
    signeddetail.manintenace = this.SignedDocumentDetailsForm.get('Maintenance').value;
    signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
    signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    signeddetail.site = "Site 1";
    signeddetail.company = "EXA";
    signeddetail.signedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    signeddetail.siteSign = 'ABC';
    signeddetail.renewalCount = 0;
    signeddetail.renewedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.vacatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.terminatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    signeddetail.isVocated = false;
    signeddetail.isTerminated = false;
    signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
    signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
    signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
    signeddetail.modeofTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
    signeddetail.ifsc = this.SignedDocumentDetailsForm.get('IFSCCode').value;
    signeddetail.advanceRequest = this.SignedDocumentDetailsForm.get('AdvanceRequest').value;
    this.service.AddSignedFileDetail(signeddetail).subscribe((x) => {
      console.log(x);
        const event = new MouseEvent('click', { bubbles: false });
    // tslint:disable-next-line:align
    this.fileInput1.nativeElement.dispatchEvent(event);
      // tslint:disable-next-line:align
      // this.filehandle();
    },
      err => {
        console.log(err);

      })


  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  filehandle() {
  
    
    // setTimeout(() => {
    //   const el: HTMLElement = this.fileInput1.nativeElement;
    //   // tslint:disable-next-line:align
    //   el.click();
    // }, 10);
  
  }
  createdDate(): void {
    this.minDate = this.SignedDocumentDetailsForm.get('CreatedOn').value;
  }
  // tslint:disable-next-line:eofline
}