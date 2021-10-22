import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../space/space.service';
import { ContractLink } from '../space/spacemodel';

@Component({
  selector: 'app-contract-link',
  templateUrl: './contract-link.component.html',
  styleUrls: ['./contract-link.component.scss']
})
export class ContractLinkComponent implements OnInit {
  ContractLinkForm: FormGroup;
  ContractLinkView: ContractLink = new ContractLink();
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
    this.dialogRef.close();
  }
  Save(){
    this.ContractLinkView.Type = this.ContractLinkForm.get('Type').value;
    this.ContractLinkView.Title = this.ContractLinkForm.get('Title').value;
    this.ContractLinkView.StartDate = this.ContractLinkForm.get('StartDate').value;
    this.ContractLinkView.EndDate = this.ContractLinkForm.get('EndDate').value;
    this.ContractLinkView.CoverValue = this.ContractLinkForm.get('CoverValue').value;
    this.ContractLinkView.Vendor = this.ContractLinkForm.get('Vendor').value;
    this.ContractLinkView.Exclusions = this.ContractLinkForm.get('Exclusions').value;
    this.dialogRef.close(this.ContractLinkView);
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
