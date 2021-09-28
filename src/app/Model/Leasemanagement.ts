// tslint:disable-next-line:quotemark
import { CommonClass } from "./Common";

export class LeaseManagement  extends CommonClass
{
    Client: string;
    Company: string;
    Site: string;
    FileName: string;
    SignedOn: Date | string | null;
    ClientSign: string;
    SiteSign: string ;
    ExpiryDate: Date | string | null;
    TotalDeposit: number;
    Rental: number;
    Maintenance: number;
    Electrical: number;
    Condition: string;
    Remarks: string;
    RenewalCount: number;
    RenewedOn: Date | string | null;
    VacatedOn: Date | string | null;
    TerminatedOn: Date | string | null;
    IsVocated: boolean;
    IsTerminated: boolean;
    BankName: string;
    HolderName : string;
    AccountNo : number;
    ModeofTransfer : string;
    IFSCCode : string;
    AdvanceRequest: string;
// tslint:disable-next-line:eofline
}
export class LeaseDocument  extends CommonClass
{
    Client: string;
    Company: string;
    Site: string;
    IsDraft: boolean;
    DocumentName: string;
    ContentType: string;
    ContentLength: number;
    DocumentFile: File;
// tslint:disable-next-line:eofline
}
