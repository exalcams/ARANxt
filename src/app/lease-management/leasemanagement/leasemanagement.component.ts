import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter, Output, ElementRef, ViewChildren, QueryList, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GDriveComponent } from 'src/app/g-drive/g-drive.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DraftDialogComponent } from 'src/app/draft-dialog/draft-dialog.component';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseDraft, LeaseDraftDocumentView } from 'src/app/Model/Leasemanagement';
import { SendMailDialogComponent } from 'src/app/send-mail-dialog/send-mail-dialog.component';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { saveAs } from 'file-saver';
import { CloseDialogComponent } from 'src/app/close-dialog/close-dialog.component';
import { FormControl } from '@angular/forms';
export interface UserData {

  Documentname: string;
  Filesize: string;
  CreatedOn: string;
  Actions: any
}
interface Item {
  siteOfSelectedItem: number;
  selectedId: number;
}
const ELEMENT_DATA: UserData[] = [
  { Documentname: 'Lease Document For Exalca', Filesize: '1mb', CreatedOn: '15/9/2021', Actions: '', },
  { Documentname: 'Lease Document For Entity Data', Filesize: '1mb', CreatedOn: '17/9/2021', Actions: '', },


]
@Component({
  selector: 'app-leasemanagement',
  templateUrl: './leasemanagement.component.html',
  styleUrls: ['./leasemanagement.component.scss']
})
export class LeasemanagementComponent implements OnInit, OnChanges {
  @Output() switchSideNav = new EventEmitter();
  displayedColumns: string[] = ['select', 'documentOwner', 'documentType', 'documentName', 'createdOn', 'modifiedOn', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  @Input() item: Item[];
  // tslint:disable-next-line:variable-name

  // tslint:disable-next-line:variable-name
  link_bool = false;
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:no-inferrable-types
  // tslint:disable-next-line:variable-name
  product_bool: boolean = false;
  // tslint:disable-next-line:variable-name
  drive_bool = false;
  // tslint:disable-next-line:variable-name
  search_bool: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('checkbox1') private checkboxs: QueryList<any>;
  @ViewChildren('checkbox') private checkbox: QueryList<any>;
  bool1: Boolean = true;
  // tslint:disable-next-line:ban-types
  bool2: Boolean;
  bool3: Boolean;
  files: File[] = [];
  bool4: boolean;
  bool5: boolean;
  LeaseDrafts: any[] = [];
  selectedPage: string = 'draft';
  editor1: boolean = false;
  editor2: boolean = false;
  draftdata_filter: any[] = [];
  matripple_centered = true;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  @Output() toggleFold: EventEmitter<boolean> = new EventEmitter<boolean>();
  closedialog: string = 'yes';
  neweditorchange: boolean = false;
  editor1change: boolean = false;
  editor2change: boolean = false;
  editor_mode: number;
  closebool: boolean;
  newDraftSavedStatus: boolean;
  objeve: any;
  seletedrows_array: any[] = [];
  SiteId: Item;
  SpaceId: Item;
  SiteSpaceOfSeleceted: number[] = [];
  toggleSideNav(value: boolean) {
    this.toggleFold.emit(!value);
  }
  newLeaseDraft: LeaseDraft = new LeaseDraft();
  leaseDraft1: LeaseDraft = new LeaseDraft();
  leaseDraft2: LeaseDraft = new LeaseDraft();
  commonlease: LeaseDraft = new LeaseDraft();
  savedNewLease: LeaseDraft = new LeaseDraft();
  savednewLeaseHasval: boolean = false;
  selectedRowIndex2 = -1;

  editorConfig: any;
  isDataLoaded: boolean = false;
  fileNameNew:FormControl=new FormControl('Document 1');
  fileNameEdit1:FormControl=new FormControl();
  fileNameEdit2:FormControl=new FormControl();
  constructor(private dialog: MatDialog, private service: LeaseManagementService,
    private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar, private socialAuthService: SocialAuthService) {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  ngOnInit(): void {
    this.getAllDrafts();
    this.editorConfig = {
      height: window.innerHeight - 328 + 'px',
    }

    this.GetFromHome(this.item);

    setInterval(() => {
      this.autoSaveDraft();
    }, 5000);

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("onchangesDecoratorValue",this.item);
    console.log("changes", changes.item.currentValue);
    this.GetFromHome(changes.item.currentValue);
    this.switchSideNav.emit(false);
  }
  GetFromHome(eve) {
    // console.log("decoratorvalue",  this.item);
    this.SiteSpaceOfSeleceted = [];
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
  getAllDrafts() {
    this.spinner.show();
    this.service.GetLeaseDrafts().subscribe(res => {
      this.LeaseDrafts = res;
      this.dataSource = new MatTableDataSource(this.LeaseDrafts);
      //Filter Predicate
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.documentOwner.toLowerCase().includes(filter) || data.documentType.toLowerCase().includes(filter) || data.documentName.toLowerCase().includes(filter);
      };
      this.draftdata_filter = this.LeaseDrafts;
      this.selection = new SelectionModel<any>(true, []);
      this.isDataLoaded = true;
      this.spinner.hide();
      console.log("LeaseDrafts", res);
    },
      err => {
        this.spinner.hide();
        console.log(err);
      })
  }
  // table work
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
  check() {
    let myCheckboxes = this.checkboxs.toArray();
    let checkbox = this.checkbox.toArray();
    console.log("checkboxes", myCheckboxes);
  }
  highlight2(row) {
    // console.log(row)
    this.selectedRowIndex2 = row.documentID;
    // console.log(this.selectedRowIndex2);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {

      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Documentname + 1}`;
  }
  // removeSelectedRows() {
  //   this.selection.selected.forEach(item => {

  //  if(item.highlighted)
  //  {
  //   item.highlighted=false
  //  }   
  //    });

  // }
  getrow(eve) {
    this.seletedrows_array.push(eve)
  }
  docName: string = "";
  onSelect(event): void {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
    this.docName = this.files[0].name;
    this.UploadDraftDocument();
    this.docName = "";
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }
  chooseIcons(eve): void {
    if (eve === 'search') {
      this.search_bool = !this.search_bool;
      this.product_bool = false;
      this.link_bool = false;
      this.drive_bool = false
    }
    if (eve === 'product') {
      this.product_bool = !this.product_bool;
      this.search_bool = false;
      this.link_bool = false;
      this.drive_bool = false;
    }
    if (eve === 'drive') {
      this.drive_bool = !this.drive_bool;
      this.product_bool = false;
      this.link_bool = false;
      this.search_bool = false;
    }
    if (eve === 'link') {
      this.link_bool = !this.link_bool;
      this.product_bool = false;
      this.drive_bool = false;
      this.search_bool = false;
    }
  }
  openGdrive() {
    this.spinner.show();
    let signInOptions = {
      scope: "https://www.googleapis.com/auth/drive"
    }
    // let fileID = "1QMOPHcNxzlLTFlwbQa1n5t_WU3yMsN5R";
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, signInOptions)
      .then((data) => {
        // console.log(data);
        const dialogRef = this.dialog.open(GDriveComponent,
          {
            panelClass: "g-drive-dialog",
            data: data
          }
        );
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.files.push(res.file);
            this.cdr.detectChanges();
          }
          this.socialAuthService.signOut();
        });
        this.spinner.hide;
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
  }
  OpenFileFromLink() {
    let link = "test";
    let fileName;
    this.service.GetFileFromLink(link).subscribe((res) => {
      console.log("link file", res);
      const blob = new Blob([res])
      let blobArr = new Array<Blob>();
      blobArr.push(blob);
      let resFile = new File(blobArr, fileName);
    },
      err => {
        console.log(err);
      })
  }

  UploadDraftDocument() {
    if (this.files.length > 0) {
      this.openDraftDialog(2);
    }
    else {
      this.notificationSnackBarComponent.openSnackBar("Please attach document", SnackBarStatus.warning);
    }
  }

  formatBytes(byteStr, decimals = 2) {
    let bytes = parseFloat(byteStr);
    if (bytes === 0) return '0 Bytes';

    let k = 1024;
    let dm = decimals < 0 ? 0 : decimals;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  saveNewDraft() {
    this.editor_mode = 1
    // console.log("savednewlease",this.savedNewLease);

    if (this.savednewLeaseHasval) {
      this.commonlease.documentOwner = this.savedNewLease.documentOwner;
      this.commonlease.documentType = this.savedNewLease.documentType;
      this.commonlease.documentName = this.savedNewLease.documentName;
      const dialogConfig: MatDialogConfig = {
        data: {
          name: this.commonlease.documentName,
          owner: this.commonlease.documentOwner,
          type: this.commonlease.documentType
        },
        panelClass: "draft-dialog"
      };
      const dialogRef = this.dialog.open(DraftDialogComponent, dialogConfig);
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.leaseDraft1.documentName = res.documentName;
          this.leaseDraft1.documentOwner = res.documentOwner;
          this.leaseDraft1.documentType = res.documentType;
          this.saveLeaseDraft(this.leaseDraft1);
        }

      })
    }
    else {
      this.openDraftDialog(1);

    }
  }

  saveDraft1() {
    this.editor1change = false;
    this.service.GetLeaseDraftById(this.leaseDraft1.documentID).subscribe(res => {
      if (res) {

        this.commonlease.documentOwner = res.documentOwner,
          this.commonlease.documentType = res.documentType,
          this.commonlease.documentName = res.documentName,
          console.log("saveDraft1", this.leaseDraft1);


        const dialogConfig: MatDialogConfig = {
          data: {
            name: this.commonlease.documentName,
            owner: this.commonlease.documentOwner,
            type: this.commonlease.documentType
          },
          panelClass: "draft-dialog"
        };
        const dialogRef = this.dialog.open(DraftDialogComponent, dialogConfig);
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.leaseDraft1.documentID = 0;
            this.leaseDraft1.documentName = res.documentName;
            this.leaseDraft1.documentOwner = res.documentOwner;
            this.leaseDraft1.documentType = res.documentType;
            this.saveLeaseDraft(this.leaseDraft1);
          }

        })
      }

    })

  }

  saveDraft2() {
    this.editor2change = false;
    this.service.GetLeaseDraftById(this.leaseDraft2.documentID).subscribe(res => {
      if (res) {
        this.commonlease.documentOwner = res.documentOwner,
          this.commonlease.documentType = res.documentType,
          this.commonlease.documentName = res.documentName,
          console.log("saveDraft1", this.leaseDraft1);

        // this.openDraftDialog(3);

        const dialogConfig: MatDialogConfig = {
          data: {
            name: this.commonlease.documentName,
            owner: this.commonlease.documentOwner,
            type: this.commonlease.documentType
          },
          panelClass: "draft-dialog"
        };
        const dialogRef = this.dialog.open(DraftDialogComponent, dialogConfig);
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.leaseDraft2.documentID = 0;
            this.leaseDraft2.documentName = res.documentName;
            this.leaseDraft2.documentOwner = res.documentOwner;
            this.leaseDraft2.documentType = res.documentType;
            this.saveLeaseDraft(this.leaseDraft2);
          }

        })
      }
    })
    // this.saveLeaseDraft(this.leaseDraft2);
  }


  openDraftDialog(mode: number) {          //1.save draft  2.upload doc 3.editor

    const dialogRef = this.dialog.open(DraftDialogComponent,
      {
        panelClass: "draft-dialog",
        data: { name: this.docName }
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log("draft-dialog", res)
        if (mode == 1) {
          this.newLeaseDraft.documentName = res.documentName;
          this.newLeaseDraft.documentOwner = res.documentOwner;
          this.newLeaseDraft.documentType = res.documentType;
          console.log("mode1", this.newLeaseDraft);

          this.saveLeaseDraft(this.newLeaseDraft);
        }
        else if (mode == 2) {
          //convert and save lease draft
          var draft = new LeaseDraft();
          draft.documentName = res.documentName;
          draft.documentOwner = res.documentOwner;
          draft.documentType = res.documentType;
          this.uploadLeaseDraft(draft);
        }
      }
    });
  }

  closePage(eve) {
    if (eve == 'signed') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {


        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        // this.selectedPage='draft';

        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'signed';
            this.editor1change = false;
            this.editor2change = false;
            this.neweditorchange = false;
            // this.savedNewLease=new LeaseDraft();
            this.savednewLeaseHasval = false;

            this.selection.clear();

            this.cdr.detectChanges();


          }
        })
      }
      else {
        this.selectedPage = 'signed';
        this.editor1change = false;
        this.editor2change = false;
        this.neweditorchange = false;
        this.savednewLeaseHasval = false;

        this.selection.clear();

        this.cdr.detectChanges();


      }
    }
    else if (eve == 'draft') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        // this.selectedPage='draft';

        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'draft';
            this.editor1change = false;
            this.editor2change = false;
            this.neweditorchange = false;
            // this.savedNewLease=new LeaseDraft();
            this.savednewLeaseHasval = false;

            this.selection.clear();

            this.cdr.detectChanges();


          }
        })
      }
      else {
        this.selectedPage = 'draft';
        this.editor1change = false;
        this.editor2change = false;
        this.neweditorchange = false;
        // this.savedNewLease=new LeaseDraft();;
        this.savednewLeaseHasval = false;

        this.selection.clear();
        this.cdr.detectChanges();


      }
    }
    else if (eve == 'expiry') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        // this.selectedPage='draft';

        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'expiry';
            this.editor1change = false;
            this.editor2change = false;
            // this.savedNewLease=new LeaseDraft();;
            this.savednewLeaseHasval = false;
            this.neweditorchange = false;


            this.selection.clear();
            this.cdr.detectChanges();

          }
        })
      }
      else {
        this.selectedPage = 'expiry';
        this.editor1change = false;
        this.editor2change = false;
        this.neweditorchange = false;
        this.savednewLeaseHasval = false;
        this.selection.clear();
        this.cdr.detectChanges();


      }
    }
    else if (eve == 'underNotice') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        // this.selectedPage='draft';

        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'underNotice';
            this.editor1change = false;
            this.editor2change = false;
            this.neweditorchange = false;
            this.savednewLeaseHasval = false;
            this.selection.clear();
            this.cdr.detectChanges();
          }
        })
      }
      else {
        this.selectedPage = 'underNotice';
        this.editor1change = false;
        this.editor2change = false;
        this.neweditorchange = false;
        this.savednewLeaseHasval = false;
        this.selection.clear();
        this.cdr.detectChanges();

        this.selection.clear();
        this.cdr.detectChanges();

      }
    }
    else if (eve == 'terminate') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure  to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        // this.selectedPage='draft';

        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'terminate';
            this.editor1change = false;
            this.editor2change = false;
            this.neweditorchange = false;
            this.savednewLeaseHasval = false;
            this.selection.clear();
            this.cdr.detectChanges();
          }
        })
      }
      else {
        this.selectedPage = 'terminate';
        this.editor1change = false;
        this.editor2change = false;
        this.savednewLeaseHasval = false;
        this.neweditorchange = false;
        this.selection.clear();
        this.cdr.detectChanges();


      }
    }

    else if (eve == 'vacated') {
      if (this.neweditorchange || this.editor1change || this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure  want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '379px',
          maxWidth: '85.5vw ',
          disableClose: true
        };
        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = 'vacated';
            this.editor1change = false;
            this.editor2change = false;
            this.neweditorchange = false;
            this.savednewLeaseHasval = false;
            this.selection.clear();
            this.cdr.detectChanges();
          }
        })
      }
      else {
        this.selectedPage = 'vacated';
        this.editor1change = false;
        this.editor2change = false;
        this.neweditorchange = false;
        this.savednewLeaseHasval = false;
        this.selection.clear();
        this.cdr.detectChanges();
      }
    }
  }
  closeDraft(eve) {
    if (eve == 'editor2') {
      if (this.editor2change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure  want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };

        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes" && this.editor1) {
            this.editor2 = false;
            this.editor2change = false;
            this.cdr.detectChanges();

          }
          else if (result == "yes" && !this.editor1) {
            this.selectedPage = "draft";


            this.selection.clear();
            this.editor2change = false;
            this.cdr.detectChanges();


          }
        })
      }
      else if (!this.editor2change && this.editor1) {
        this.editor2 = false;
        this.editor2change = false;
        this.cdr.detectChanges();
      }
      else if (!this.editor2change && !this.editor1) {
        this.selectedPage = "draft";
        this.editor2change = false;


        this.selection.clear();
        this.cdr.detectChanges();


      }
    }
    else if (eve == 'editor1') {
      if (this.editor1change) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure  want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };

        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes" && this.editor2) {
            this.editor1 = false;
            this.editor1change = false;
            this.cdr.detectChanges();
          }
          else if (result == "yes" && !this.editor2) {
            this.selectedPage = "draft";
            this.editor1change = false;


            this.selection.clear();
            this.cdr.detectChanges();


          }
        })
      }
      else if (!this.editor1change && this.editor2) {
        this.editor1 = false;
        this.editor1change = false;
        this.cdr.detectChanges();
      }
      else if (!this.editor1change && !this.editor2) {
        this.selectedPage = "draft";
        this.editor1change = false;
        console.log(this.dataSource);

        this.selection.clear();
        this.cdr.detectChanges();

      }
    }
    else if (eve == 'new') {
      if (this.neweditorchange) {
        const dialogConfig: MatDialogConfig = {
          data: {
            title: "Close",
            body: "Are you sure  want to close without saving?",
          },
          panelClass: 'close-dialog',
          width: '24%',
          maxWidth: '85.5vw ',
          disableClose: true
        };

        const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            this.selectedPage = "draft";
            this.neweditorchange = false;
            this.savednewLeaseHasval = false;
            this.selection.clear();
            this.cdr.detectChanges();
          }
        })
      }
      else if (!this.neweditorchange) {
        this.selectedPage = "draft";
        this.neweditorchange = false;

        this.selection.clear();
        this.savednewLeaseHasval = false;
        this.cdr.detectChanges();
      }
    }
  }

  saveLeaseDraft(draft: LeaseDraft) {
    this.spinner.show();
    this.service.SaveLeaseDraft(draft).subscribe(() => {
      this.spinner.hide();
      if (this.editor_mode == 3 && this.editor1) {
        this.editor1change = false;

      }
      else if (this.editor_mode == 3 && this.editor2) {
        this.editor2change = false;
      }
      else if (this.editor_mode == 1) {
        this.neweditorchange = false;
        this.savednewLeaseHasval = true;
        //  this.savedNewLease=new LeaseDraft();
        this.savedNewLease.documentType = draft.documentType;
        this.savedNewLease.documentOwner = draft.documentOwner;
        this.savedNewLease.documentName = draft.documentName
      }

      this.notificationSnackBarComponent.openSnackBar("Saved Sucessfully", SnackBarStatus.success);
      this.getAllDrafts();
      console.log("draft saved");
    },
      err => {
        this.spinner.hide();
        console.log(err);
      });
  }

  uploadLeaseDraft(draft: LeaseDraft) {
    this.spinner.show();
    this.service.UploadLeaseDraft(this.files, draft).subscribe(() => {
      this.spinner.hide();
      this.getAllDrafts();
      this.files = [];
      console.log("draft saved");
    },
      err => {
        this.spinner.hide();
        console.log(err);
        this.files = [];
      });
  }
  openDratEdtitor(row: LeaseDraft) {
    console.log("row", row);
    this.spinner.show();
    this.service.GetLeaseDraftDocument(row.documentID).subscribe(res => {
      this.spinner.hide();
      this.switchSideNav.emit(true);
      this.selectedPage = 'edit';
      this.editor1 = true;
      this.editor2 = false;
      this.leaseDraft1 = res;
      this.fileNameEdit1.setValue(row.documentName);
      this.editor1change = false;
    },
      err => {
        this.spinner.hide();
        console.log(err);
      });
  }
  openMultiDraftEditor() {
    if (this.selection.selected.length == 0) {
      this.notificationSnackBarComponent.openSnackBar("Plese select document to edit!", SnackBarStatus.warning);
    }
    else {
      this.switchSideNav.emit(true);
      console.log("openMultiDraftEditor", this.selection.selected);
      this.selectedPage = 'edit';
      if (this.selection.selected.length >= 2) {
        this.service.GetLeaseDraftDocument(this.selection.selected[0].documentID).subscribe(res => {
          console.log(" this.leaseDraft1", this.leaseDraft1);

          this.leaseDraft1 = res;
          this.fileNameEdit1.setValue(this.selection.selected[0].documentName);
          this.editor1 = true;
          this.cdr.detectChanges();
        });
        this.service.GetLeaseDraftDocument(this.selection.selected[1].documentID).subscribe(res => {
          console.log(" this.leaseDraft2", this.leaseDraft2);
          this.leaseDraft2 = res;
          this.fileNameEdit2.setValue(this.selection.selected[1].documentName);
          this.editor2 = true;
          this.cdr.detectChanges();
        })
      }
      else {
        //  this.spinner.show();
        // this.leaseDraft1 = this.selection.selected[0];
        this.service.GetLeaseDraftDocument(this.selection.selected[0].documentID).subscribe(res => {
          this.leaseDraft1 = res;
          console.log("LeaseDrafts", res);
          this.editor1 = true;
          this.editor2 = false;
          this.cdr.detectChanges();
        },
          err => {
            this.spinner.hide();
            console.log(err);
          })

      }
    }
  }
  DeleteLeaseDrafts() {
    if (this.selection.selected.length > 0) {
      let ids = [];
      this.selection.selected.forEach((draft: LeaseDraft) => {
        ids.push(draft.documentID);
      });
      const dialogConfig: MatDialogConfig = {
        data: {
          title: "Delete",
          body: "Document will be deleted permanently.\nAre you sure  want to delete?",
        },
        panelClass: 'close-dialog',
        width: '30%',
        maxWidth: '85.5vw ',
        disableClose: true
      };
      const dialogRef = this.dialog.open(CloseDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result == "yes") {
          this.spinner.show();
          this.service.DeleteLeaseDraft(ids).subscribe(res => {
            this.spinner.hide();
            this.notificationSnackBarComponent.openSnackBar("Deleted Sucessfully", SnackBarStatus.success);
            this.getAllDrafts();
          },
            err => {
              console.log(err);
              this.spinner.hide();
            });
        }

      });
    }

    else {
      this.notificationSnackBarComponent.openSnackBar("Please select a document", SnackBarStatus.warning);
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

  DownloadLeaseDrafts() {
    if (this.selection.selected.length > 0) {
      this.selection.selected.forEach((draft: LeaseDraft) => {
        this.service.DownloadLeaseDraft(draft.documentID).subscribe((res) => {
          let blob: any = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          saveAs(blob, `${draft.documentName}.docx`);
          console.log(`${draft.documentName} downloaded`);
        },
          err => {
            console.log(err);
          });
      });
    }
    else {
      this.notificationSnackBarComponent.openSnackBar("Please select a document", SnackBarStatus.warning);
    }
  }

  openSendMailDialog(documentID) {
    const dialogRef = this.dialog.open(SendMailDialogComponent,
      {
        panelClass: "send-mail-dialog",
        data: { documentID: documentID }
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log("send-mail-dialog", res);
        this.spinner.show();
        this.service.SendMailFromDraft(res).subscribe(() => {
          console.log("Mail sent");
          this.notificationSnackBarComponent.openSnackBar("Email has been sent", SnackBarStatus.success);
          this.spinner.hide();
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      }
    });
  }
  sideNavStatus($event) {
    this.switchSideNav.emit($event);
  }
  autoSaveDraft() {
    if (this.editor1change) {
      var doc = new LeaseDraftDocumentView();
      doc.documentID = this.leaseDraft1.documentID;
      doc.documentContent = this.leaseDraft1.documentContent;
      this.saveLeaseDraftDocument(doc, 1);
    }
    if (this.editor2change) {
      var doc = new LeaseDraftDocumentView();
      doc.documentID = this.leaseDraft2.documentID;
      doc.documentContent = this.leaseDraft2.documentContent;
      this.saveLeaseDraftDocument(doc, 2);
    }
  }
  isSaved1: boolean = false;
  isSaved2: boolean = false;
  saveLeaseDraftDocument(draftDocument: LeaseDraftDocumentView, editor: number) {
    if (editor == 1) {
      this.isSaved1 = true;
    }
    else {
      this.isSaved2 = true;
    }
    this.service.SaveLeaseDraftDocument(draftDocument).subscribe(() => {
      console.log("document saved");
      if (editor == 1) {
        this.editor1change = false;
      }
      else {
        this.editor2change = false;
      }
    },
      err => {
        console.log(err);
      });
  }
}
