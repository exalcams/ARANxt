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
    appID:number;
    object: string;
    fileName: string;
    fileSize: string;
    fileExt: string;
    IP: string;
    user: string;
    date: Date;
    time: string;
    attID: string;
}
export class PartnerLink{
    appID:number;
    object: string;
    partnerType: string;
    partnerID: string;
    startDate: Date;
    endDate: Date;
}
export class DateLink{
    appID: number;
    object: string;
    dateID: string;
    item: string;
    date: Date;
    time: Date;
    timeStamp: string;
}
export class ContractLink{
    appID: number;
    object: string;
    type: string;
    startDate: Date;
    endDate: Date;
    title: string;
    vendor: string;
    coverValue: number;
    cost: number;
    exclusions: string;
    inclusion: string;
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