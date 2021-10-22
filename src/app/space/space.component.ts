import { Component, ElementRef, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FinishComponent } from '../finish/finish.component';
import { MapsAPILoader } from '@agm/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpaceService } from '../space/space.service';
import { AddrLink, ARA_Space, AreaLink, ContractLink, DateLink, DocumentLink, LocLink, PartnerLink, SiteLink } from '../space/spacemodel';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { PartnerLinkComponent } from '../partner-link/partner-link.component';
import { DateLinkComponent } from '../date-link/date-link.component';
import { ContractLinkComponent } from '../contract-link/contract-link.component';
import { LoginService } from '../login.service';
interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eight: string;

}
export interface ContractData {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  // eight:string;

}
export interface Element {
  name: string;
  position: any;
  weight: any;
  fav: string;

}
// const ELEMENT_DATA1: Element[] = [
//   { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
//   { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
//   { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
//   { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
//   { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },

// ];
const ELEMENT_DATA2: Element[] = [
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "Enter Partner ID", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "Enter Partner ID", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "Enter Partner ID", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "Enter Partner ID", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "Enter Partner ID", },

];
const ELEMENT_DATA: PeriodicElement[] = [
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'Data Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'Key Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },

  { one: 'Key Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },


  { one: 'File Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
  { one: 'Data Name ', two: 'File Size', three: 'File Ext', four: 'IP', five: 'User', six: 'Date', seven: 'Time', eight: 'Att ID' },
];
const ELEMENT_DATA3: ContractData[] = [
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },
  { one: '', two: '2:00 AM', three: 'DD/MM/YYYY', four: 'DD/MM/YYYY', five: 'Cover Value', six: 'Vendor', seven: 'Exclusions', },

];

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
  PartnerLink: any[] = [];
  DocLink: any[] = [];
  DateLink: any[] = [];
  ContractLink: any[] = [];
  ARASite: SiteLink[] = [];
  SiteName: any[] = [];
  title: string = 'AGM project';
  progress=12.5;
  steps = 8;
  progressvalue:any;
  latitude: any;
  longitude: any;
  zoom: number;
  address1: string;
  private geoCoder;
  selectedFood1: string | undefined;
  displayedColumns: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  displayedColumns2: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'icon'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA3);
  dataSourceDate = new MatTableDataSource(ELEMENT_DATA2);
  displayedColumns1 = ['fav', 'position', 'name', 'weight', 'icon'];
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

  onFoodSelection1() {
    console.log(this.selectedFood1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
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
  ObjectType = ["A", "B", "C"];
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

  constructor(public dialog: MatDialog, private mapsAPILoader: MapsAPILoader, public form: FormBuilder,
    private service: SpaceService,
    private ngZone: NgZone, public dialogRef: MatDialogRef<SpaceComponent>, public nav: LoginService) { this.nav.islogin(true); }
  private setCurrentLocation() {
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
    this.parentID = localStorage.getItem('ParentID')
    this.GetDocumentDetails();
    this.GetParterLink();
    this.GetDateLink();
    this.GetContractLink();
    this.GetARASite();
    this.InitializeGeneralform();
    this.InitializeLocationform();
    this.InitializeAddressform();
    this.InitializeSpaceform();
  }
  GetARASite() {
    this.service.GetARASite().subscribe(
      (res) => {
        this.ARASite = res as SiteLink[];
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
  GetParterLink() {
    this.service.GetParterLink().subscribe(
      (data) => {
        if (data) {
          this.PartnerLink = data;
          this.HeaderDetailsDataSource = new MatTableDataSource(this.PartnerLink);

        }
      }
    );
  }
  GetDateLink() {
    this.service.GetDateLink().subscribe(
      (data) => {
        if (data) {
          this.DateLink = data;
          this.DateLinkDataSource = new MatTableDataSource(this.DateLink);
          //this.isProgressBarVisibile = false;
        }
      }
    );
  }
  GetContractLink() {
    this.service.GetContractLink().subscribe(
      (data) => {
        if (data) {
          this.ContractLink = data;
          this.ContractLinkDataSource = new MatTableDataSource(this.ContractLink);
          //this.isProgressBarVisibile = false;
        }
      }
    );
  }
  InitializeGeneralform() {
    this.GeneralForm = this.form.group({
      spaceName: ['', [Validators.required]],
      objectType: ['', [Validators.required]],
      siteName: ['', [Validators.required]],
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
  general() {
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
  }
  location() {
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
    this.GetParterLink();
  }
  partner() {
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
    this.GetParterLink();
  }
  space() {
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
  address() {
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
    this.GetDateLink();
  }
  date() {
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
    this.GetContractLink();
  }
  contract() {
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
        height: '450px',
        width: '50%',
      }
    );
    this.GeneralSpaceView.Title = this.GeneralForm.get('spaceName').value;
    this.GeneralSpaceView.ObjType = this.GeneralForm.get('objectType').value;
    this.GeneralSpaceView.Site = this.GeneralForm.get('siteName').value;
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
      this.DocLinkView.FileName = file;
      this.DocLinkView.FileSize = size + unit;
      this.DocLinkView.FileExt = ext;
      this.DocLinkView.User = "User";
      this.DocLink.push(this.DocLinkView);
      this.DocumentLinkDataSource = new MatTableDataSource(this.DocLink);
      console.log(this.DocumentLinkDataSource, 'DocLink');

      // console.log(ext);
      // console.log(file);
      // console.log(size + unit);
      this.service.DocumentLocLink(this.DocLinkView).subscribe((x) => {
        console.log(x);
      },
        err => {
          console.log(err);
        })
    }
  }
  OpenPartnerdialogue() {
    const dialogRef = this.dialog.open(PartnerLinkComponent,
      // {
      //   height: '450px',
      //   width: '650px',
      // }
    );
  }
  OpenDateLinkDialogue() {
    const dialogRef = this.dialog.open(DateLinkComponent,

    );
  }
  OpenContractLinkDialogue() {
    const dialogRef = this.dialog.open(ContractLinkComponent,
      {
        height: '450px',
        width: '100%',
      }
    );
  }
  close(): void {
    this.dialogRef.close();
  }

progressbar(){
  this.progress = this.progress + 12.5;
  this.progressvalue = this.progress
 this.stepsforprogressminus()
}
stepsforprogressminus(){
  this.steps = this.steps-1
}


stepsforprogress(){
  this.steps = this.steps+1
}
progressbarminus(){
  this.progress = this.progress - 12.5;
  this.progressvalue = this.progress
  this.stepsforprogress()
}

}