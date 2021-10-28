import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../space/space.service';
import { ContractLink } from '../space/spacemodel';

@Component({
  selector: 'app-contract-link',
  templateUrl: './contract-link.component.html',
  styleUrls: ['./contract-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContractLinkComponent implements OnInit {
  ContractLinkForm: FormGroup;
  ContractLinkView: ContractLink = new ContractLink();
  Obj:any;
  constructor(public dialog: MatDialog, private service: SpaceService,public dialogRef: MatDialogRef<ContractLinkComponent>, public form: FormBuilder) { }
  Type = ["Warranty", "Annual Maintenance Contract", "Insurance"];
  ngOnInit(): void {
    this.InitialiseContractForm();
  }
  InitialiseContractForm() {
    this.ContractLinkForm = this.form.group({
      Type: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      CoverValue: ['', [Validators.required]],
      Vendor: ['', [Validators.required]],
      Exclusions: ['', [Validators.required]]
    });
  }
  close(): void {
    this.Obj=[{
      ContractLinkView:this.ContractLinkView,
      ContractLinkForm:this.ContractLinkForm.valid
    }]
    this.dialogRef.close(this.Obj);
  }
  Save(){
    this.ContractLinkView.type = this.ContractLinkForm.get('Type').value;
    this.ContractLinkView.title = this.ContractLinkForm.get('Title').value;
    this.ContractLinkView.startDate = this.ContractLinkForm.get('StartDate').value;
    this.ContractLinkView.endDate = this.ContractLinkForm.get('EndDate').value;
    // this.ContractLinkView.coverValue = this.ContractLinkForm.get('CoverValue').value;
    this.ContractLinkView.coverValue =1 ;

    this.ContractLinkView.vendor = this.ContractLinkForm.get('Vendor').value;
    this.ContractLinkView.exclusions = this.ContractLinkForm.get('Exclusions').value;
    this.Obj=[{
      ContractLinkView:this.ContractLinkView,
      ContractLinkForm:this.ContractLinkForm.valid
    }]
    this.dialogRef.close(this.Obj);
    // this.service.ContractLink(this.ContractLinkView).subscribe((x) => {
    //   console.log(x);
    //   this.dialogRef.close();
    // },
    //   err => {
    //     console.log(err);
    //     this.dialogRef.close();
    //   })
  }
}
