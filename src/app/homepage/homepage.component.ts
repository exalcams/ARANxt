// import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { DialogComponent } from './dialog/dialog.component';
import { Router } from '@angular/router';
// import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
// import { AssetsComponent } from './assets/assets.component';
// import { SpaceComponent } from './space/space.component';
// import { TreeItem , FlatNode } from "./model/treeitem";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SpaceService } from 'src/app//space/space.service';
import { FlatNode, TreeItem } from '../model/treeitem';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewAnalyticsComponent } from '../view-analytics/view-analytics.component';
import { SpaceComponent } from '../space/space.component';
import { AssetsComponent } from '../assets/assets.component';
declare const annyang: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '200px'
      })),
      state('closed', style({
        width: '64px'
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('.2s')
      ]),
    ]),
    trigger('marginAlign', [
      state('open', style({
        marginLeft: '433px'
      })),
      state('closed', style({
        marginLeft: '297px'
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('.2s')
      ]),
    ])
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  currentUser: string;
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  overview_bool: boolean = true;
  voiceText: any;
  ass: any;
  TREE_DATA: TreeItem[] = [];
  bool1 = false;
  bool2 = false;
  bool3 = false;
  bool4 = false;
  bool5 = false;
  bool6 = false;
  bool7 = true;
  divhide1: boolean = true;
  divhide2: boolean = true;
  as: any;
  models:boolean =false;
  notmodels:boolean = true;
  parents: any[] = []
  fullmenu = true; shortmenu = false; state: string = 'none';
  title = 'ARA';
  bool8: boolean;
  bool9: boolean = true;
  sidemenu: boolean;
  node: any;
  displayparent: string;
  Space: string;
  SubSpace: string;
  ChildNode: string;
  isLeasemanagement = false;
  setInterval = setInterval;
  getspace: any[] = [];
  speech: boolean;
  selectedNode: any ;
  selectedNodePath: string = "";
  isFolded: boolean = false;
  selectedId: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private services: SpaceService,
    private ngZone: NgZone) {

  }

  private _transformer = (node: TreeItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id:node.id
    };
  }
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  treeSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
  initializeVoiceRecognitionCallback(): void {
    annyang.addCallback('error', (err: any) => {
      if (err.error === 'network') {
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid: any) => {
      this.ngZone.run(() => this.voiceActiveSectionError = false);

      let queryText: any = userSaid[0];

      annyang.abort();

      this.voiceText = queryText;
      console.log(this.voiceText);


      this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
    });
  }

  startVoiceRecognition(): void {
    this.speech = true;
    this.voiceActiveSectionDisabled = false;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

    if (annyang) {
      let commands = {
        'demo-annyang': () => { }
      };

      annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
    }
  }

  closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    this.voiceText = undefined;

    if (annyang) {
      annyang.abort();
    }
  }

  ngOnInit(): void {
    this.ass = localStorage.getItem('ass');
    this.services.Getsitehierarchy().subscribe(data => {
      this.TREE_DATA = <TreeItem[]>data;
      this.treeSource.data = this.treeConstruct(this.TREE_DATA);
      console.log("tree data", this.TREE_DATA);
      this.selectedNode = this.TREE_DATA[0].name;
      console.log("selectedNode",this.selectedNode);
      
    });
    this.Space = '';
    this.SubSpace = '';
    this.state = 'maximum';
    this.currentUser = JSON.parse(localStorage.getItem('authorizationData'))?.displayName;
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
    if (treeObj.parent == 0) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } 
    // else if (treeObj.parent == constructedTree.name) {
    else if (treeObj.parent == constructedTree.id) {
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

  showSelected(node) {
    this.node = node;
    localStorage.setItem('ParentID', this.node);
    this.getspace = [];
    this.test(node);
    // console.log(this.Parent_name,"Space");

  }

  test(node: any) {
    // this.getspace = true;
    var parent = this.TREE_DATA.find(x => x.name == node);
    if (parent.parent == 0) {
      // console.log("parent",node);
      localStorage.setItem('Assertparent', node);
      return;
    }
    // else{

    // }
    // console.log(parent);

    // console.log(parent.name);
    this.getspace.push(parent.name);
    localStorage.setItem('AssertSpace', this.getspace[0]);
    //  console.log(this.getspace[0]);
    // this.getspace = []



    this.test(parent.parent);
    // this.Parent_name = parent.name;
    // console.log(parent.name);
  }

  GetChild(parent: any) {
    this.TREE_DATA.forEach(element => {
      if (element.parent == null)
        this.parents.push(element.name)
    })
    let check = this.parents.includes(parent)
    if (check) {
      let child: any[] = []
      for (let i = 0; i < this.TREE_DATA.length; i++) {
        if (this.TREE_DATA[i].name.toString().includes(parent)) {
          let children = this.TREE_DATA[i].children
          children.forEach(element => {
            child.push(element.name)
          })
          break;
        }
      }
      this.displayparent = parent
      localStorage.setItem('Space', '');
      localStorage.setItem('Spaces', JSON.stringify(child))
      localStorage.setItem('SubSpace', '');
      // this.router.navigate(['/controlpanel']); 
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
    // this.router.navigate(['/ara_list'])
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
    // this.router.navigate(['utility'])

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
  func8() {
    this.bool1 = false;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;
    this.bool5 = false;
    this.bool6 = false;
    this.bool7 = false;
    this.bool8 = false;
    this.bool9 = true;
  }

  div1Function() {
    this.divhide1 = true;
    this.divhide2 = false;

  }

  div2Function() {
    this.divhide1 = false;
    this.divhide2 = true;

  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      position: { top: '3.5%', right: '1%' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.UpdateTree();
    })
  }

  UpdateTree() {
    this.services.Getsitehierarchy().subscribe(data => {
      this.TREE_DATA = <TreeItem[]>data;
      this.treeSource.data = this.treeConstruct(this.TREE_DATA);
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

  gotoleasemanagement() {
    this.router.navigate(["leasemanagement"])
  }
  spaceclicked() {
    const dialogConfig: MatDialogConfig = {
      data: {
       id: this.selectedId
      },
      panelClass: 'full-width-dialog',
      width: '100%',
      maxWidth: '85.5vw ',
      height: '557px',
      disableClose: true
    };
  
    const dialogRef = this.dialog.open(SpaceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.UpdateTree();
    })
  }
  assetsclicked() {
    this.dialog.open(AssetsComponent, {
      panelClass: 'full-width-dialog',
      position: { top: '3%', right: '1%' },
      width: '100%',
      maxWidth: '85.5vw ',
      height: '91%',

    });
  }
  logout() {
    this.router.navigate(["login"])
  }
  leaseclk() {

    this.isLeasemanagement = true;
    this.overview_bool = false
  }
  home_clik() {
    this.overview_bool = true
    this.isLeasemanagement = false;

  }
  setSelectedNode(node) {
    console.log("node",node);
    this.selectedNode = node.name;
    this.selectedId=node.id
    console.log("tree source", this.treeSource.data);
  }
  toggleSideMenu() {
    this.isFolded = !this.isFolded;
  }
  switchSideMenu(value:boolean){
    this.isFolded=value;
  }
  modelsclk(){
    this.models=true;
    this.notmodels=false;
  }
  notmodelsclk(){
    this.notmodels=true;
    this.models=false
  }
}
