import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend
} from "ng-apexcharts";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import {
  ApexResponsive,
  ApexGrid,
} from "ng-apexcharts";

import {
  ApexYAxis,
  ApexFill,
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  // labels: string[];
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  labels: any;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};
export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip?: ApexTooltip;
  stroke: ApexStroke;
  legend?: ApexLegend;
  grid: ApexGrid;
};
@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '100%'
      })),
      state('close', style({
        width: '40%'
      })),
      transition('open => close', [
        animate('0.2s')
      ]),
      transition('close => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class OverComponent implements OnInit {
  expiryisopen: boolean = false;
  public chartOptions: ChartOptions;
  public chartOptions1: ChartOptions1;
  public chartOptions2: ChartOptions2;
  isDisplay: boolean = true;
  isDisplayhover: boolean = false;
  breakpoint: number;
  changetolease: boolean = false;
  changetodashboard: boolean = true;
  constructor(private router: Router) {
    this.chartOptions = {
      series: [70],
      chart: {
        width: 82.7,
        height: 135,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            show: false,
            // name: {
            //   show: false
            // }
          },
          hollow: {
            size: "65%"
          }
        },
      },
      //  labels: ["series"],

      fill: {
        colors: ["#f0ace3"],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ee926b"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
    };

    // semi donut

    this.chartOptions1 = {
      series: [8, 16, 32],
      labels: ['High', 'Medium', 'Low'],
      legend: {
        show: false,
        position: 'bottom',

        // offsetY: 0,
        // height: 230,
        // formatter: function(seriesName, opts) {
        //     return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]+'%'
        // },
      },
      chart: {
        // width: 100,
        type: "donut"
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            size: '80%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '0px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 0,
                color: '#ff3c3c'


              },
              value: {
                show: true,
                fontSize: '0px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 5,
                color: '#f9f8fe'

              },
            }
          }
        }
      },
      fill: {
        colors: ['#ff3c3c', '#6255ff', '#0044c6']
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };


    this.chartOptions2 = {
      series: [
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 20, 47, 35]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        type: "bar",
        height: 130,
        foreColor: '#999999',
        fontFamily: 'poppins-semi',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          },
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 2,
          colors: {
            ranges: [{
              from: 0,
              to: 0,
              color: '#3c6fec'
            }],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
          // endingShape: 'rounded',
          // startingShape:'rounded'
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "8px !important",
          fontFamily: 'poppins-semi',
          colors: ["#2c2c2e"]
        }
      },
      stroke: {
        show: true,
        width: 6,
        colors: ["transparent"]
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"],

        labels: {
          style: {
            fontSize: "8px"
          }
        }
        // position: "top",
      },
      yaxis: {
        axisTicks: {
          show: false
        },

        axisBorder: {
          show: false
        },
        labels: {
          show: false
        }
      },
      fill: {
        opacity: 1
      },
    };
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 6;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }

  navigate() {
    this.router.navigate(['leasemanagement']);

  }
  gotoleasemanagement() {
    this.router.navigate(["leasemanagement"])
  }
  leaseclk() {
    this.changetolease = true;
    this.changetodashboard = false
  }
  dashclk() {
    this.changetolease = false;
    this.changetodashboard = true
  }

  ToggleExpiry() {
    this.expiryisopen = !this.expiryisopen;
  }
  mouseEnter() {
    this.isDisplayhover = true;
    this.isDisplay = false;
    this.expiryisopen = true;
    // this.isDisplay = !this.isDisplay;
  }
  mouseLeave() {
    // this.isDisplay = true;
    // this.isDisplayhover = false;
    this.isDisplayhover = !this.isDisplayhover;
    this.expiryisopen = false;
  }

  onenter(event) {
    event.style({ width: "185px", animate: "5s" });
    this.onenter1(event)
  }
  onleave(event) {
    event.style({ width: "60px", animate: "5s" });
    this.onleave1(event)
  }
  onenter1(event) {
    if (event != 0) {
      event.style({ width: "0px", animate: "5s" });
    }
  }
  onleave1(event) {
    event.style({ width: "125px", animate: "5s" });
  }

}
