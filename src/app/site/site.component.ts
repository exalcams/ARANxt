import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackBarComponent } from '../notification/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from '../notification/notification-snack-bar/notification-snackbar-status-enum';
import { SpaceService } from '../space/space.service';
import { ARA_Company, SiteLink } from '../space/spacemodel';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  SiteLinkView: SiteLink = new SiteLink();
  SiteForm: FormGroup;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  Company: ARA_Company[] = [];
  constructor(public form: FormBuilder, private service: SpaceService,public dialogRef: MatDialogRef<SiteComponent>,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.InitializeSiteform();
    this.GetARACompany();
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }
  GetARACompany(){
    this.service.GetARACompany().subscribe(
      (res) => {
        this.Company = res as ARA_Company[];
        
      }
    );
  }
  close(): void {
    this.dialogRef.close();
  }
  InitializeSiteform(){
    this.SiteForm = this.form.group({
      Site: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      Tax1: ['', [Validators.required]],
      Tax2: ['', [Validators.required]],
      Tax3: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      ProfitCenter: ['', [Validators.required]],
      ObjType: ['', [Validators.required]],
    });
  }
  submit(){
    this.SiteLinkView.Site = this.SiteForm.get('Site').value;
    this.SiteLinkView.Title = this.SiteForm.get('Title').value;
    this.SiteLinkView.Tax1 = this.SiteForm.get('Tax1').value;
    this.SiteLinkView.Tax2 = this.SiteForm.get('Tax2').value;
    this.SiteLinkView.Tax3 = this.SiteForm.get('Tax3').value;
    this.SiteLinkView.Category = this.SiteForm.get('Category').value;
    this.SiteLinkView.Company = this.SiteForm.get('Company').value;
    this.SiteLinkView.ProfitCenter = this.SiteForm.get('ProfitCenter').value;
    this.SiteLinkView.ObjType = this.SiteForm.get('ObjType').value;
    this.service.ARA_SiteLink(this.SiteLinkView).subscribe((x) => {
      console.log(x);
      this.dialogRef.close();
      this.notificationSnackBarComponent.openSnackBar('Site Created Successfully', SnackBarStatus.success);
    })
  }
}
