export interface TreeItem {
    name: string;
    parent: string;
    children?: TreeItem[];
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
}