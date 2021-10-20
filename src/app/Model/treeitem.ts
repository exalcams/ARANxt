export interface TreeItem {
    name: string;
    id:number;
    parent: string;
    type:string;
    children?: TreeItem[];
}

export interface FlatNode {
    expandable: boolean;
    name: any;
    level: number;
}