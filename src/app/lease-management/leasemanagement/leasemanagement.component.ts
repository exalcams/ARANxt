import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { GDriveComponent } from 'src/app/g-drive/g-drive.component';
import { LeaseManagementService } from 'src/app/service/lease-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DraftDialogComponent } from 'src/app/draft-dialog/draft-dialog.component';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/notification/notification-snack-bar/notification-snackbar-status-enum';
import { LeaseDraft } from 'src/app/Model/Leasemanagement';
export interface UserData {

  Documentname: string;
  Filesize: string;
  CreatedOn: string;
  Actions: any
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
export class LeasemanagementComponent implements OnInit {
  displayedColumns: string[] = ['select', 'documentOwner', 'documentType', 'documentName', 'createdOn', 'modifiedOn', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
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
  notificationSnackBarComponent: NotificationSnackBarComponent;
  @Output() toggleFold: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSideNav(value: boolean) {
    this.toggleFold.emit(!value);
  }

  newLeaseDraft: LeaseDraft = new LeaseDraft();
  leaseDraft1: LeaseDraft = new LeaseDraft();
  leaseDraft2: LeaseDraft = new LeaseDraft();

  constructor(private dialog: MatDialog, private service: LeaseManagementService,
    private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar) {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  ngOnInit(): void {
    this.getAllDrafts();
  }

  getAllDrafts() {
    this.spinner.show();
    this.service.GetLeaseDrafts().subscribe(res => {
      this.LeaseDrafts = res;
      this.dataSource = new MatTableDataSource(this.LeaseDrafts);
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
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Documentname + 1}`;
  }
  onSelect(event): void {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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
    const dialogRef = this.dialog.open(GDriveComponent,
      {
        panelClass: "g-drive-dialog"
      }
    );
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.files.push(res.file);
        this.cdr.detectChanges();
      }
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
  addDraftToTable() {
    if (this.files.length > 0) {
      this.openDraftDialog(2);
    }
    else {
      this.notificationSnackBarComponent.openSnackBar("Please attach document", SnackBarStatus.danger);
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

  openDraftDialog(mode: number) {          //1.new draft  2.edit draft  3.upload doc
    const dialogRef = this.dialog.open(DraftDialogComponent,
      {
        panelClass: "draft-dialog"
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
          this.saveLeaseDraft(this.newLeaseDraft);
        }
        else {
          //convert and save lease draft
        }
      }
    });
  }
  saveLeaseDraft(draft: LeaseDraft) {
    this.spinner.show();
    this.service.SaveLeaseDraft(draft).subscribe(() => {
      this.spinner.hide();
      this.getAllDrafts();
      console.log("draft saved");
    },
      err => {
        this.spinner.hide();
        console.log(err);
      });
  }
  openDratEdtitor(row: LeaseDraft) {
    this.selectedPage = 'edit';
    this.editor1 = true;
    this.editor2 = false;
    this.leaseDraft1 = row;
  }
  openMultiDraftEditor() {
    if (this.selection.selected.length == 0) {
      this.notificationSnackBarComponent.openSnackBar("Plese select document to edit", SnackBarStatus.danger);
    }
    else {
      console.log(this.selection.selected);
      this.selectedPage = 'edit';
      if (this.selection.selected.length >= 2) {
        // this.leaseDraft1 = this.selection.selected[1];
        // this.leaseDraft2 = this.selection.selected[2];
        this.editor1 = true;
        this.editor2 = true;
      }
      else {
        this.leaseDraft1 = this.selection.selected[1];
        this.editor1 = true;
        this.editor2 = false;
      }
    }
  }
  saveNewDraft() {
    this.openDraftDialog(1);
  }
  saveDraft1() {
    this.saveLeaseDraft(this.leaseDraft1);
  }
  saveDraft2() {
    this.saveLeaseDraft(this.leaseDraft2);
  }
}
