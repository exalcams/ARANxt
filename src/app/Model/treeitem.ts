export interface TreeItem {
    name: string;
    parent: string;
    type:string;
    children?: TreeItem[];
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
}