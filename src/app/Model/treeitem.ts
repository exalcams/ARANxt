export interface TreeItem {
    name: string;
    id:number;
    parent: number;
    type:string;
    children?: TreeItem[];
}

export interface FlatNode {
    expandable: boolean;
    name: any;
    level: number;
}