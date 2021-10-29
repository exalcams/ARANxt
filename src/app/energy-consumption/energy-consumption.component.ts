import { Component, OnInit } from '@angular/core';
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
import { SpaceService } from '../space/space.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors:string[];
  stroke:ApexStroke;
  plotOptions: ApexPlotOptions;
};
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
@Component({
  selector: 'app-energy-consumption',
  templateUrl: './energy-consumption.component.html',
  styleUrls: ['./energy-consumption.component.scss']
})
export class EnergyConsumptionComponent implements OnInit {
  public chartOptions: ChartOptions;
  assert: boolean = true;
  public chartOptions1: ChartOptions1;
  constructor(private service: SpaceService) {
    this.chartOptions1 = {
     
      series: [
        // {
        //   name: "Desktops",
        //   data: [10,80,35,55,8,80,34]
         
          
        // },
        {
          name: "Desktops",
          data: [45,87,53,55,80,9]
        
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
            fontSize: '10px',
            fontFamily: 'poppins-semi',
            fontWeight: 600,
            
        },
        },
        labels: {
         
          style: {
            colors:"#acacac",
            fontSize: '10px',
            fontFamily: 'poppins-semi',
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
            fontFamily: 'poppins-semi',
            fontWeight: 600,
          }
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          // "Sun"
        ]
      }
    };
    
   }
   Area:any[];
   SelectedArea:any[];
   child : string[]=[];
   Electrical: any[] = [];
   setInterval = setInterval;

  ngOnInit(): void {
    setInterval(() => this.GetARASpace(),50);
    this.GetEnergyConsumption();
    // this.SelectedArea=["TNEB","HT Structure","Sub HT Structure","Transformer 1","Transformer 2","MV Panel","Sub MV Panel "];
    // this.Area=["Area B1","Area B2","Area G1","Area F1","Area F3","Area F2","Area F4","Area F2","Area F4"]

  }
  GetEnergyConsumption(){
    this.service.GetEnergyConsumption().subscribe(
      (data) => {
        if (data) {
          this.Electrical = data;
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

  assertdetails(a: any) {
    
    if (a == 1) {
      this.assert = false;
    }
    else {
      this.assert = true;
    }
  }
}
