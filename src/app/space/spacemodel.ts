export class Common{

}
export class LocLink {
    AppID: number;
    Object:string;
    SRNo : string;
    Lat:string;
    Long:string;
    FromLat:string;
    FromLong:string;
    ToLat:string;
    ToLong:string;
}
export class AreaLink{
    AppID: number;
    Object:string;
    TotalArea : string;
    CarpetArea:string;
    RentableArea:string;
    Length:string;
    Breath:string;
    Height:string;
    Volume:string;
}
export class AddrLink{
    AppID: number;
    Object:string;
    AddrLine1 : string;
    AddrLine2:string;
    AddrLine3:string;
    Country:string;
    PinCode:string;
    State:string;
}
export class DocumentLink{
    AppID:number;
    Object: string;
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
    AppID:number;
    Object: string;
    PartnerType: string;
    PartnerID: string;
    StartDate: Date;
    EndDate: Date;
}
export class DateLink{
    AppID: number;
    Object: string;
    DateID: string;
    Item: string;
    Date: Date;
    Time: Date;
    TimeStamp: string;
}
export class ContractLink{
    AppID: number;
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
    Space: number;
    Title: string;
    ObjType: string;
    PartnerID: number;
    Category: string;
    CostCenter: string;
    Site: number;
    ParentID: number;
    //new
    LocLink:string;
    DocLink:string;
    PartnerLink:string;
    AreaLink:string;
    AddrLink:string;
    DateLink:string
}
export class SiteLink{
    Site:number;
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
export class ARA_SpaceAll
{
    ARA_space:ARA_Space;
    locLink:LocLink;
    docLink:DocumentLink;
    partnerLink:PartnerLink;
     areaLink:AreaLink;
    addrLink:AddrLink;
    contractLink:ContractLink;
    dateLink:DateLink;
}