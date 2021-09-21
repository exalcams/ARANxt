import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../app.component';
import { SpaceService } from '../space/space.service';
import { ElectricalDistribution} from 'src/app/Model/ControlPanel';

@Component({
  selector: 'app-electrical-distribution',
  templateUrl: './electrical-distribution.component.html',
  styleUrls: ['./electrical-distribution.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ElectricalDistributionComponent implements OnInit {
  Area:any[];
  SelectedArea:any[];
  child : string[]=[];
  setInterval = setInterval;
  Electrical: ElectricalDistribution[] =[];
  constructor(private service: SpaceService,) { }

  ngOnInit(): void {
    setInterval(() => this.GetARASpace(),50);
    this.GetElectricalDistribution();
   // this.GetARASpace();
    // this.SelectedArea=["TNEB","HT Structure","Sub HT Structure","Transformer 1","Transformer 2","MV Panel","Sub MV Panel "];
   // this.Area=["Area B1","Area B2","Area G1","Area F1","Area F3","Area F2","Area F4","Area F2","Area F4"]

  }
  GetElectricalDistribution(){
    this.service.GetElectricalDistribution().subscribe(
      (data) => {
        if (data) {
          this.Electrical = data as ElectricalDistribution[];
          console.log(this.Electrical);
          
        }
      }
    );
  }
  GetARASpace() 
  {
    let n = localStorage.getItem('Spaces')
    this.child = JSON.parse(n)
    this.SelectedArea =  this.child ;

  }
  SelectedSpace(SelectedArea){
    localStorage.setItem('Space',SelectedArea);
    this.service.GetSpaceDetail(SelectedArea).subscribe(
      (data) => {
        this.Area = data;
        console.log(data);   
      }
    );
  }
SelectedSubSpace(SubSpace){
  localStorage.setItem('SubSpace',SubSpace);
  console.log(SubSpace);
  
}
  // receiveMessage(msg){
  //   console.log(msg)
  //   let n = localStorage.getItem('Spaces')
  //   this.child = JSON.parse(n)
  //   this.SelectedArea = this.child
  // }
}
