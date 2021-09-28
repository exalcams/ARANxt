import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Compiler, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-g-drive',
  templateUrl: './g-drive.component.html',
  styleUrls: ['./g-drive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GDriveComponent implements OnInit {
  driveFiles: any[] = [];
  isLoggedin: boolean = false;
  selectedID;
  selectedFile: File;
  signInOptions = {
    scope: "https://www.googleapis.com/auth/drive.appdata"
  }
  headers;
  gToken: string;
  constructor(
    public dialogRef: MatDialogRef<GDriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  selectFile(id){
    this.selectedID=id;
  }

  loginWithGoogle(): void {
    this.spinner.show();
    let signInOptions = {
      scope: "https://www.googleapis.com/auth/drive"
    }
    // let fileID = "1QMOPHcNxzlLTFlwbQa1n5t_WU3yMsN5R";
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, signInOptions)
      .then((data) => {
        console.log(data);
        this.isLoggedin = true;
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.authToken}`
        });
        this.http.get(`https://www.googleapis.com/drive/v3/files`, {
          headers: this.headers
        }).subscribe((res: any) => {
          console.log("res", res);
          this.driveFiles = <any>res.files;
          this.spinner.hide();
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      });
  }

  DownloadFile() {
    this.spinner.show();
    let file=this.driveFiles.find(x=>x.id==this.selectedID);
    this.http.get(`https://www.googleapis.com/drive/v3/files/${this.selectedID}?alt=media`, {
      responseType: 'blob',
      headers: this.headers
    }).subscribe(res => {
      console.log("res", res);
      const blob = new Blob([res])
      let blobArr=new Array<Blob>();
      blobArr.push(blob);
      this.selectedFile=new File(blobArr,file.name);
      this.spinner.hide();
      this.dialogRef.close({file:this.selectedFile});
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  close(){
    this.dialogRef.close(false);
  }

}
