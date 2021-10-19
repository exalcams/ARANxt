import { AssertNotNull } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { AraListComponent } from './ara-list/ara-list.component';
import { AssetsComponent } from './assets/assets.component';
import { AssignComponent } from './assign/assign.component';
import { ControlPannelComponent } from './control-pannel/control-pannel.component';
import { DocumentComponent } from './document/document.component';
import { ElectricalDistributionComponent } from './electrical-distribution/electrical-distribution.component';
import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';
import { FinishComponent } from './finish/finish.component';
import { FireAlarmComponent } from './fire-alarm/fire-alarm.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HvacComponent } from './hvac/hvac.component';
import { LeasemanagementComponent } from './lease-management/leasemanagement/leasemanagement.component';
import { LoginComponent } from './login/login.component';
import { LoginslideComponent } from './loginslide/loginslide.component';
import { OthersComponent } from './others/others.component';
import { OverComponent } from './over/over.component';
import { ParkingAccessComponent } from './parking-access/parking-access.component';
import { PowerComponent } from './power/power.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { SignalsComponent } from './signals/signals.component';
import { SiteComponent } from './site/site.component';
import { SpaceComponent } from './space/space.component';
import { UtilityComponent } from './utility/utility.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { WaterConsumptionComponent } from './water-consumption/water-consumption.component';
const routes: Routes = [
  {
    path: 'ara_list',
    component: AraListComponent,
  },
  {
    path: 'document',
    component: DocumentComponent,
  },
  {
    path: 'utility',
    component: UtilityComponent,
  },
  {
    path: 'signals',
    component: SignalsComponent,
  },
  {
    path: 'Electrical',
    component: ElectricalDistributionComponent,
  },
  {
    path: 'controlpanel',
    component: ControlPannelComponent,
  },
  {
    path: 'view',
    component: ViewAnalyticsComponent,
  },
  {
    path: 'hvac',
    component: HvacComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
  {
    path: 'water',
    component: WaterConsumptionComponent,
  },
  {
    path: 'action',
    component: ActionComponent,
  },
  {
    path: 'fire',
    component: FireAlarmComponent,
  },
  {
    path: 'site',
    component: SiteComponent
  },
  {
    path: 'over',
    component: OverComponent
  },
  {
    path: 'assign',
    component: AssignComponent
  },
  {
    path: 'power',
    component: PowerComponent
  },
  {
    path: 'parking',
    component: ParkingAccessComponent
  },
  {
    path: 'finish',
    component: FinishComponent
  },
  {
    path: 'energy',
    component:EnergyConsumptionComponent
  },
  {
    path:'login',
    component:LoginComponent
  },

 {
  path: "",
  component:LoginComponent
},
{
  path:"homepage",
  component:HomepageComponent
},
{
  path:'loginslide',
  component:LoginslideComponent
},
// {
//   path:"leasemanagement",
//   component:LeasemanagementComponent
// }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {​​​​​​​ preloadingStrategy: PreloadAllModules, useHash: true }​​​​​​​)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
