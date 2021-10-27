import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexStroke,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexTitleSubtitle,
  ApexMarkers,
  ApexYAxis,
  ApexLegend,
  ApexFill
} from 'ng-apexcharts';
import { SpaceService } from '../space/space.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
};
export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
};
@Component({
  selector: 'app-hvac',
  templateUrl: './hvac.component.html',
  styleUrls: ['./hvac.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HvacComponent implements OnInit {
  public chartOptions: ChartOptions;
  bar: boolean = true;
  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: ChartOptions1;
  assert: boolean = true;
  Area: any[];
  SelectedArea: any[];
  child: string[] = [];
  setInterval = setInterval;
  constructor(private service: SpaceService) {
    this.chartOptions1 = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 185,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "18",
          "19",
          "20",
          "19",
          "30",
          "29",
          "28",
          "19",
          "21",
          "27"
        ],
        labels: {
          style: {
            colors: ['#6e6d7a'],
            fontSize: '10px',
            fontFamily: "poppins-semi",
            fontWeight: 400,
          },
        }
      },
      yaxis: {
        show: false,
        labels: {
          style: {
            colors: ['#6e6d7a'],
            fontSize: '10px',
            fontFamily: "poppins-semi",
            fontWeight: 400,
          },
        }
      },
      grid: {
        show: false
      }
    };
    this.chartOptions = {
      series: [80],
      chart: {
        height: 185,
        width: 150,
        type: "radialBar",
        offsetY: -20,
      },
      colors: ["#c3d8fd"],
      plotOptions: {
        radialBar: {
          startAngle: -125,
          endAngle: 125,
          hollow: {
            margin: 20,
            size: "70%",

            // image: 'assets/Group 8319.svg',
            // imageWidth: 44,
            // imageHeight: 44,
            // imageClipped: false
          },

          dataLabels: {

            // showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "10px",
              fontFamily: "poppins-semi"
            },
            value: {
              offsetY: -5,

              color: "#111",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "poppins-semi",
              show: true,

            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Goal"]
    };

  }

  ngOnInit(): void {
    setInterval(() => this.GetARASpace(), 300);
    // this.SelectedArea=["Area 1","Area 2"];
    // this.Area=["Area B1","Area B2","Area G1","Area F1","Area F3","Area F2","Area F4","Area F2","Area F4"]

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

  barchart(a: any) {
    if (a == 1) {
      this.bar = false;
    }
    else {
      this.bar = true;
    }
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
