import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control-pannel',
  templateUrl: './control-pannel.component.html',
  styleUrls: ['./control-pannel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlPannelComponent implements OnInit {
  links=[{name:'Electrical Distribution',rlink:'\Electrical'},
  {name:'HVAC',rlink:'\hvac'}
];
  activeLink = this.links[0].name;
  constructor() { }

  ngOnInit(): void {
    this.SelectedArea=["TNEB","HT Structure","Sub HT Structure","Transformer 1","Transformer 2","MV Panel","Sub MV Panel "];
    this.Area=["Area B1","Area B2","Area G1","Area F1","Area F3","Area F2","Area F4","Area F2","Area F4"]

  }
Area:any[];
SelectedArea:any[];

}
