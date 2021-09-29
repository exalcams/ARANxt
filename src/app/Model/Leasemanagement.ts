// tslint:disable-next-line:quotemark
import { CommonClass } from "./Common";

export class LeaseManagement  extends CommonClass
{
    client: string;
    company: string;
    site: string;
    fileName: string;
    signedOn: Date | string | null;
    clientSign: string;
    siteSign: string ;
    expiryDate: Date | string | null;
    totalDeposit: number;
    rental: number;
    maintenance: number;
    electrical: number;
    condition: string;
    remarks: string;
    renewalCount: number;
    renewedOn: Date | string | null;
    vacatedOn: Date | string | null;
    terminatedOn: Date | string | null;
    isVocated: boolean;
    isTerminated: boolean;
    bankName: string;
    holderName : string;
    accountNo : number;
    modeofTransfer : string;
    iFSC : string;
    advanceRequest: string;
// tslint:disable-next-line:eofline
}
export class LeaseDocument  extends CommonClass
{
    client: string;
    company: string;
    site: string;
    isDraft: boolean;
    documentName: string;
    contentType: string;
    contentLength: number;
    documentFile: File;
// tslint:disable-next-line:eofline
}
