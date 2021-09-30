import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgApexchartsModule } from 'ng-apexcharts';
// import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTreeModule} from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {​​​​​​​​ FlexLayoutModule }​​​​​​​​ from"@angular/flex-layout";
import { DialogComponent } from './dialog/dialog.component';
import { DocumentComponent } from './document/document.component';
import { AraListComponent } from './ara-list/ara-list.component';
import { UtilityComponent } from './utility/utility.component';
import { SignalsComponent } from './signals/signals.component';
import { ControlPannelComponent } from './control-pannel/control-pannel.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ElectricalDistributionComponent } from './electrical-distribution/electrical-distribution.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { HvacComponent } from './hvac/hvac.component';
import { GaugeModule } from 'angular-gauge';
import { OthersComponent } from './others/others.component';
import { WaterConsumptionComponent } from './water-consumption/water-consumption.component';
import { ActionComponent } from './action/action.component';
import { FireAlarmComponent } from './fire-alarm/fire-alarm.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PopUpActioncenterComponent } from './pop-up-actioncenter/pop-up-actioncenter.component';
import { SpaceComponent } from './space/space.component';
import { AssetsComponent } from './assets/assets.component';
import { FinishComponent } from './finish/finish.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteComponent } from './site/site.component';
import { OverComponent } from './over/over.component';
import { AssignComponent } from './assign/assign.component';
import { PowerComponent } from './power/power.component';
import { ParkingAccessComponent } from './parking-access/parking-access.component';
import { PartnerLinkComponent } from './partner-link/partner-link.component';
import { DateLinkComponent } from './date-link/date-link.component';
import { ContractLinkComponent } from './contract-link/contract-link.component';
import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {LeasemanagementComponent} from './lease-management/leasemanagement/leasemanagement.component';
import { LeasemanagementSignedComponent } from './lease-management/leasemanagement-signed/leasemanagement-signed.component';
import { DatePipe } from '@angular/common';
import { LeasemanagementExpiryComponent } from './lease-management/leasemanagement-expiry/leasemanagement-expiry.component';
import { AuthService } from './service/auth.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { MasterService } from './service/master.service';
import { MenuUpdataionService } from './service/menu-update.service';
import { FuseNavigationService } from './service/navigation.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderComponent } from './loader/loader.component';
import { GDriveComponent } from './g-drive/g-drive.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import {LeaseManagementService} from 'src/app/service/lease-management.service';
import { UnderNoticeComponent } from './lease-management/under-notice/under-notice.component';
import { TerminateComponent } from './lease-management/terminate/terminate.component';
import { UploaddocumentsignedComponent } from './lease-management/uploaddocumentsigned/uploaddocumentsigned.component';
import { DraftDialogComponent } from './draft-dialog/draft-dialog.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DocumentComponent,
    AraListComponent,
    UtilityComponent,
    SignalsComponent,
    ControlPannelComponent,
    ElectricalDistributionComponent,
    ViewAnalyticsComponent,
    HvacComponent,
    OthersComponent,
    WaterConsumptionComponent,
    ActionComponent,
    FireAlarmComponent,
    PopUpActioncenterComponent,
    SpaceComponent,
    AssetsComponent,
    FinishComponent,
    SiteComponent,
    OverComponent,
    AssignComponent,
    PowerComponent,
    ParkingAccessComponent,
    PartnerLinkComponent,
    DateLinkComponent,
    ContractLinkComponent,
    EnergyConsumptionComponent,
    LoginComponent,
    HomepageComponent,
    LeasemanagementComponent,
    LeasemanagementSignedComponent,
    LeasemanagementExpiryComponent,

    
  
    LoaderComponent,
    GDriveComponent,
    UnderNoticeComponent,
    TerminateComponent,
    UploaddocumentsignedComponent,
    DraftDialogComponent,
    RichTextEditorComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    NgApexchartsModule,
    MatCardModule,
     MatButtonModule,NgxDropzoneModule,
     MatIconModule,
     MatRadioModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSelectModule,
    CdkTreeModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTreeModule,
    FlexLayoutModule,HttpClientModule,MatSnackBarModule,
    GaugeModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: '',
     
    }),
    NgxSpinnerModule,
    SocialLoginModule,
    CKEditorModule
  ],
  providers: [AuthService,DatePipe,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    FuseNavigationService,MasterService,MenuUpdataionService,LeaseManagementService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('24029020399-jotol3pdi5aec7n3gbsl8ls04vev480a.apps.googleusercontent.com') // your client id
          }
        ]
      }
    }
  ],
  entryComponents:[GDriveComponent,DraftDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
