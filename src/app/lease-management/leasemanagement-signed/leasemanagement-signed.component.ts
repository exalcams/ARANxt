import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaseDocument, LeaseManagement } from 'src/app/Model/Leasemanagement';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { SpaceService } from 'src/app/space/space.service';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { UserData } from '../leasemanagement/leasemanagement.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadSignedDialogComponent } from 'src/app/upload-signed-dialog/upload-signed-dialog.component';
import { VacatecomponentComponent } from '../vacatecomponent/vacatecomponent.component';
import { RenewcomponentComponent } from '../renewcomponent/renewcomponent.component';
import { TerminatecomponentComponent } from '../terminatecomponent/terminatecomponent.component';
import { saveAs } from 'file-saver';
import { SendMailDialogComponent } from 'src/app/send-mail-dialog/send-mail-dialog.component';
import { MatDrawer } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CloseDialogComponent } from 'src/app/close-dialog/close-dialog.component';
@Component({
  selector: 'app-leasemanagement-signed',
  templateUrl: './leasemanagement-signed.component.html',
  styleUrls: ['./leasemanagement-signed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeasemanagementSignedComponent implements OnInit ,OnChanges {
  @Output() sideNavToggle = new EventEmitter();
  displayedColumns: string[] = ['select', 'ClientName', 'FileName', 'DaysRemaining', 'ExpiryDate', 'Action'];
  valueforrenewdialog = 0;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  isDataLoaded: boolean = false;
  SelectedSpace: any[] = [];
  selectedRowIndex2 = -1;
  @ViewChild('fileInput1') fileInput1: ElementRef;
  selectedRowIndex: any;
  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  btn_name: any = 'Upload Document';
  // tslint:disable-next-line:typedef-whitespace
  files: File[] = [];
  days = new Date();
  SignedDocumentDetailsForm: FormGroup;
  date: any = new Date((new Date().getTime() - 3888000000));
  // tslint:disable-next-line:no-inferrable-types
  uploadVisible: boolean = false;
  minDate: Date;
  AllLeases: LeaseManagement[] = [];
  valuetable: boolean = true;
  valueupload: boolean = false;
  Checked: boolean = false
  notificationSnackBarComponent: NotificationSnackBarComponent;
  clientdata: LeaseManagement;
  Renewdialogdata: any;
  sideNavStatus: boolean;
  state: string = 'default';
  @ViewChild('drawer') sidenav: MatDrawer;
  @Input() item: number[];
  SiteId: any;

  SiteSpaceOfSeleceted :number[] = [];

  SpaceId: any;

  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private service: LeaseManagementService,private cdr: ChangeDetectorRef,
    // tslint:disable-next-line:align
    private spinner: NgxSpinnerService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  ngOnInit(): void {
    this.SignedFormGroup();
    this.GetAllLeases();
    this.GetNodeFromLease(this.item);
    this.sideNavToggle.emit(false);
  }  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("onchangesDecoratorValue",this.item);
    console.log("changes", changes.item.currentValue);
    this.GetNodeFromLease(changes.item.currentValue);
  }
  GetNodeFromLease(eve) {
    this.SiteSpaceOfSeleceted=[];
    // console.log("decoratorvalue",  this.item);
    if (eve.length > 0) {
      if (eve[0]) {
        this.SiteId = eve[0];
        this.SiteSpaceOfSeleceted.push(eve[0]);
        console.log("SiteId", this.SiteId);
      }
       if (eve[1]) {
        this.SpaceId = eve[1];
        this.SiteSpaceOfSeleceted.push(eve[1]);
        console.log("SpaceId", this.SpaceId);

      }
    }
  }
  GetAllLeases() {
    this.spinner.show();
    this.service.GetAllSignedLeases().subscribe((data) => {
      this.AllLeases = <LeaseManagement[]>data;

      console.log("getallleases", data);
      this.dataSource = new MatTableDataSource(this.AllLeases);
      this.isDataLoaded = true;
      // if(this.AllLeases.length>0){
      //   this.loadallsigneddocuments(this.AllLeases[0]);
      // }
      this.spinner.hide();
      this.allplaces(this.AllLeases);
      console.log(this.AllLeases)
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });

  }
  allplaces(bindingdatalase) {
    this.SelectedSpace = bindingdatalase
    console.log(this.SelectedSpace)
    console.log(this.AllLeases)
  }
  variableclient: any;
  variablefilename: any;
  variableCreatedOn: any;
  variableExpiryDate: any;
  variableTotalDeposit: any;
  variableRental: any;
  variableBankName: any;
  variableAccountType:any;
  variableHolderName: any;
  variableAccountNo: any;
  variaModeofTransfer: any;
  varIFSCCode: any;
  vAdvanceRequest: any;
  vMaintenance: any;
  vElectrical: any;
  vCondition: any;
  vRemarks: any;


  docdata(ind) {
    this.clientdata = ind;
    console.log(this.clientdata.clientName)
    this.variableclient = this.clientdata.clientName
    this.variablefilename = this.clientdata.documentName
    this.variableCreatedOn = this.clientdata.createdOn
    this.variableExpiryDate = this.clientdata.expiryDate
    this.variableTotalDeposit = this.clientdata.totalDeposit
    this.variableRental = this.clientdata.rental
    this.variableBankName = this.clientdata.bankName
    this.variableAccountType=this.clientdata.accountType
    this.variableHolderName = this.clientdata.holderName
    this.variableAccountNo = this.clientdata.accountNo

    this.variaModeofTransfer = this.clientdata.modeOfTransfer
    this.varIFSCCode = this.clientdata.ifsc

    this.vAdvanceRequest = this.clientdata.advance
    this.vMaintenance = this.clientdata.manintenace
    this.vElectrical = this.clientdata.electrical
    this.vCondition = this.clientdata.condition
    this.vRemarks = this.clientdata.remarks
    if (!this.sideNavStatus) {
      this.sidenav.toggle();
    }
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
      // console.log('update', ELEMENT_DATA[index]);

    }
  }
  uploadDocument(): void {
    this.openDialog();
    // if (this.btn_name === 'Upload Document') {
    //   this.btn_name = 'Cancel';
    //   this.buttonvalueupload()
    // }
    // else if (this.btn_name === 'Cancel') {
    //   this.btn_name = 'Upload Document';
    //   this.buttonvaluetable()
    // }

    // this.openDialog()
  }
  SignedFormGroup(): void {
    this.SignedDocumentDetailsForm = this.formBuilder.group({
      Client: ['', Validators.required],
      FileName: ['', Validators.required],
      CreatedOn: ['', Validators.required],
      ExpiryDate: ['', Validators.required],
      TotalDeposit: ['', Validators.required],
      Rental: ['', Validators.required],
      BankName: ['', Validators.required],
      HolderName: ['', Validators.required],
      AccountNo: ['', Validators.required],
      ModeofTransfer: ['', Validators.required],
      IFSCCode: ['', Validators.required],
      AdvanceRequest: ['', Validators.required],
      Maintenance: ['', Validators.required],
      Electrical: ['', Validators.required],
      Condition: ['', Validators.required],
      Remarks: ['', Validators.required],
      SpocPerson: ['', Validators.required],
      Contact1: ['',Validators.required],
      Contact2: ['',Validators.required],
      Email1: ['',Validators.required],
      Email2: ['',Validators.required],
      AccType:['', Validators.required]

    });
  }
  // loadallsigneddocuments(AllLeases:LeaseManagement){
  // this.SelectedSpace =AllLeases;
  // console.log("selected",this.AllLeases)
  // this.SignedDocumentDetailsForm.get('ClientName').setValue(this.SelectedSpace.client);
  // this.SignedDocumentDetailsForm.get('FileName').setValue(this.SelectedSpace.fileName);
  // this.SignedDocumentDetailsForm.get('CreationDate').setValue(this.SelectedSpace.createdOn);
  // this.SignedDocumentDetailsForm.get('ExpiryDate').setValue(this.SelectedSpace.expiryDate);
  // this.SignedDocumentDetailsForm.get('TotalDeposit').setValue(this.SelectedSpace.totalDeposit);
  // this.SignedDocumentDetailsForm.get('Rental').setValue(this.SelectedSpace.rental);
  // this.SignedDocumentDetailsForm.get('BankName').setValue(this.SelectedSpace.bankName);
  // this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  // this.SignedDocumentDetailsForm.get('Condition').setValue(this.SelectedSpace.condition);
  // this.SignedDocumentDetailsForm.get('Remarks').setValue(this.SelectedSpace.remarks);

  // this.SignedDocumentDetailsForm.get('ModeofTransfer').setValue(this.SelectedSpace.modeofTransfer);
  // this.SignedDocumentDetailsForm.get('AccountNo').setValue(this.SelectedSpace.accountNo);
  // this.SignedDocumentDetailsForm.get('HolderName').setValue(this.SelectedSpace.holderName);

  // this.SignedDocumentDetailsForm.get('Electrical').setValue(this.SelectedSpace.electrical);
  // this.SignedDocumentDetailsForm.get('AdvanceRequest').setValue(this.SelectedSpace.advanceRequest);
  // this.SignedDocumentDetailsForm.get('IFSCCode').setValue(this.SelectedSpace.iFSC);
  // }


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
    signeddetailFile.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    signeddetailFile.site = "Site 1";
    signeddetailFile.company = "EXA";
    signeddetailFile.isDraft = false;
    signeddetailFile.documentName = event.target.files[0].name;
    signeddetailFile.contentLength = event.target.files[0].type;
    signeddetailFile.contentLength = event.target.files[0].size;
    const selectedFiles = event.target.files[0];
    this.service.AddSignedFile(signeddetailFile, selectedFiles).subscribe((x) => {
      console.log(x);
      this.notificationSnackBarComponent.openSnackBar('Uploaded in successfully', SnackBarStatus.success);
    },
      err => {
        console.log(err);

      })
  }
  saveclk(): void {
    // const signeddetail = new LeaseManagement();
    // signeddetail.clientName = this.SignedDocumentDetailsForm.get('Client').value;
    // signeddetail.documentName = this.SignedDocumentDetailsForm.get('FileName').value;
    // signeddetail.createdOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    // signeddetail.expiryDate = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.totalDeposit = this.SignedDocumentDetailsForm.get('TotalDeposit').value;
    // signeddetail.rental = this.SignedDocumentDetailsForm.get('Rental').value;
    // signeddetail.maintenance = this.SignedDocumentDetailsForm.get('Maintenance').value;
    // signeddetail.electrical = this.SignedDocumentDetailsForm.get('Electrical').value;
    // signeddetail.condition = this.SignedDocumentDetailsForm.get('Condition').value;
    // signeddetail.remarks = this.SignedDocumentDetailsForm.get('Remarks').value;
    // signeddetail.site = "Site 1";
    // signeddetail.company = "EXA";
    // signeddetail.signedOn = this.SignedDocumentDetailsForm.get('CreatedOn').value;
    // signeddetail.siteSign = 'ABC';
    // signeddetail.renewalCount = 0;
    // signeddetail.renewedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.vacatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.terminatedOn = this.SignedDocumentDetailsForm.get('ExpiryDate').value;
    // signeddetail.isVocated = false;
    // signeddetail.isTerminated = false;
    // signeddetail.bankName = this.SignedDocumentDetailsForm.get('BankName').value;
    // signeddetail.holderName = this.SignedDocumentDetailsForm.get('HolderName').value;
    // signeddetail.accountNo = this.SignedDocumentDetailsForm.get('AccountNo').value;
    // signeddetail.modeofTransfer = this.SignedDocumentDetailsForm.get('ModeofTransfer').value;
    // signeddetail.iFSC = this.SignedDocumentDetailsForm.get('IFSCCode').value;
    // signeddetail.advanceRequest = this.SignedDocumentDetailsForm.get('AdvanceRequest').value;
    // this.service.AddSignedFileDetail(signeddetail).subscribe((x) => {
    //   console.log(x);
    //     const event = new MouseEvent('click', { bubbles: false });
    // // tslint:disable-next-line:align
    // this.fileInput1.nativeElement.dispatchEvent(event);
    //   // tslint:disable-next-line:align
    //   // this.filehandle();
    // },
    //   err => {
    //     console.log(err);

    //   })

    this.ShowValidationErrors(this.SignedDocumentDetailsForm)
  }

  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


  getWidth(days) {
    if (days >= 30) {
      return "#3ec725"
    }
    else if (days >= 10 && days <= 30) {
      return " #faa542";
    }
    else if (days < 10) {
      return "red"
    }
  }
  bulletcolorwidth(bulletcolor, expiryforsigned) {
    if (bulletcolor == "terminated") {
      return "#6e6d7a"
    }
    if (bulletcolor == "undernotice") {
      return "#faa542"
    }
    if (bulletcolor == "signed") {
      return "#3ec725"
    }
    if (bulletcolor == "vacated") {
      return "#1b56ca"
    }
    if (bulletcolor == "signed" && expiryforsigned <= 30) {
      return "red"
    }
  }
  openDialog() {
    const dialogConfig: MatDialogConfig = {
      data: {
        SiteId: this.SiteId,
        SpaceId: this.SpaceId,
      },
      panelClass: 'upload-signed-dialog',
      height:'90vh',
      width:'90%',
      disableClose: true
    };
    const dialogRef = this.dialog.open(UploadSignedDialogComponent, dialogConfig);
    // const dialogRef = this.dialog.open(UploadSignedDialogComponent, {
      

    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.selectedRowIndex2=null
      console.log("selectedRowIndex2",this.selectedRowIndex2);
      
      // this.selection = new SelectionModel<any>(true, []);
      // this.selection.clear();
      this.cdr.detectChanges();
      if (result) {
       
        this.GetAllLeases();
      }
    });
  }


  openDialogvacate() {
    if (this.Checked && this.Renewdialogdata.status == "signed") {
      console.log("Renewdialogdata", this.Renewdialogdata);

      const dialogRef = this.dialog.open(VacatecomponentComponent, {
        panelClass: 'upload-vacate-dialog',
        data: this.Renewdialogdata,
        // position: { top: '3%', right: '3%' },
        width: '836px',

      });

      dialogRef.afterClosed().subscribe(result => {
        this.selectedRowIndex2=null
        console.log(`Dialog result: ${result}`);
        if (!result) {
          this.GetAllLeases();
        }
      });
    }
    else if (this.Checked && this.Renewdialogdata.status == "vacated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Vacate lease since it is vacated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "terminated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Vacate lease since it is terminated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "undernotice") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Vacate lease since it is in notice period', SnackBarStatus.warning,3000);
    }
    else {
      this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning);
      this.Checked = false
    }
  }
  go(row) {
    this.valueforrenewdialog = row
    console.log(this.valueforrenewdialog)
    this.Checked = true;
    this.Renewdialogdata = row;
    this.sideNavToggle.emit(true);
    // if(this.selection.selected)

  }
  openDialogrenew() {
    if (this.Checked && this.Renewdialogdata.status == "signed") {

      const dialogRef = this.dialog.open(RenewcomponentComponent, {
        panelClass: 'upload-renew-dialog',
        data: this.Renewdialogdata,
        // position: { top: '3%', right: '3%' },
        width: '1016px',

      });
      dialogRef.afterClosed().subscribe(result => {
        this.selectedRowIndex2=null
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.GetAllLeases();
        }
      });
    }
    else if (this.Checked && this.Renewdialogdata.status == "vacated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Renew lease since it is vacated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "terminated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Renew lease since it is terminated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "undernotice") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Renew lease since it is in notice period', SnackBarStatus.warning,3000);
    }
    else {
      this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning,3000);
      this.Checked = false
    }
  }
  openDialogterminate() {
    if (this.Checked && ((this.Renewdialogdata.status == "signed") || (this.Renewdialogdata.status == "undernotice"))) {
      const dialogRef = this.dialog.open(TerminatecomponentComponent, {
        panelClass: 'upload-terminate-dialog',
        data: this.Renewdialogdata,
        // position: { top: '3%', right: '3%' },
        width: '853px',

      });

      dialogRef.afterClosed().subscribe(result => {
        this.selectedRowIndex2=null
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.GetAllLeases();
        }
      });
    }
    else if (this.Checked && this.Renewdialogdata.status == "vacated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Terminate lease since it is vacated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "terminated") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Terminate lease since it is terminated', SnackBarStatus.warning,3000);
    }
    else if (this.Checked && this.Renewdialogdata.status == "undernotice") {
      this.notificationSnackBarComponent.openSnackBar('Can\'t Terminate lease since it is in notice period', SnackBarStatus.warning,3000);
    }
    else {
      this.notificationSnackBarComponent.openSnackBar('Please select a lease', SnackBarStatus.warning);
      this.Checked = false
    }
  }


  buttonvaluetable() {
    this.valuetable = true;
    this.valueupload = false;
  }
  buttonvalueupload() {
    this.valuetable = false;
    this.valueupload = true;
  }

  highlight2(row) {
    console.log(row)
    this.selectedRowIndex2 = row.leaseID;
    console.log(this.selectedRowIndex2);
  }
  DownloadLeaseDocument(row) {

    this.sideNavStatus = true;
    this.service.DownloadLeaseDocument(row.documentID).subscribe((res) => {
      this.sideNavStatus = false;
      let blob: any = new Blob([res], { type: 'application/pdf' });
      saveAs(blob, `${row.documentName}.pdf`);
      console.log(`${row.documentName} downloaded`);
    },
      err => {
        console.log(err);
      });
  }
  openSendMailDialog(documentID) {
    // this.sideNavStatus=true;
    const dialogRef = this.dialog.open(SendMailDialogComponent,
      {
        panelClass: "send-mail-dialog",
        data: { documentID: documentID }
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      this.sideNavStatus = false;
      if (res) {
        console.log("send-mail-dialog", res);
        this.spinner.show();
        this.service.SendMailFromLease(res).subscribe(() => {
          console.log("Mail sent");
          this.notificationSnackBarComponent.openSnackBar("email has been sent", SnackBarStatus.success);

          this.spinner.hide();
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      }
    });
  }
  drawerToggled(event) {
    this.sideNavStatus = event;
  }

  Deleteleaserow(leaseID) {
    this.sideNavStatus = true;
    const dialogConfig: MatDialogConfig = {
      data: {
        title: "Delete",
        body: "Are you sure  want to delete?",
      },
      panelClass: 'close-dialog',
      width: '24%',
      maxWidth: '85.5vw ',
      disableClose: true
    };
    const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.sideNavStatus = false;
      if (result == "yes") {
        this.spinner.show();
        this.service.DeleteLeaseManagement(leaseID).subscribe((x) => {
          this.sideNavStatus = false;
          console.log(x);
          this.GetAllLeases()
          this.spinner.hide();
          this.notificationSnackBarComponent.openSnackBar('Deleted  successfully', SnackBarStatus.success);
        },
          err => {
            this.spinner.hide();
            console.log(err);

          })
      }
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  // 
  toggleSideNav() {
    this.sideNavToggle.emit(false);
  }

  editSignedDocument(){
    const dialogConfig: MatDialogConfig = {
      data: {
        clientdata:this.clientdata,
        SiteId: this.SiteId,
        SpaceId: this.SpaceId,
      },
      panelClass: 'upload-signed-dialog',
      height:'90vh',
      width:'90%',
      disableClose: true
    };
    const dialogRef = this.dialog.open(UploadSignedDialogComponent, dialogConfig);
    // const dialogRef = this.dialog.open(UploadSignedDialogComponent, {
      

    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.selectedRowIndex2=null
      console.log("selectedRowIndex2",this.selectedRowIndex2);
      if (result) {
        this.GetAllLeases();
      }
    });
  }

}