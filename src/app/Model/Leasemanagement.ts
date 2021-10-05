// tslint:disable-next-line:quotemark
import { CommonClass } from "./Common";

export class LeaseManagement  extends CommonClass
{
   
    site: string;
    space:string;
    asset:string;
    clientName:string;
    documentID:number;
    documentName:string;
    signedOn: Date ;
    expiryDate: Date |string ;
    totalDeposit: number;
    rental: number;
    bankName: string;
    holderName : string;
    accountNo : string;
    modeOfTransfer : string;
    ifsc : string;
    advance: string;
    manintenace:number;
    electrical: number;
    condition: string;
    noticePeriod :number;
    remarks: string;
    status:string;
}
export class LeaseDocument  extends CommonClass
{
    clientName: string;
    company: string;
    site: string;
    isDraft: boolean;
    documentName: string;
    contentType: string;
    contentLength: number;
    documentFile: File;
// tslint:disable-next-line:eofline
}

export class LeaseDraft extends CommonClass{
    documentID:number;
    documentOwner:string;
    documentType:string;
    documentName:string;
    documentContent:string;
    isFavourite:boolean=false;
}
