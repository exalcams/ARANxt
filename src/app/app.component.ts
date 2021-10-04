import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Router } from '@angular/router';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { AssetsComponent } from './assets/assets.component';
import { SpaceComponent } from './space/space.component';
import { TreeItem , FlatNode } from "./model/treeitem";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { SpaceService } from 'src/app//space/space.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeSlideInOut_one', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),

    ]),

    trigger('fadeSlideInOut', [

      state('none, void', style({
        opacity: 0, transform: 'translateY(10px)'
      })),
      state('maximum', style({
        opacity: 1, transform: 'translateY(0)'
      })),
      transition('none => maximum', animate('0.8s'))
    ]),

  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit{
  TREE_DATA: TreeItem[] = [
    // { name: 'Fruit', parent:null },
    // { name: 'Apple', parent: 'Fruit' },
    // { name: 'Banana', parent: 'Fruit' },
    // { name: 'Fruit loops', parent: 'Fruit' }, 
    // { name: 'Vegetables', parent:null },
    // { name: 'Green', parent: 'Vegetables' },
    // { name: 'Broccoli', parent: 'Green' },
    // { name: 'Brussels sprouts', parent: 'Green' }, 
    // { name: 'Orange', parent: 'Vegetables' },
    // { name: 'Pumpkins', parent: 'Orange' },
    // { name: 'Carrots', parent: 'Orange' },
    // { name: 'India', parent: null },
    // { name: 'Maharashtra', parent: 'India' },
    // { name: 'Mumbai', parent: 'Maharashtra' },
    // { name: 'Karnataka', parent: 'India' },
    // { name: 'Bangalore', parent: 'Karnataka' },
  ]
  bool1 = false;
  bool2 = false;
  bool3 = false;
  bool4 = false;
  bool5 = false;
  bool6 = false;
  bool7 = true;
  as: any;
  parents : string[]=[]
  fullmenu = true; shortmenu = false; state: string = 'none';
  title = 'ARA';
  bool8: boolean;
  sidemenu: boolean;
  node: any;
  displayparent: string;
  SubSpace : string;
  setInterval = setInterval;

  constructor(public dialog: MatDialog, private router: Router,private services: SpaceService) { 
   
  }

  private _transformer = (node: TreeItem, level: number) => {
    return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
    };
  }
   treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);
   treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
    treeSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
   hasChild = (_: number, node: FlatNode) => node.expandable;
   
 
  
  ngOnInit(): void {
    
    this.services.Getsitehierarchy().subscribe( data =>{ 
      this.TREE_DATA = <TreeItem[]>data;
      this.treeSource.data =this.treeConstruct(this.TREE_DATA);  
        //  console.log(data); 
    })
    this.state = 'maximum';
    // console.log(this.TREE_DATA);
   if (this.bool7 === true) {
      // this.router.navigate(['/login']); 
    }
    //console.log(this.treeSource.data)
  }
  GetARASubSpace(){
    this.SubSpace = localStorage.getItem('SubSpace');
  }

 //constructTree recursively iterates through the tree to create nested tree structure.
  //We only need Id and parentId Columns in the flat data to construct this tree properly.
  treeConstruct(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned)
    }
    return constructedTree;
  }
constructTree(constructedTree, treeObj, assigned) {
if (treeObj.parent == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (treeObj.parent == constructedTree.name) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    }
    else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned); 
          } 
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }

  showSelected(node){
    this.node = node;
    localStorage.setItem('ParentID',  this.node);
  }

  GetChild(parent : string){
    this.TREE_DATA.forEach(element=>{
        if(element.parent == null)
             this.parents.push(element.name)
    })
    let check = this.parents.includes(parent)
    if(check){
      let child : string[]=[]
      for(let i=0;i<this.TREE_DATA.length;i++){
         if(this.TREE_DATA[i].name.includes(parent)){
             let children = this.TREE_DATA[i].children
             children.forEach( element=>{
              child.push(element.name)
             })
            break;
         }
      }
      this.displayparent = parent
      localStorage.setItem('Spaces',JSON.stringify(child))
      setInterval(() => this.GetARASubSpace(),300);
      this.router.navigate(['/controlpanel']); 
    }
    
     
  }
  func1() {
    this.bool1 = true;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = false;
    this.bool8 = false;
  }
  func2() {
    this.bool1 = false;
    this.bool2 = true;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = false;
  }
  func3() {
    // this.as = 1
    // localStorage.setItem("key",this.as)
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = true;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = false;
    this.router.navigate(['/ara_list'])
  }
  func4() {
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = true;
    this.bool5 = false;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = false;
  }
  func5() {
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = true;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = false;
    this.router.navigate(['utility'])

  }
  func6() {
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = true;
    this.bool7 = false;
    this.bool8 = false;
  }
  func7() {
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      position: { top: '3.5%', right: '1%' }
    });
    dialogRef.afterClosed().subscribe( ()=>{
        this.UpdateTree();
    })
  }
 
  UpdateTree(){
    this.services.Getsitehierarchy().subscribe( data =>{ 
      this.TREE_DATA = <TreeItem[]>data;
      this.treeSource.data =this.treeConstruct(this.TREE_DATA);  
         console.log(data); 
    })
  }
  
  slidemenuforbig() {
    this.fullmenu = false; this.shortmenu = true;
    console.log(this.fullmenu, this.shortmenu);
  }
  slidemenuforsmall() {
    this.fullmenu = true; this.shortmenu = false;
    console.log(this.fullmenu, this.shortmenu);

  }
  onResize(event: any) {
    event.target.innerWidth;
    if (event.target.innerWidth < 1024) {
      this.fullmenu = false; this.shortmenu = true;
    }

  }
  ViewAnalytics() {
    this.dialog.open(ViewAnalyticsComponent, {
      position: { top: '3.5%', right: '1%' },
      width: '100%',
      height: '100%'
    });
    // this.router.navigate(['view'])
  }
  spaceclicked() {
    const dialogRef = this.dialog.open(SpaceComponent, {
      panelClass: 'full-width-dialog',
      position: { top: '3.9%', right: '1%' },
      width: '100%',
      maxWidth: '85.5vw ',
      height: '90%',

    });
    dialogRef.afterClosed().subscribe( ()=>{
        this.UpdateTree();
    })
  }
  assetsclicked() {
    this.dialog.open(AssetsComponent, {
      panelClass: 'full-width-dialog',
      position: { top: '3.9%', right: '1%' },
      width: '100%',
      maxWidth: '85.5vw ',
      height: '90%',

    });
  }
}
