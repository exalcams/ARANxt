import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../space/space.service';

@Component({
  selector: 'app-fire-alarm',
  templateUrl: './fire-alarm.component.html',
  styleUrls: ['./fire-alarm.component.scss']
})
export class FireAlarmComponent implements OnInit {
  assert: boolean = true;
  Area: any[];
  SelectedArea: any[];
  child: string[] = [];
  setInterval = setInterval;
  firealaram: any[] = [];
  constructor(private service: SpaceService) { }

  ngOnInit(): void {
    setInterval(() => this.GetARASpace(), 50);
    // this.SelectedArea=["Area 1","Area 2"];
    // this.Area=["Area B1","Area B2","Area G1","Area F1","Area F3","Area F2","Area F4","Area F2","Area F4"]
    this.GetFireAlaram();
  }
  GetFireAlaram() {
    this.service.GetFireAlaram().subscribe(
      (data) => {
        if (data) {
          this.firealaram = data;
          console.log(this.firealaram);
        }
      }
    );
  }
  GetARASpace() {
    let n = localStorage.getItem('Spaces')
    this.child = JSON.parse(n)
    this.SelectedArea = this.child;

  }
  SelectedSpace(SelectedArea) {
    localStorage.setItem('Space', SelectedArea);
    this.service.GetSpaceDetail(SelectedArea).subscribe(
      (data) => {
        this.Area = data;
        console.log(data);
      }
    );
  }
  SelectedSubSpace(SubSpace) {
    localStorage.setItem('SubSpace', SubSpace);
    console.log(SubSpace);

  }

  assertdetails(a: any) {
    if (a == 1) {
      this.assert = false;
    }
    else {
      this.assert = true;
    }

  }
}
