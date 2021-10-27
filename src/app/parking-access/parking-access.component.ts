import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../space/space.service';

@Component({
  selector: 'app-parking-access',
  templateUrl: './parking-access.component.html',
  styleUrls: ['./parking-access.component.scss']
})
export class ParkingAccessComponent implements OnInit {
  constructor(private service: SpaceService) { }
  parking: any[] = [];
  ngOnInit(): void {
    setInterval(() => this.GetARASpace(), 50);
    // this.SelectedArea = ["Area 1","Area 2"];
    // this.Area = ["Area B1", "Area B2", "Area G1", "Area F1", "Area F3", "Area F2", "Area F4", "Area F2", "Area F4"];
    this.GetParkingAccessControl();
  }
  Area: any[];
  SelectedArea: any[];
  child: string[] = [];
  setInterval = setInterval;
  GetParkingAccessControl() {
    this.service.GetParkingAccessControl().subscribe(
      (data) => {
        if (data) {
          this.parking = data;
          console.log(this.parking);
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
}
