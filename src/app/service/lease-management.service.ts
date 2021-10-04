import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { LeaseDocument, LeaseDraft, LeaseManagement } from '../Model/Leasemanagement';

@Injectable({
  providedIn: 'root'
})
export class LeaseManagementService {

  baseAddress;
  constructor(private http: HttpClient, public authService: AuthService) {
    this.baseAddress = this.authService.baseAddress;
  }
  // Error Handler

  errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(
      error.error.error_description ||
      error.error ||
      error.message ||
      "Server Error"
    );
  }

  SaveLeaseDraft(draft:LeaseDraft){
    return this.http.post<any>(this.baseAddress + 'api/Lease/SaveLeaseDraft', draft,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.errorHandler));
  }
  DeleteLeaseDraft(draftIDs:number[]){
    return this.http.post<any>(this.baseAddress + 'api/Lease/DeleteLeaseDraft', draftIDs,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.errorHandler));
  }
  UploadLeaseDraft(selectedFiles: File[],draft:LeaseDraft): Observable<any> {
    const formData: FormData = new FormData();
    if (selectedFiles && selectedFiles.length) {
      selectedFiles.forEach(x => {
        formData.append(x.name, x, x.name);
      });
    }
    formData.append('documentName', draft.documentName);
    formData.append('documentOwner', draft.documentOwner);
    formData.append('documentType', draft.documentType);
    return this.http.post<any>(`${this.baseAddress}api/Lease/UploadLeaseDraft`,
      formData
    ).pipe(catchError(this.errorHandler));
  }
  GetLeaseDrafts(): Observable<any> {
    return this.http.get(`${this.baseAddress}api/Lease/GetLeaseDrafts`)
      .pipe(catchError(this.errorHandler));
  }
  GetFileFromLink(link: string) {
    return this.http.get(`${link}`, { responseType: 'blob' })
      .pipe(catchError(this.errorHandler));
  }
  // AddSignedFileDetail
  AddSignedFileDetail(signeddetail: LeaseManagement,selectedFiles: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(selectedFiles.name, selectedFiles, selectedFiles.name);
    formData.append('ClientName', signeddetail.clientName);
    formData.append('DocumentName', signeddetail.documentName);
    // formData.append('CreatedOn', signeddetail.createdOn .toString());
    formData.append('SignedOn', signeddetail.signedOn.toLocaleString());
    formData.append('ExpiryDate', signeddetail.expiryDate.toString());
    formData.append('TotalDeposit', signeddetail.totalDeposit.toString());
    formData.append('Rental', signeddetail.rental.toString());
    formData.append('Manintenace', signeddetail.manintenace.toString());
    formData.append('Electrical', signeddetail.electrical.toString());
    formData.append('Condition', signeddetail.condition);
    formData.append('Remarks', signeddetail.remarks);

    formData.append('BankName', signeddetail.bankName);
    formData.append('HolderName', signeddetail.holderName);
    formData.append('AccountNo', signeddetail.accountNo);
    formData.append('ModeOfTransfer', signeddetail.modeofTransfer);
    formData.append('IFSC', signeddetail.iFSC);
    formData.append('Advance', signeddetail.advance);
    formData.append('NoticePeriod', signeddetail.noticePeriod.toString());
    return this.http.post<any>(this.baseAddress + 'api/Lease/UploadNewLease', formData,
      // {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // }
      )
      .pipe(catchError(this.errorHandler));
  }
  //AddSignedFileDetail

  AddSignedFile(signeddetail: LeaseDocument, selectedFiles: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(selectedFiles.name, selectedFiles, selectedFiles.name);
    formData.append('Client', signeddetail.clientName);
    formData.append('Site', signeddetail.site);
    formData.append('Company', signeddetail.company);
    return this.http.post<any>(this.baseAddress + 'api/Lease/AddSignedFile',
      formData,
    ).pipe(catchError(this.errorHandler));
  }
  GetAllSignedLeases(){
    return this.http.get(`${this.baseAddress}api/Lease/GetAllSignedLeases`)
    .pipe(catchError(this.errorHandler));
  }
  GetExpiryLeases(){
    return this.http.get(`${this.baseAddress}api/Lease/GetExpiryLeases`)
    .pipe(catchError(this.errorHandler));
  }
  GetNoticePeriodLeases(){
    return this.http.get(`${this.baseAddress}api/Lease/GetNoticePeriodLeases`)
    .pipe(catchError(this.errorHandler));
  }
  GetTerminatedLeases(){
    return this.http.get(`${this.baseAddress}api/Lease/GetTerminatedLeases`)
    .pipe(catchError(this.errorHandler));
  }
  RenewLease(lease: LeaseManagement): Observable<any> {
    return this.http.post<any>(this.baseAddress + 'api/Lease/RenewLease', lease,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }
  VocateLease(lease: LeaseManagement): Observable<any> {
    return this.http.post<any>(this.baseAddress + 'api/Lease/VocateLease', lease,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }
  TerminateLease(lease: LeaseManagement): Observable<any> {
    return this.http.post<any>(this.baseAddress + 'api/Lease/TerminateLease', lease,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }
  SendMailFromDraft(mailTemplate: any): Observable<any> {
    return this.http.post<any>(this.baseAddress + 'api/Lease/SendMailFromDraft', mailTemplate,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }
  DownloadLeaseDraft(documentID:number): Observable<any> {
    return this.http.get(`${this.baseAddress}api/Lease/DownloadLeaseDraft?documentID=${documentID}`,{
      responseType:'blob'
    })
    .pipe(catchError(this.errorHandler));
  }
}
