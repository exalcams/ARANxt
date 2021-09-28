import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FinishComponent } from '../finish/finish.component';
import { MapsAPILoader } from '@agm/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpaceService } from '../space/space.service';
import { AddrLink, ARA_Asset, ARA_Space, AreaLink, DocumentLink, LocLink } from '../space/spacemodel';
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
const ELEMENT_DATA1: Element[] = [
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },
  { position: "Enter Partner ID", name: 'DD/MM/YYYY', weight: 'DD/MM/YYYY', fav: "", },

];
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
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  public GeneralForm: FormGroup;
  LocLinkView: LocLink = new LocLink();
  AreaLinkView: AreaLink = new AreaLink();
  AddressLinkView: AddrLink = new AddrLink();
  DocLinkView: DocumentLink = new DocumentLink();
  GeneralSpaceView: ARA_Asset = new ARA_Asset();
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  progress=12.5;
  steps = 8;
  progressvalue:any;
  address1: string;
  private geoCoder;
  selectedFood1: string | undefined;
  displayedColumns: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  displayedColumns2: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'icon'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA3);
  dataSourceDate = new MatTableDataSource(ELEMENT_DATA2);
  displayedColumns1 = ['fav', 'position', 'name', 'weight', 'icon'];
  dataSource = new MatTableDataSource(ELEMENT_DATA1);

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
  next: boolean=true;
  finish: boolean;
  AddressForm: FormGroup;
  LocationForm: FormGroup;
  SpaceForm: FormGroup;
  AssertSite: string;
  AssertSpace: string;

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
  Catagories = [
    {name: "Electrical Distribution"},
    {name: "Energy Consumption"},
    {name: "HVAC"},
    {name: "Water Consumption"},
    {name: "Power Resource"},
    {name: "Parking Access Control"},
    {name: "CCTV"},
    {name: "Fire Alaram"},
    {name: "Others"}
  ]
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(public dialog: MatDialog,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,public form: FormBuilder,
    private service: SpaceService,public dialogRef: MatDialogRef<AssetsComponent>) { }
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
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
    this.AssertSite = localStorage.getItem('AssertSite');
    this.AssertSpace = localStorage.getItem('AssertSpace');
    this.InitializeGeneralform();
    this.InitializeLocationform();
    this.InitializeAddressform();
    this.InitializeSpaceform();
  }
  InitializeGeneralform() {
    this.GeneralForm = this.form.group({
      title: ['', [Validators.required]],
      partnerID: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      modelnumber: ['', [Validators.required]],
      TagID: ['', [Validators.required]],
      assetlife: ['', [Validators.required]],
      transferable: ['', [Validators.required]],
      acquisitionvalue: ['', [Validators.required]],
      objectType: ['', [Validators.required]],
      category: ['', [Validators.required]],
      manufacture: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      purchasedate: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      transapproval: ['', [Validators.required]],
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
    this.previous=false;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=true;
    this.finish=false;
  }
  asset() {
    this.General = false;
    this.Location = false;
    this.Document = false;
    this.Partner = false;
    this.Space = true;
    this.Address = false;
    this.Date = false;
    this.Contract = false;
    this.selectedIndex = "Space";
    this.previous=true;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=true;
    this.finish=false;
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
    this.previous=true;
    this.next=false;
    this.finish=true;
  }
  Next() {
    switch (this.selectedIndex) {
      case "General":
        this.GeneralSpaceView.Title = this.GeneralForm.get('title').value;
        this.GeneralSpaceView.PartnerID = this.GeneralForm.get('partnerID').value;
        this.GeneralSpaceView.CostCenter = this.GeneralForm.get('costCenter').value;
        this.GeneralSpaceView.ModelNumber = this.GeneralForm.get('modelnumber').value;
        this.GeneralSpaceView.TagID = this.GeneralForm.get('TagID').value;
        this.GeneralSpaceView.AssetLife = this.GeneralForm.get('assetlife').value;
        this.GeneralSpaceView.Transferable = this.GeneralForm.get('transferable').value;
        this.GeneralSpaceView.AcquisitionValue = this.GeneralForm.get('acquisitionvalue').value;
        this.GeneralSpaceView.ObjType = this.GeneralForm.get('objectType').value;
        this.GeneralSpaceView.Category = this.GeneralForm.get('category').value;
        this.GeneralSpaceView.Manufacture = this.GeneralForm.get('manufacture').value;
        this.GeneralSpaceView.Serial = this.GeneralForm.get('serial').value;
        this.GeneralSpaceView.PurchaseDate = this.GeneralForm.get('purchasedate').value;
        this.GeneralSpaceView.Type = this.GeneralForm.get('Type').value;
        this.GeneralSpaceView.TransApproval = this.GeneralForm.get('transapproval').value;
        this.GeneralSpaceView.Description = this.GeneralForm.get('description').value;
        this.GeneralSpaceView.Site = this.AssertSite;
        this.GeneralSpaceView.Space = this.AssertSpace;
        this.service.ARA_Asset(this.GeneralSpaceView).subscribe((x) => {
          console.log(x);
        },
        err => {
          console.log(err); 
          
        })
        this.location();
        console.log(this.GeneralForm.value);
        break;
      case "Location":
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
        this.document();
        break;
      case "Document":
        this.partner();
        break;
      case "Partner":
        this.asset();
        break;
      case "Space":
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
        this.address();
        break;
      case "Address":
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
  // Next() {
  //   switch (this.selectedIndex) {
  //     case "General":
  //       this.location();
  //       break;
  //     case "Location":
  //       this.document();
  //       break;
  //     case "Document":
  //       this.partner();
  //       break;
  //     case "Partner":
  //       this.asset();
  //       break;
  //     case "Space":
  //       this.address();
  //       break;
  //     case "Address":
  //       this.date();
  //       break;
  //     case "Date":
  //       this.contract();
  //       break;
  //   }

  // }

  Previous() {
    switch (this.selectedIndex) {
      case "Contract":
        this.date();
        break;
        case "Date":
        this.address();
        break;
        case "Address":
        this.asset();
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
  Finishpopup(){
    this.dialog.open(FinishComponent, {
      // panelClass: 'full-width-dialog',
      // position: {top: '3.9%',right:'1%'},
      width:'50%',
      // maxWidth: '85.5vw ',
      height:'450px',
      
    });

    this.dialogRef.close();
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




