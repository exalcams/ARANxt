import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FinishComponent } from '../finish/finish.component';
import { MapsAPILoader } from '@agm/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpaceService } from '../space/space.service';
import { AddrLink, ARA_Space, ARA_SpaceAll, AreaLink, ContractLink, DateLink, DocumentLink, LocLink, PartnerLink, SiteLink } from '../space/spacemodel';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { PartnerLinkComponent } from '../partner-link/partner-link.component';
import { DateLinkComponent } from '../date-link/date-link.component';
import { ContractLinkComponent } from '../contract-link/contract-link.component';
import { LoginService } from '../login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NotificationSnackBarComponent } from '../notification/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from '../notification/notification-snack-bar/notification-snackbar-status-enum';
import { OthersComponent } from '../others/others.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpaceComponent implements OnInit {
  public GeneralForm: FormGroup;
  LocLinkView: LocLink = new LocLink();
  AreaLinkView: AreaLink = new AreaLink();
  AddressLinkView: AddrLink = new AddrLink();
  DocLinkView: DocumentLink = new DocumentLink();
  GeneralSpaceView: ARA_Space = new ARA_Space();
  Space_All: ARA_SpaceAll = new ARA_SpaceAll();
  SpaceList: ARA_SpaceAll[] = [];
  PartnerLinkView: PartnerLink = new PartnerLink();
  ContractLinkView: ContractLink = new ContractLink();
  DateLinkView: DateLink = new DateLink();
  PartnerLink: any[] = [];
  DocLink: any[] = [];
  DateLink: any[] = [];
  ContractLink: any[] = [];
  ARASite: SiteLink[] = [];
  SiteName: any[] = [];
  title: string = 'AGM project';
  progress = 12.5;
  steps = 8;
  progressvalue: any;
  latitude: any;
  longitude: any;
  zoom: number;
  address1: string;
  private geoCoder;
  selectedFood1: string | undefined;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  DocumentdisplayedColumns: string[] = ['fileName', 'fileSize', 'fileExt', 'user', 'date', 'time', 'attID',];
  displayedColumns2: string[] = ['type', 'title', 'startDate', 'endDate', 'coverValue', 'vendor', 'exclusions'];

  displayedColumns1 = ['partnerType', 'partnerID', 'startDate', 'endDate'];
  DatedisplayedColumns = ['StartDate', 'EndDate', 'Time', 'TimeStamp'];
  HeaderDetailsDataSource: MatTableDataSource<PartnerLink>;
  DocumentLinkDataSource: MatTableDataSource<DocumentLink>;
  DateLinkDataSource: MatTableDataSource<DateLink>;
  ContractLinkDataSource: MatTableDataSource<ContractLink>;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  General: boolean = true;
  Location: boolean;
  Document: boolean;
  Partner: boolean;
  Space: boolean;
  Address: boolean;
  Date: boolean;
  Contract: boolean;
  imgSrc: string;
  imgSrc1: string;
  selectedIndex: any = "General";
  previous: boolean;
  next: boolean = true;
  finish: boolean;
  AddressForm: FormGroup;
  LocationForm: FormGroup;
  SpaceForm: FormGroup;
  latitude1: any;
  longitude1: any;
  PartnerLinkFormValidStatus: any = false;
  DateLinkFormValidStatus: any = false;
  ContrctFormValidStatus: any = false;
  newbool: boolean;
  listselectedbool: boolean;

  onFoodSelection1() {
    console.log(this.selectedFood1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  countries = [
    { id: 1, name: "Renew" },
    { id: 2, name: "Manufacture" },

  ];
  country = [
    { id: 1, name: "India" },
    // { id: 2, name: "USA" },

  ];
  State = [
    { id: 1, name: "TamilNadu" },
    { id: 2, name: "Kerala" },

  ];
  // ObjectType = ["A", "B", "C"];
  ObjectType = [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' }
  ];
  Catagories = [
    { name: "Electrical Distribution" },
    { name: "Energy Consumption" },
    { name: "HVAC" },
    { name: "Water Consumption" },
    { name: "Power Resource" },
    { name: "Parking Access Control" },
    { name: "CCTV" },
    { name: "Fire Alaram" },
    { name: "Others" }
  ]
  parentID: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  // @Inject(MAT_DIALOG_DATA) public dialogData: any,
  // public dialogRef: MatDialogRef<CloseDialogComponent>,
  constructor(public dialog: MatDialog, private mapsAPILoader: MapsAPILoader, public form: FormBuilder, private snackBar: MatSnackBar,
    private service: SpaceService,    private spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public dialogData: any, private cdr: ChangeDetectorRef,
    private ngZone: NgZone, public dialogRef: MatDialogRef<SpaceComponent>, public nav: LoginService) { this.nav.islogin(true); }
  private setCurrentLocation() {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.latitude1 =this.latitude.tostring();
        // this.longitude1 =this.longitude.tostring();
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address1 = results[0].formatted_address;
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    this.parentID = localStorage.getItem('ParentID');
    this.listselectedbool = false;
    this.GetDocumentDetails();
    // this.GetParterLink();
    // this.GetDateLink();
    // this.GetContractLink();
    this.GetARASite();
    this.GetSpaceBySite();
    this.InitializeGeneralform();
    this.InitializeLocationform();
    this.InitializeAddressform();
    this.InitializeSpaceform();

  }
  GetARASite() {
    this.service.GetARASite().subscribe(
      (res) => {
        this.ARASite = res as SiteLink[];
        console.log("ARASite", this.ARASite);

      }
    );
  }
  GetSpaceBySite() {
    this.service.GetSpaceBySite(this.dialogData.selectedid).subscribe(
      (res) => {
        console.log("res", res);

        this.SpaceList = res as ARA_SpaceAll[];
        console.log("SpaceList", this.SpaceList);

      }
    );
  }
  GetDocumentDetails() {
    // this.service.GetDocLink().subscribe(
    //   (data) => {
    //     if (data) {
    //       this.DocLink = data;
    //       this.DocumentLinkDataSource = new MatTableDataSource(this.DocLink);
    //       //this.isProgressBarVisibile = false;
    //     }
    //   }
    // );
  }
  // GetParterLink() {
  //   this.service.GetParterLink().subscribe(
  //     (data) => {
  //       if (data) {
  //         this.PartnerLink = data;
  //         console.log("partnerlink",this.PartnerLink);

  //         this.HeaderDetailsDataSource = new MatTableDataSource(this.PartnerLink);


  //       }
  //     }
  //   );
  // }
  // GetDateLink() {
  //   this.service.GetDateLink().subscribe(
  //     (data) => {
  //       if (data) {
  //         this.DateLink = data;
  //         this.DateLinkDataSource = new MatTableDataSource(this.DateLink);
  //         //this.isProgressBarVisibile = false;
  //       }
  //     }
  //   );
  // }
  // GetContractLink() {
  //   this.service.GetContractLink().subscribe(
  //     (data) => {
  //       if (data) {
  //         this.ContractLink = data;
  //         this.ContractLinkDataSource = new MatTableDataSource(this.ContractLink);
  //         //this.isProgressBarVisibile = false;
  //       }
  //     }
  //   );
  // }
  InitializeGeneralform() {
    this.GeneralForm = this.form.group({
      spaceName: ['', [Validators.required]],
      objectType: ['', [Validators.required]],
      // siteName: ['', [Validators.required]],
      partnerID: ['', [Validators.required]],
      category: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  InitializeLocationform() {
    this.LocationForm = this.form.group({
      Latitude: ['', [Validators.required]],
      Longitude: ['', [Validators.required]],
      FromLatitude: ['', [Validators.required]],
      ToLatitude: ['', [Validators.required]],
      FromLongitude: ['', [Validators.required]],
      ToLongitude: ['', [Validators.required]]
    });
  }
  InitializeSpaceform() {
    this.SpaceForm = this.form.group({
      TotalSpace: ['', [Validators.required]],
      RentableSpace: ['', [Validators.required]],
      Breath: ['', [Validators.required]],
      Volume: ['', [Validators.required]],
      CarpetSpace: ['', [Validators.required]],
      Length: ['', [Validators.required]],
      Height: ['', [Validators.required]],
    });
  }
  InitializeAddressform() {
    this.AddressForm = this.form.group({
      AddressLine1: ['', [Validators.required]],
      AddressLine2: ['', [Validators.required]],
      AddressLine3: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Pincode: ['', [Validators.required]],
      State: ['', [Validators.required]],

    });
  }

  // moveToSelectedTab(tabName: string) {
  //   for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
  //       if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
  //         (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
  //       }
  //     }
  // }
  NewSpace() {
    this.listselectedbool = false;
    this.generaltab();
    this.GeneralForm.enable();
    this.LocationForm.enable();
    this.SpaceForm.enable();
    this.AddressForm.enable();
    this.reset();
  }
  reset() {
    this.GeneralForm.reset();
    this.LocationForm.reset();
    this.SpaceForm.reset();
    this.AddressForm.reset();
    this.DocLink = [];
    this.DocumentLinkDataSource = new MatTableDataSource(this.DocLink);
    this.PartnerLink = [];
    this.DateLinkFormValidStatus=false;
    this.PartnerLinkFormValidStatus=false;
    this.ContrctFormValidStatus=false;
    this.HeaderDetailsDataSource = new MatTableDataSource(this.PartnerLink);
    this.ContractLink = [];
    this.ContractLinkDataSource = new MatTableDataSource(this.ContractLink);
    this.DateLink = [];
    this.DateLinkDataSource = new MatTableDataSource(this.DateLink);
    // this.HeaderDetailsDataSource = null;
    // this.DocumentLinkDataSource = null;
    // this.ContractLinkDataSource = null;
    // this.DateLinkDataSource = null;
    //  HeaderDetailsDataSource: MatTableDataSource<PartnerLink>;
    //  DocumentLinkDataSource: MatTableDataSource<DocumentLink>;
    //  DateLinkDataSource: MatTableDataSource<DateLink>;
    //  ContractLinkDataSource: MatTableDataSource<ContractLink>;

  }
  listselected(SpaceSelected) {
    this.spinner.show();
    this.reset()
    this.generaltab();
    this.listselectedbool = true;
    
    console.log("SpaceSelected", SpaceSelected);
  
    this.GeneralForm.disable();
    this.GeneralForm.patchValue({
      spaceName: SpaceSelected.arA_space.title,
      objectType: SpaceSelected.arA_space.objType,
      partnerID: SpaceSelected.arA_space.partnerID,
      category: SpaceSelected.arA_space.category,
      costCenter: SpaceSelected.arA_space.costCenter,
    });
    this.LocationForm.disable();
    this.LocationForm.patchValue({
      Latitude: SpaceSelected.locLink.lat,
      Longitude: SpaceSelected.locLink.long,
      FromLatitude: SpaceSelected.locLink.fromLat,
      ToLatitude: SpaceSelected.locLink.toLat,
      FromLongitude: SpaceSelected.locLink.fromLong,
      ToLongitude: SpaceSelected.locLink.toLong,
    });

    this.SpaceForm.disable();

    this.SpaceForm.patchValue({
      TotalSpace: SpaceSelected.areaLink.totalArea,
      RentableSpace: SpaceSelected.areaLink.rentableArea,
      Breath: SpaceSelected.areaLink.breath,
      Volume: SpaceSelected.areaLink.volume,
      CarpetSpace: SpaceSelected.areaLink.carpetArea,
      Length: SpaceSelected.areaLink.length,
      Height: SpaceSelected.areaLink.height,
    });
    this.AddressForm.disable();
    this.AddressForm.patchValue({
      AddressLine1: SpaceSelected.addrLink.addrLine1,
      AddressLine2: SpaceSelected.addrLink.addrLine2,
      AddressLine3: SpaceSelected.addrLink.addrLine3,
      Country: SpaceSelected.addrLink.country,
      Pincode: SpaceSelected.addrLink.pinCode,
      State: SpaceSelected.addrLink.state,
    });
    this.DocLink = [];
    this.DocLink.push(SpaceSelected.docLink);
    this.DocumentLinkDataSource = null;
    this.DocumentLinkDataSource = new MatTableDataSource(this.DocLink);
    this.HeaderDetailsDataSource = null;
    this.PartnerLink = [];
    this.PartnerLink.push(SpaceSelected.partnerLink);
    this.HeaderDetailsDataSource = new MatTableDataSource(this.PartnerLink);
    this.ContractLinkDataSource = null;
    this.ContractLink = [];
    this.ContractLink.push(SpaceSelected.contractLink);
    this.ContractLinkDataSource = new MatTableDataSource(this.ContractLink);
    this.DateLinkDataSource = null;
    this.DateLink = [];
    this.DateLink.push(SpaceSelected.dateLink);
    this.DateLinkDataSource = new MatTableDataSource(this.DateLink);
    this.spinner.hide();
  }
  general()
  {
    if ((this.GeneralForm.invalid)  && (this.LocationForm.invalid && this.DocumentLinkDataSource == null && !this.PartnerLinkFormValidStatus && this.SpaceForm.invalid && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.generaltab();
    }

    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.generaltab();
      }
    }
  }
  generaltab() {
  
    this.General = true;
    this.Location = false;
    this.Document = false;
    this.Partner = false;
    this.Space = false;
    this.Address = false;
    this.Date = false;
    this.Contract = false;
    this.selectedIndex = "General";
    this.previous = false;
    this.next = true;
    this.finish = false;
    // }

  }
  location() {
    if ((this.GeneralForm.valid) && (this.General) && (this.LocationForm.invalid && this.DocumentLinkDataSource == null && !this.PartnerLinkFormValidStatus && this.SpaceForm.invalid && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.locationtab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.locationtab();
    }
    else if (this.listselectedbool) {

      this.locationtab();
    }
    else if (this.GeneralForm.invalid && this.General ) {
      this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.LocationForm.invalid && this.Location ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.locationtab();
      }
    }
  }
  Others(eve) {
    if (eve == "General") {
      if (this.GeneralForm.valid) {
        return true;
      } else {
        this.ShowValidationErrors(this.GeneralForm);
        return false;
      }
    }
    if (eve == "Document") {
      if (this.DocumentLinkDataSource != null) {
        return true;
      } else {
      this.notificationSnackBarComponent.openSnackBar("Please upload a document", SnackBarStatus.warning);
        return false;
      }
    }
    if (eve == "Partner") {
      if (this.PartnerLinkFormValidStatus) {
        return true;
      } else {
      this.notificationSnackBarComponent.openSnackBar("Please add new partner", SnackBarStatus.warning);

        return false;
      }
    }
    if (eve == "Location") {
      if (this.LocationForm.valid) {
        return true;
      } else {
        this.ShowValidationErrors(this.LocationForm);
        return false;
      }
    }
    if (eve == "Space") {
      if (this.SpaceForm.valid ) {
        return true;
      } else {
        this.ShowValidationErrors(this.SpaceForm);
        return false;
      }
    }
    if (eve == "Address") {
      if (this.AddressForm.valid ) {
        return true;
      } else {
        this.ShowValidationErrors(this.AddressForm);
        return false;
      }
    }
    if (eve == "Date") {
      if (this.DateLinkFormValidStatus ) {
        return true;
      } else {
        this.notificationSnackBarComponent.openSnackBar("Please add new DateLink", SnackBarStatus.warning);
        return false;
      }
    }
    if (eve == "Contract") {
      if (this.ContrctFormValidStatus ) {
        return true;
      } else {
        this.notificationSnackBarComponent.openSnackBar("Please add new ContractLink", SnackBarStatus.warning);
        return false;
      }
    }
  }
  locationtab() {
    this.General = false;
    this.Location = true;
    this.Document = false;
    this.Partner = false;
    this.Space = false;
    this.Address = false;
    this.Date = false;
    this.Contract = false;
    this.selectedIndex = "Location";
    this.previous = true;
    this.next = true;
    this.finish = false;
  }
  document() {

    if ((this.LocationForm.valid) && (this.Location) && (this.GeneralForm.valid && this.DocumentLinkDataSource == null && !this.PartnerLinkFormValidStatus && this.SpaceForm.invalid && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.documenttab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.documenttab();
    }
    else if (this.listselectedbool) {

      this.documenttab();
    }
    else if (this.LocationForm.invalid && this.Location) {
      this.ShowValidationErrors(this.LocationForm)
    }
    
    else if (this.DocumentLinkDataSource == null && this.Document ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.documenttab();
      }
    
    }
  }
  documenttab() {
    this.General = false;
    this.Location = false;
    this.Document = true;
    this.Partner = false;
    this.Space = false;
    this.Address = false;
    this.Date = false;
    this.Contract = false;
    this.selectedIndex = "Document";
    this.previous = true;
    this.next = true;
    this.finish = false;
  }
  partner()
  {
    if ((this.DocumentLinkDataSource != null) && (this.Document) && (this.GeneralForm.valid && this.LocationForm.valid  && !this.PartnerLinkFormValidStatus && this.SpaceForm.invalid && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.partnertab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.partnertab();
    }
    else if (this.listselectedbool) {

      this.partnertab();
    }
    else if (this.DocumentLinkDataSource == null&& this.Document) {
      this.notificationSnackBarComponent.openSnackBar("Please upload a document", SnackBarStatus.warning);
    }
    
    else if (!this.PartnerLinkFormValidStatus && this.Partner ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.partnertab();
      }
    
    }
  }
  partnertab() {
   
        this.General = false;
        this.Location = false;
        this.Document = false;
        this.Partner = true;
        this.Space = false;
        this.Address = false;
        this.Date = false;
        this.Contract = false;
        this.selectedIndex = "Partner";
        this.previous = true;
        this.next = true;
        this.finish = false;
      
  
  }
  space()
  {
    if ((this.PartnerLinkFormValidStatus) && (this.Partner) && (this.GeneralForm.valid && this.LocationForm.valid && this.DocumentLinkDataSource != null  && this.SpaceForm.invalid && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.spacetab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.spacetab();
    }
    else if (this.listselectedbool) {

      this.spacetab();
    }
    else if (!this.PartnerLinkFormValidStatus && this.Partner) {
      this.notificationSnackBarComponent.openSnackBar("Please add new partner", SnackBarStatus.warning);
    }
   
    else if (this.SpaceForm.invalid && this.Space ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.spacetab();
      }
    }
  }
  spacetab() {

        this.General = false;
        this.Location = false;
        this.Document = false;
        this.Partner = false;
        this.Space = true;
        this.Address = false;
        this.Date = false;
        this.Contract = false;
        this.selectedIndex = "Space";
        this.previous = true;
        this.next = true;
        this.finish = false;

    
  }
  address()
  {
    if ((this.SpaceForm.valid) && (this.Space) && (this.GeneralForm.valid && this.LocationForm.valid && this.DocumentLinkDataSource != null  && this.AddressForm.invalid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.addresstab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.addresstab();
    }
    else if (this.listselectedbool) {

      this.addresstab();
    }
    else if (this.SpaceForm.invalid && this.Space) {
     this.ShowValidationErrors(this.SpaceForm);
    }
 
    else if (this.AddressForm.invalid && this.Address ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.addresstab();
      }
    }
  }
  
  addresstab() {
  
        this.General = false;
        this.Location = false;
        this.Document = false;
        this.Partner = false;
        this.Space = false;
        this.Address = true;
        this.Date = false;
        this.Contract = false;
        this.selectedIndex = "Address";
        this.previous = true;
        this.next = true;
        this.finish = false;
    
 
  }
  date(){
    if ((this.AddressForm.valid) && (this.Address) && (this.GeneralForm.valid && this.SpaceForm.valid && this.LocationForm.valid && this.DocumentLinkDataSource != null  && this.SpaceForm.valid && this.AddressForm.valid && !this.DateLinkFormValidStatus && !this.ContrctFormValidStatus)) {
      this.datetab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.datetab();
    }
    else if (this.listselectedbool) {

      this.datetab();
    }
    else if (this.AddressForm.invalid && this.Address) {
     this.ShowValidationErrors(this.AddressForm);
    }
   
    else if (!this.DateLinkFormValidStatus && this.Date ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.datetab();
      }
    }
  }
  datetab() {
  
        this.General = false;
        this.Location = false;
        this.Document = false;
        this.Partner = false;
        this.Space = false;
        this.Address = false;
        this.Date = true;
        this.Contract = false;
        this.selectedIndex = "Date";
        this.previous = true;
        this.next = true;
        this.finish = false;
   
  }
  contract()
  {
    if ((this.DateLinkFormValidStatus) && (this.Date) && (this.GeneralForm.valid && this.SpaceForm.valid && this.LocationForm.valid && this.DocumentLinkDataSource != null  && this.SpaceForm.valid && this.AddressForm.valid  && !this.ContrctFormValidStatus)) {
      this.contracttab();
    }
    else if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {

      this.contracttab();
    }
    else if (this.listselectedbool) {

      this.contracttab();
    }
    else if (!this.DateLinkFormValidStatus && this.Date) {
      this.notificationSnackBarComponent.openSnackBar("Please add new DateLink", SnackBarStatus.warning);
    }
   
    else if (!this.ContrctFormValidStatus && this.Contract ) {
      // this.ShowValidationErrors(this.GeneralForm)
    }
    else if (this.selectedIndex) {
      var a = this.Others(this.selectedIndex);
      if (a) {
        this.contracttab();
      }
    }
  }
  contracttab() {

      this.General = false;
      this.Location = false;
      this.Document = false;
      this.Partner = false;
      this.Space = false;
      this.Address = false;
      this.Date = false;
      this.Contract = true;
      this.selectedIndex = "Contract";
      this.previous = true;
      this.next = false;
      this.finish = true;
   
  }

  ShowValidationErrors(eve: FormGroup): void {
    Object.keys(eve.controls).forEach(key => {
      eve.get(key).markAsTouched();
      eve.get(key).markAsDirty();
    });
  }
  Nexttab(eve) {
    if (this.General && eve == "location" && this.LocationForm.invalid) {
      this.Next();
    }
    if (this.Location && eve == "document" && this.DocumentLinkDataSource == null) {
      this.Next();
    }
    if (this.Document && eve == "partner") {
      this.Next();
    }
  }
  Next() {
    switch (this.selectedIndex) {
      case "General":
        this.location();
        break;
      case "Location":
        this.document();
        break;
      case "Document":
        this.partner();
        break;
      case "Partner":
        this.space();
        break;
      case "Space":
        this.address();
        break;
      case "Address":
        this.date();
        break;
      case "Date":
        this.contract();
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        break;
    }
    this.progressbar()
  }

  Previous() {
    switch (this.selectedIndex) {
      case "Contract":
        this.date();
        break;
      case "Date":
        this.address();
        break;
      case "Address":
        this.space();
        break;
      case "Space":
        this.partner();
        break;
      case "Partner":
        this.document();
        break;
      case "Document":
        this.location();
        break;
      case "Location":
        this.general();
        break;

    }
    this.progressbarminus()
  }

  Finishpopup() {

    this.dialog.open(FinishComponent,
      {
        panelClass: 'finish',
        width: '50%',
        maxWidth: '85.5vw ',
        height: "351px",
        disableClose: true
      }
    );
    this.GeneralSpaceView.Title = this.GeneralForm.get('spaceName').value;
    this.GeneralSpaceView.ObjType = this.GeneralForm.get('objectType').value;
    // this.GeneralSpaceView.Site = this.GeneralForm.get('siteName').value;
    this.GeneralSpaceView.PartnerID = this.GeneralForm.get('partnerID').value;
    this.GeneralSpaceView.Category = this.GeneralForm.get('category').value;
    this.GeneralSpaceView.CostCenter = this.GeneralForm.get('costCenter').value;
    this.GeneralSpaceView.ParentID = this.parentID;
    this.service.ARA_Space(this.GeneralSpaceView).subscribe((x) => {
      console.log(x);
    },
      err => {
        console.log(err);

      })
    console.log(this.GeneralForm.value);
    this.LocLinkView.Long = this.LocationForm.get('Longitude').value;
    this.LocLinkView.ToLat = this.LocationForm.get('ToLatitude').value;
    this.LocLinkView.FromLat = this.LocationForm.get('FromLatitude').value;
    this.LocLinkView.FromLong = this.LocationForm.get('FromLongitude').value;
    this.LocLinkView.ToLong = this.LocationForm.get('ToLongitude').value;
    this.LocLinkView.Lat = this.LocationForm.get('Latitude').value;
    console.log(this.LocLinkView);
    this.service.AddLocLink(this.LocLinkView).subscribe((x) => {
      console.log(x);
    })
    this.AreaLinkView.TotalArea = this.SpaceForm.get('TotalSpace').value;
    this.AreaLinkView.RentableArea = this.SpaceForm.get('RentableSpace').value;
    this.AreaLinkView.Breath = this.SpaceForm.get('Breath').value;
    this.AreaLinkView.Volume = this.SpaceForm.get('Volume').value;
    this.AreaLinkView.CarpetArea = this.SpaceForm.get('CarpetSpace').value;
    this.AreaLinkView.Length = this.SpaceForm.get('Length').value;
    this.AreaLinkView.Height = this.SpaceForm.get('Height').value;
    console.log(this.AreaLinkView);
    this.service.AreaLocLink(this.AreaLinkView).subscribe((x) => {
      console.log(x);
    })
    this.AddressLinkView.AddrLine1 = this.AddressForm.get('AddressLine1').value;
    this.AddressLinkView.AddrLine2 = this.AddressForm.get('AddressLine2').value;
    this.AddressLinkView.AddrLine3 = this.AddressForm.get('AddressLine3').value;
    this.AddressLinkView.Country = this.AddressForm.get('Country').value;
    this.AddressLinkView.PinCode = this.AddressForm.get('Pincode').value;
    this.AddressLinkView.State = this.AddressForm.get('State').value;
    console.log(this.AddressLinkView);
    this.service.AddressLocLink(this.AddressLinkView).subscribe((x) => {
      console.log(x);

    })

    this.dialogRef.close();

  }
  SpaceAllSave(): void {
    if (this.LocationForm.valid && this.DocumentLinkDataSource != null && this.GeneralForm.valid && this.PartnerLinkFormValidStatus && this.SpaceForm.valid && this.AddressForm.valid && this.DateLinkFormValidStatus && this.ContrctFormValidStatus) {


      const dialogConfig: MatDialogConfig = {
        data: {
          spacename: this.GeneralForm.get('spaceName').value,

        },
        panelClass: 'finish',
        width: '50%',
        maxWidth: '85.5vw ',
        height: '351px',
        disableClose: true
      };
      this.GeneralSpaceGetData();
      this.LocationSpaceGetData();
      this.SpaceSpaceGetData();
      this.AddressSpaceGetData();
      this.Space_All.ARA_space = this.GeneralSpaceView
      this.Space_All.locLink = this.LocLinkView;
      this.Space_All.docLink = this.DocLinkView;
      this.Space_All.partnerLink = this.PartnerLinkView;
      this.Space_All.areaLink = this.AreaLinkView;
      this.Space_All.addrLink = this.AddressLinkView;

      this.Space_All.dateLink = this.DateLinkView;
      this.Space_All.contractLink = this.ContractLinkView;

      console.log("allSpace", this.Space_All);
      this.service.SpaceAllSave(this.Space_All).subscribe((x) => {
        console.log(x);
        this.reset();
        const dialogRef = this.dialog.open(FinishComponent, dialogConfig);
      },
        err => {
          // this.spinner.hide();
          console.log(err);

        })
    }
    else   {
      this.notificationSnackBarComponent.openSnackBar("The form is invalid", SnackBarStatus.warning);
    }
  }
  GeneralSpaceGetData() {
    this.GeneralSpaceView.Title = this.GeneralForm.get('spaceName').value;
    this.GeneralSpaceView.ObjType = this.GeneralForm.get('objectType').value;
    this.GeneralSpaceView.Site = this.dialogData.parentofSelectedid;
    // this.GeneralSpaceView.PartnerID = this.GeneralForm.get('partnerID').value;
    this.GeneralSpaceView.PartnerID = 1;
    this.GeneralSpaceView.Category = this.GeneralForm.get('category').value;
    this.GeneralSpaceView.CostCenter = this.GeneralForm.get('costCenter').value;
    // this.GeneralSpaceView.ParentID = this.parentID;
    this.GeneralSpaceView.ParentID = this.dialogData.selectedid;

  }
  LocationSpaceGetData() {
    this.LocLinkView.Long = this.LocationForm.get('Longitude').value.toString();
    // this.LocLinkView.Long ="5636";

    this.LocLinkView.ToLat = this.LocationForm.get('ToLatitude').value;
    this.LocLinkView.FromLat = this.LocationForm.get('FromLatitude').value;
    this.LocLinkView.FromLong = this.LocationForm.get('FromLongitude').value;
    this.LocLinkView.ToLong = this.LocationForm.get('ToLongitude').value;
    this.LocLinkView.Lat = this.LocationForm.get('Latitude').value.toString();
    // this.LocLinkView.Lat = "14";

  }
  SpaceSpaceGetData() {
    this.AreaLinkView.TotalArea = this.SpaceForm.get('TotalSpace').value;
    this.AreaLinkView.RentableArea = this.SpaceForm.get('RentableSpace').value;
    this.AreaLinkView.Breath = this.SpaceForm.get('Breath').value;
    this.AreaLinkView.Volume = this.SpaceForm.get('Volume').value;
    this.AreaLinkView.CarpetArea = this.SpaceForm.get('CarpetSpace').value;
    this.AreaLinkView.Length = this.SpaceForm.get('Length').value;
    this.AreaLinkView.Height = this.SpaceForm.get('Height').value;
  }
  AddressSpaceGetData() {
    this.AddressLinkView.AddrLine1 = this.AddressForm.get('AddressLine1').value;
    this.AddressLinkView.AddrLine2 = this.AddressForm.get('AddressLine2').value;
    this.AddressLinkView.AddrLine3 = this.AddressForm.get('AddressLine3').value;
    this.AddressLinkView.Country = this.AddressForm.get('Country').value;
    this.AddressLinkView.PinCode = this.AddressForm.get('Pincode').value;
    this.AddressLinkView.State = this.AddressForm.get('State').value;
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      var unit = "";
      // console.log(event.target.files[0].name);
      var fileName = event.target.files[0].name;
      var size = event.target.files[0].size
      var ext = fileName.split('.').pop();
      var file_name_array = fileName.split(".");
      var file = file_name_array[0];
      if (size < 1000) {
        size = size;
        unit = "bytes";
      } else if (size < 1000 * 1000) {
        size = size / 1000;
        unit = "kb";
      } else if (size < 1000 * 1000 * 1000) {
        size = size / 1000 / 1000;
        unit = "mb";
      } else {
        size = size / 1000 / 1000 / 1000;
        unit = "gb";
      }
      // this.DocLink=null
      this.DocLink = [];
      this.DocLinkView.fileName = file;
      this.DocLinkView.fileSize = size + unit;
      this.DocLinkView.fileExt = ext;
      this.DocLinkView.user = "User";
      // this.DocLinkView.date=new Date();
      this.DocLink.push(this.DocLinkView);
      this.DocumentLinkDataSource = null;
      this.DocumentLinkDataSource = new MatTableDataSource(this.DocLink);
      console.log(this.DocumentLinkDataSource, 'DocLink');

      // this.service.DocumentLocLink(this.DocLinkView).subscribe((x) => {
      //   console.log(x);
      // },
      //   err => {
      //     console.log(err);
      //   })
    }
  }
  OpenPartnerdialogue() {
    const dialogRef = this.dialog.open(PartnerLinkComponent,
      {
        panelClass: 'partner',
        width: '44%',
        maxWidth: '85.5vw ',
        height: '294px',
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // if (  !result ) {
      this.PartnerLink = [];
      this.cdr.detectChanges();
      this.PartnerLinkView = result[0].PartnerLinkView;
      this.PartnerLinkFormValidStatus = result[0].partnerLinkForm;
      this.HeaderDetailsDataSource = null;

      this.PartnerLink.push(this.PartnerLinkView);
      this.HeaderDetailsDataSource = new MatTableDataSource(this.PartnerLink);
      console.log("partner", this.PartnerLinkView);
      console.log("PartnerLinkFormValidStatus", this.PartnerLinkFormValidStatus);

      // }
    })
  }
  OpenDateLinkDialogue() {
    const dialogRef = this.dialog.open(DateLinkComponent,
      {
        height: '311px',
        width: '36%',
        panelClass: "Datelink",
        maxWidth: '85.5vw ',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(result => {


      this.DateLinkView = result[0].DateLinkView;
      this.DateLinkFormValidStatus = result[0].DateLinkForm;
      this.DateLinkDataSource = null;
      this.DateLink = []
      this.DateLink.push(this.DateLinkView);
      this.DateLinkDataSource = new MatTableDataSource(this.DateLink);
      console.log("Date", this.DateLinkView);

    })
  }
  OpenContractLinkDialogue() {
    const dialogRef = this.dialog.open(ContractLinkComponent,
      {
        height: '328px',
        width: '54%',
        panelClass: "contractlink"
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      this.ContractLinkView = result[0].ContractLinkView;
      this.ContrctFormValidStatus = result[0].ContractLinkForm;
      this.ContractLinkDataSource = null;
      this.ContractLink = [];
      this.ContractLink.push(this.ContractLinkView);
      this.ContractLinkDataSource = new MatTableDataSource(this.ContractLink);
      console.log("contrct", this.ContractLinkView);
    })
  }
  close(): void {
    this.dialogRef.close();
  }

  progressbar() {
    this.progress = this.progress + 12.5;
    this.progressvalue = this.progress
    this.stepsforprogressminus()
  }
  stepsforprogressminus() {
    this.steps = this.steps - 1
  }


  stepsforprogress() {
    this.steps = this.steps + 1
  }
  progressbarminus() {
    this.progress = this.progress - 12.5;
    this.progressvalue = this.progress
    this.stepsforprogress()
  }

}