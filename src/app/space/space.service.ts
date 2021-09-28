import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AreaLink, LocLink,AddrLink, DocumentLink, ARA_Space, PartnerLink, DateLink, ContractLink, SiteLink, ARA_Asset } from './spacemodel';
import { LeaseDocument, LeaseManagement } from '../Model/Leasemanagement';
@Injectable({
    providedIn: 'root'
})
export class SpaceService {
    constructor(
        private _httpClient: HttpClient) { }
   private baseUrlVsign1 = "http://localhost:4554/"
//  private baseUrlVsign1 = "http://192.168.0.25:8002/"
    errorHandler(error: HttpErrorResponse): Observable<string> {
        return throwError(error.error instanceof Object ? error.error.Message ? error.error.Message : error.error : error.error || error.message || 'Server Error');
    }
    AddLocLink(LocLink: LocLink) {
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostLocLink", LocLink
            // ,
            //     {
            //         headers: new HttpHeaders({
            //             'Content-Type': 'application/json'
            //         })
            //     })
            //     .pipe(catchError(this.errorHandler));
        )
    }
    AreaLocLink(AreaLink: AreaLink) {
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostAreaLink", AreaLink
        )
    }
    AddressLocLink(AddrLink: AddrLink) {
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostAddrLink", AddrLink
        )
    }
    DocumentLocLink(DocLink: DocumentLink) {
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostDocLink", DocLink
        ) 
    }
    ARA_Space(Space: ARA_Space){
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostGeneralSpace", Space
        ) 
    }
    PartnerLink(PartnerLink: PartnerLink){
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostPartnerLink", PartnerLink
        )
    }
    DateLink(DateLink: DateLink){
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostDateLink", DateLink
        )
    }
    ContractLink(ContractLink: ContractLink){
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostContractLink", ContractLink
        )
    }
    GetParterLink():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetPartnerLink")
        .pipe(catchError(this.errorHandler));
    }
    GetDateLink():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetDateLink")
        .pipe(catchError(this.errorHandler));
    }
    GetDocLink():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetDocLink")
        .pipe(catchError(this.errorHandler));
    }
    GetContractLink():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetContractLink")
        .pipe(catchError(this.errorHandler));
    }
    GetARACompany():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetARACompany")
        .pipe(catchError(this.errorHandler));
    }
    GetARASite():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetARASite")
        .pipe(catchError(this.errorHandler));
    }
    GetARASpace():Observable<any | string> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetARASpace")
        .pipe(catchError(this.errorHandler));
    }
    GetSpaceDetail(Spacename:string):Observable<any | string>{
        return this._httpClient.get<any>(`${this.baseUrlVsign1}api/Space/GetSpace?Spacename=${Spacename}`)
        .pipe(catchError(this.errorHandler));
    }
    ARA_SiteLink(site: SiteLink) {
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostSitedetail", site
        )
    }
    ARA_Asset(Asset: ARA_Asset){
        return this._httpClient.post<any>(this.baseUrlVsign1 + "api/Space/PostGeneralAsset", Asset
        ) 
    }
    Getsitehierarchy():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetTreedata")
        .pipe(catchError(this.errorHandler));
    }
    GetElectricalDistribution():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetElectricalDistributionDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetEnergyConsumption():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetEnergyConsumptionDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetWaterConsumption():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetWaterConsumptionDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetPowerResources():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetPowerConsumptionDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetParkingAccessControl():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetParkingAccessControlDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetFireAlaram():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetFireAlaramDetails")
        .pipe(catchError(this.errorHandler));
    }
    GetOthers():Observable<any> {
        return this._httpClient.get<any>(this.baseUrlVsign1 + "api/Space/GetOtherDetails")
        .pipe(catchError(this.errorHandler));
    }
    // AddSignedFileDetail
    AddSignedFileDetail(signeddetail: LeaseManagement): Observable<any>{
        return this._httpClient.post<any>(this.baseUrlVsign1 + 'api/Lease/AddSignedFileDetail', signeddetail
        ) 
    }
    //AddSignedFileDetail
  
    AddSignedFile(signeddetail: LeaseDocument,selectedFiles: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append(selectedFiles.name, selectedFiles, selectedFiles.name);
        formData.append('Client', signeddetail.Client);
        formData.append('Site', signeddetail.Site);
        formData.append('Company', signeddetail.Company);
        formData.append('IsDraft', signeddetail.IsDraft.toString());
        formData.append('DocumentName', signeddetail.DocumentName);
        formData.append('ContentLength', signeddetail.ContentLength.toString());
        return this._httpClient.post<any>(this.baseUrlVsign1 + 'api/Lease/AddSignedFile',
            formData,
            // {
            //   headers: new HttpHeaders({
            //     'Content-Type': 'application/json'
            //   })
            // }
        ).pipe(catchError(this.errorHandler));
    }
}
