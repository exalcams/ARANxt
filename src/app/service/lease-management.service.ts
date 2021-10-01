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
  UploadLeaseDraft(selectedFiles: File[], client = "001", company = "Exa", site = "site1"): Observable<any> {
    const formData: FormData = new FormData();
    if (selectedFiles && selectedFiles.length) {
      selectedFiles.forEach(x => {
        formData.append(x.name, x, x.name);
      });
    }
    formData.append('Client', client);
    formData.append('Company', company);
    formData.append('Site', site);
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
  AddSignedFileDetail(signeddetail: LeaseManagement): Observable<any> {
    return this.http.post<any>(this.baseAddress + 'api/Lease/AddSignedFileDetail', signeddetail,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }
  //AddSignedFileDetail

  AddSignedFile(signeddetail: LeaseDocument, selectedFiles: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(selectedFiles.name, selectedFiles, selectedFiles.name);
    formData.append('Client', signeddetail.client);
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
}
