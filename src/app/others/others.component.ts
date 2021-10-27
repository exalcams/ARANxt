import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpaceService } from '../space/space.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class OthersComponent implements OnInit {
  Lift: boolean = true;
  Escalator: boolean;
  imgSrc: string = "assets/liftimg2.svg";
  imgSrc1: string = "assets/liftimg3.svg";
  elevator: any[] = [];
  esclator: any[] = [];
  constructor(private service: SpaceService) { }
  onMouseOver(): void {
    this.imgSrc = "../assets/liftimg2.svg";
  }

  onMouseOut(): void {
    this.imgSrc = "../assets/liftimg1.svg";
  }
  onMouseOver1(): void {
    this.imgSrc1 = "../assets/liftimg3.svg";
  }

  onMouseOut2(): void {
    this.imgSrc1 = "../assets/liftimg4.svg";
  }

  ngOnInit(): void {
    this.GetOthers();

  }
  GetOthers() {
    this.service.GetOthers().subscribe(
      (data) => {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].material == "Elevator") {
              this.elevator.push(data[i]);
            }
            else if (data[i].material == "Escalator") {
              this.esclator.push(data[i]);
            }
          }
          console.log(this.elevator);
          console.log(this.esclator);

        }
      }
    );
  }
  lift() {
    this.Lift = true;
    this.Escalator = false;
  }
  escalator() {
    this.Escalator = true;
    this.Lift = false;
  }
}
