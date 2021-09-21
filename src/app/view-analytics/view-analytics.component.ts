import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as ApexCharts from 'apexcharts';
import { ApexNonAxisChartSeries,
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
  ApexFill} from 'ng-apexcharts';
  export type ChartOptions1 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis:ApexYAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    markers:ApexMarkers;
   // colors:string[], 
    legend:ApexLegend,
   
  
  };
  export type ChartOptions2 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis:ApexYAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    markers:ApexMarkers;
   // colors:string[], 
    legend:ApexLegend,
   
  
  };
  export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors:string[];
    stroke:ApexStroke;
    plotOptions: ApexPlotOptions;
  };
@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.component.html',
  styleUrls: ['./view-analytics.component.scss'],
  // encapsulation: ViewEncapsulation.None

})

export class ViewAnalyticsComponent implements OnInit {
  public chartOptions1: ChartOptions1;
  public chartOptions2: ChartOptions2;
  public chartOptions: ChartOptions;
Analytics=['Overview','Spend Analysis','Electrical Consumption','Water Consumption','Product Suggestions','Common Faults']
  constructor(public dialogRef: MatDialogRef<ViewAnalyticsComponent>) { 
    this.chartOptions1 = {
     
      series: [
        {
          name: "Desktops",
          data: [10,80,35,55,8,80,34]
         
          
        },
        {
          name: "Desktops",
          data: [45,87,53,55,80,9,56]
        
        },
        {
          name: "Desktops",
          data: [1,98,39,54,85,19,34]
        
        },
        {
          name: "Desktops",
          data: [23,38,52,57,48,29,61]
        
        },
        
      ],
      
      chart: {
        toolbar: {
          show: false,
        }, 
        height: 110,
        width: '100%',
        offsetY:20,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: [2,0,0,0],
        
      },
      legend: {
        show: false},
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        xaxis: {
          lines: {
              show: true
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      },
        row: {
          colors: [], // takes an array which will be repeated on columns 
          opacity: 0.5
        },
        column: {
          colors: [ ], // takes an array which will be repeated on columns 
          opacity: 0.5
      }, 
      },
      markers: {
        size: [5,4,4,4],
        hover: {
          size: 5
        }
      },
      yaxis: {
        title: {
          text: "",
          style: {
            color:'#acacac',
            fontSize: '12px',
            fontFamily: 'poppins',
            fontWeight: 600,
            
        },
        },
        labels: {
         
          style: {
            colors:"#acacac",
            fontSize: '10px',
            fontFamily: 'poppins',
            fontWeight: 600,
          }
        },
        min: 0,
        max: 100,
        tickAmount: 4,
      },
      xaxis: {
        labels: {
         
          style: {
            colors:"#acacac",
            fontSize: '10px',
            fontFamily: 'poppins',
            fontWeight: 600,
          }
        },
        categories: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ]
      }
    };
    //Expense chart
    this.chartOptions2 = {
     
      series: [
        {
          name: "Desktops",
          data: [10,80,35,55]
         
          
        },
        {
          name: "Desktops",
          data: [45,87,53,55]
        
        },
        // {
        //   name: "Desktops",
        //   data: [1,98,39,54,85,19,34]
        
        // },
        // {
        //   name: "Desktops",
        //   data: [23,38,52,57,48,29,61]
        
        // },
        
      ],
      
      chart: {
        toolbar: {
          show: false,
        }, 
        height: 190,
        width: '100%',
        type: "line",
        zoom: {
          enabled: false
        }
      },
      
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: [2,0,0,0],
        
      },
      legend: {
        show: false},
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        xaxis: {
          lines: {
              show: true
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      },
        row: {
          colors: [], // takes an array which will be repeated on columns 
          opacity: 0.5
        },
        column: {
          colors: [ ], // takes an array which will be repeated on columns 
          opacity: 0.5
      }, 
      },
      markers: {
        size: [5,4,4,4],
        hover: {
          size: 5
        }
      },
      yaxis: {
        title: {
          text: "",
          style: {
            color:'#acacac',
            fontSize: '12px',
            fontFamily: 'poppins',
            fontWeight: 600,
            
        },
        },
        labels: {
         
          style: {
            colors:"#acacac",
            fontSize: '10px',
            fontFamily: 'poppins',
            fontWeight: 600,
          }
        },
        min: 0,
        max: 100,
        tickAmount: 4,
      },
      xaxis: {
        title: {
          text: " Last 4 Months",
          style: {
            color:'#acacac',
            fontSize: '12px',
            fontFamily: 'poppins',
            fontWeight: 600,
            
        },
        },
        
        labels: {
         
          style: {
            colors:"#acacac",
            fontSize: '10px',
            fontFamily: 'poppins',
            fontWeight: 600,
          }
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          
        ]
      }
    };
    //radial

    // var options1 = {
    //   chart: {
    //     height: 280,
    //     type: "radialBar",
    //   },
    //   series: [67],
    //   colors: ["#20E647"],
    //   plotOptions: {
    //     radialBar: {
    //       startAngle: -135,
    //       endAngle: 135,
    //       track: {
    //         background: '#333',
    //         startAngle: -135,
    //         endAngle: 135,
    //       },
    //       dataLabels: {
    //         name: {
    //           show: false,
    //         },
    //         value: {
    //           fontSize: "30px",
    //           show: true
    //         }
    //       }
    //     }
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "dark",
    //       type: "horizontal",
    //       gradientToColors: ["#87D4F9"],
    //       stops: [0, 100]
    //     }
    //   },
    //   stroke: {
    //     lineCap: "butt"
    //   },
    //   labels: ["Progress"]
    // };
    
    // new ApexCharts(document.querySelector("#chart1"), options1).render();

    this.chartOptions = {
      series: [80],
      chart: {
        height: 235,
        // width:70,
        type: "radialBar",
        offsetY: -20,
      },
      colors:["#dd5049"],
      plotOptions: {
        radialBar: {
          startAngle: -125,
          endAngle: 125,
          hollow: {
            margin: 20,
            size: "70%",
            
            image: 'assets/Group 8319.svg',
            imageWidth: 44,
            imageHeight: 44,
            imageClipped: false
          },
         
          dataLabels: {
            
           // showOn: "always",
            name: {
              offsetY: 60,
              show: true,
              color: "#888",
              fontSize: "12px",
              fontFamily:"poppins"
            },
            value: {
              offsetY: 25,
              
              color: "#111",
              fontSize: "14px",
              fontWeight:600,
              fontFamily:"poppins",
              show: true,
              
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Spend Amount "]
    };
    
  }

  ngOnInit(): void {
  }
  Close():void{
    this.dialogRef.close();
  }

}
