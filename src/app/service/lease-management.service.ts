import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaseManagementService {

  baseAddress;
  constructor(private http: HttpClient,public authService:AuthService) { 
    this.baseAddress=this.authService.baseAddress;
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

  UploadLeaseDraft(selectedFiles: File[],client="001",company="Exa",site="site1"): Observable<any> {
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
  GetLeaseDrafts():Observable<any>{
    return this.http.get(`${this.baseAddress}api/Lease/GetLeaseDrafts`)
    .pipe(catchError(this.errorHandler));
  }
  GetFileFromLink(link:string){
    return this.http.get(`${link}`,{responseType:'blob'})
    .pipe(catchError(this.errorHandler));
  }
}
