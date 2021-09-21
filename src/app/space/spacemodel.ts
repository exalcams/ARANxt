export class Common{

}
export class LocLink {
    AppID: any;
    Object:any;
    SRNo : any;
    Lat:string;
    Long:string;
    FromLat:string;
    FromLong:string;
    ToLat:string;
    ToLong:string;
}
export class AreaLink{
    AppID: any;
    Object:any;
    TotalArea : any;
    CarpetArea:string;
    RentableArea:string;
    Length:string;
    Breath:string;
    Height:string;
    Volume:string;
}
export class AddrLink{
    AppID: any;
    Object:any;
    AddrLine1 : any;
    AddrLine2:string;
    AddrLine3:string;
    Country:string;
    PinCode:string;
    State:string;
}
export class DocumentLink{
    AppID: any;
    Object: any;
    FileName: string;
    FileSize: string;
    FileExt: string;
    IP: string;
    User: string;
    Date: Date;
    Time: string;
    AttID: string;
}
export class PartnerLink{
    AppID:any;
    Object: string;
    PartnerType: string;
    PartnerID: string;
    StartDate: Date;
    EndDate: Date;
}
export class DateLink{
    AppID: any;
    Object: string;
    DateID: string;
    Item: string;
    Date: Date;
    Time: Date;
    TimeStamp: string;
}
export class ContractLink{
    AppID: any;
    Object: string;
    Type: string;
    StartDate: Date;
    EndDate: Date;
    Title: string;
    Vendor: string;
    CoverValue: DoubleRange;
    Cost: DoubleRange;
    Exclusions: string;
    Inclusion: string;
}
export class ARA_Space {
    Space: string;
    Title: string;
    ObjType: string;
    PartnerID: string;
    Category: string;
    CostCenter: string;
    Site: string;
    ParentID: string;
}
export class SiteLink{
    Site:string;
    Title:string;
    Tax1:string;
    Tax2:string;
    Tax3:string;
    Category:string;
    Company:string;
    ProfitCenter:string;
    ObjType:string;
}
export class ARA_Asset {
    Title: string;
    PartnerID: string;
    CostCenter: string;
    ModelNumber:string;
    TagID: String;
    AssetLife: string;
    Transferable: string;
    AcquisitionValue: string;
    ObjType: string;
    Category: string;
    Manufacture: string;
    Serial: string;
    PurchaseDate: string;
    Type: string;
    TransApproval: string;
    Description: string;
    Site: string;
    Space: string;
}
export class ARA_Company {
    Company: string;
    Title: string;
    Client: string;
}