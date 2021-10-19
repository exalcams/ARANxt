// tslint:disable-next-line:quotemark
import { CommonClass } from "./Common";

export class LeaseManagement  extends CommonClass
{
    leaseID:number;
    site: string;
    space:string;
    asset:string;
    clientName:string;
    documentID:number;
    documentName:string;
    signedOn:Date|string|null;
    expiryDate:Date|string|null;
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
export class LeaseVacate extends CommonClass{
    vacateID:number;
    leaseID:number;
    proposedDate:Date | string;
    acceptedDate:Date | string;
    inspectionDate:Date | string;
    inspectedBy:string;
    rentDue:number;
    maintenanceDue:number;
    damageRecovery:number;
    advanceBalance:number;
    dateToTransfer:Date | string;
    modeOfTransfer:string;
    returnableAssets:string;
    verifiedBy:string;
    remarks:string;
}


export class LeaseTerminate extends CommonClass{
    TerminateID:number;
    leaseID:number;
    proposedDate:Date | string;
    acceptedDate:Date | string;
    inspectionDate:Date | string;
    inspectedBy:string;
    rentDue:number;
    maintenanceDue:number;
    damageRecovery:number;
    advanceBalance:number;
    dateToTransfer:Date | string;
    modeOfTransfer:string;
    returnableAssets:string;
    verifiedBy:string;
    remarks:string;
    isShift:boolean;
    penaltyAmount:number
    penaltyFrom:string;
    penaltyTo:string;
}
export class LeaseRenew extends CommonClass{

    renewalID:number;
    leaseID:number;
    renewedOn:Date;
    validFor:number;
    expiryDate:Date;
    revisedRent:number;
    revisedRatio:number;
    documentID:number;

}
export class LeaseBankDetalis extends CommonClass{

    bankCode:string;
    bankName:string;
    bankCity:string;
    bankCountry:string;
    bankBranch:string;

}