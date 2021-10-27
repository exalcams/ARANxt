import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../space/space.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnInit {
  power: any[] = [];
  solar: any[] = [];
  diesel: any[] = [];
  assert: boolean = true;
  constructor(private service: SpaceService) { }

  ngOnInit(): void {
    this.GetPowerResources();
  }
  GetPowerResources() {
    this.service.GetPowerResources().subscribe(
      (data) => {
        this.power = data;
        this.solar.push(this.power[0]);
        console.log(this.solar);
      }
    );
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
