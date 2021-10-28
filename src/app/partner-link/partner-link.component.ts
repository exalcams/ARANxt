import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../space/space.service';
import { PartnerLink } from '../space/spacemodel';

@Component({
  selector: 'app-partner-link',
  templateUrl: './partner-link.component.html',
  styleUrls: ['./partner-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerLinkComponent implements OnInit {
  PartnerLinkForm: FormGroup;
  PartnerLinkView: PartnerLink = new PartnerLink();
  Obj:any;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PartnerLinkComponent>, public form: FormBuilder,private service: SpaceService,) { }

  ngOnInit(): void {
    this.InitialisePartnerForm();
  }

  InitialisePartnerForm() {
    this.PartnerLinkForm = this.form.group({
      PartnerType: ['', [Validators.required]],
      PartnerID: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });

  }
  close():void {
    this.Obj=[{
       PartnerLinkView:this.PartnerLinkView,
      partnerLinkForm:this.PartnerLinkForm.valid
    }]
    this.dialogRef.close(this.Obj);
  }
  Save(){
    this.PartnerLinkView.partnerType = this.PartnerLinkForm.get('PartnerType').value;
    this.PartnerLinkView.partnerID = this.PartnerLinkForm.get('PartnerID').value;
    this.PartnerLinkView.startDate = this.PartnerLinkForm.get('StartDate').value;
    this.PartnerLinkView.endDate = this.PartnerLinkForm.get('EndDate').value;
    this.Obj=[{
      PartnerLinkView:this.PartnerLinkView,
      partnerLinkForm:this.PartnerLinkForm.valid
    }]
    
    this.dialogRef.close(this.Obj);
    // this.service.PartnerLink(this.PartnerLinkView).subscribe((x) => {
    //   console.log(x);
    //   this.dialogRef.close();
    // },
    //   err => {
    //     console.log(err);
    //     this.dialogRef.close();
    //   })
  }
}


