import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions,ApexTooltip, ChartComponent } from "ng-apexcharts";
import { SelectionModel } from '@angular/cdk/collections';

export interface List {
  // photos: string;
  name: string;
  date: string;
  category: string;
  brand: string;
  value: string;
  status: string;
  assertid: string;
}
export interface ChartOptions  {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip:ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  fill: ApexFill;
};


const LIST_DATA: List[] = [
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Cleaner', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Bad',assertid:"209312"},
  { name: 'CCTV', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Thermal', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Fire Alarm', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs.40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Cleaner', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'CCTV', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Thermal', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Fire Alarm', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Cleaner', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'CCTV', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Thermal', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'Fire Alarm', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
  { name: 'AC', date:'August 12,2020' , category: 'Assert', brand:'Voltas', value:'Rs. 40,000',status:'Good',assertid:"209312"},
];
@Component({
  selector: 'app-ara-list',
  templateUrl: './ara-list.component.html',
  styleUrls: ['./ara-list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AraListComponent implements OnInit {
  op: any;
  an: any;
  res: number=1;
  // idarray:any[]=[{name:"209311"},{name:"209312"},{name:"209313"},{name:"209314"},{name:"209315"},]
  // count:number=0;
  // newassert: any;
  statop: any;
  status_res: number=1;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  i:any;
  displayedColumns: string[] = [
    'photos',
    'name',
    'date',
    'category',
    'brand',
    'value',
    'status',
    'assertid',
    
  ];
  // dataSource = LIST_DATA;
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
selection = new SelectionModel<List>(false, []);
  public chartOptions: ChartOptions;
  public chartOptions1: ChartOptions;
  public chartOptions2: ChartOptions;
  public chartOptions3: ChartOptions;
  public chartOptions4: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [15,20,20],
      labels: ['Lifespan(years)','Energy consumption(kWH)','Maintenance'],
      chart: {
        type: "donut",
        width:230,
        // height:10,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: '#ffffff',
            
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 10,
                color:'#0d0c22'
                
               
              },
              value: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY:-20,
                color:'#0d0c22'
               
              },
            }
          }
        }
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#1764e8', '#74a2f1','#c3d8fd','#d1e0fa','#e7effc']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
              height:10,
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ]
    };

    this.chartOptions1 = {
      series: [10,50,10],
      labels: ['Lifespan(years)','Energy consumption(kWH)','Maintenance'],
      chart: {
        type: "donut",
        width:230,
        // height:10,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: '#ffffff',
            
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 10,
                color:'#0d0c22'
                
               
              },
              value: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY:-20,
                color:'#0d0c22'
               
              },
            }
          }
        }
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#1764e8', '#74a2f1','#c3d8fd','#d1e0fa','#e7effc']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
              height:10,
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ]
    };

    this.chartOptions2 = {
      series: [12,10,20],
      labels: ['Lifespan(years)','Energy consumption(kWH)','Maintenance'],
      chart: {
        type: "donut",
        width:230,
        // height:10,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: '#ffffff',
            
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 10,
                color:'#0d0c22'
                
               
              },
              value: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY:-20,
                color:'#0d0c22'
               
              },
            }
          }
        }
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#1764e8', '#74a2f1','#c3d8fd','#d1e0fa','#e7effc']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
              height:10,
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ]
    };
    this.chartOptions3 = {
      series: [15,10,30],
      labels: ['Lifespan(years)','Energy consumption(kWH)','Maintenance'],
      chart: {
        type: "donut",
        width:230,
        // height:10,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: '#ffffff',
            
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 10,
                color:'#0d0c22'
                
               
              },
              value: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY:-20,
                color:'#0d0c22'
               
              },
            }
          }
        }
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#1764e8', '#74a2f1','#c3d8fd','#d1e0fa','#e7effc']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
              height:10,
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ]
    };
    this.chartOptions4 = {
      series: [20,10,25],
      labels: ['Lifespan(years)','Energy consumption(kWH)','Maintenance'],
      chart: {
        type: "donut",
        width:230,
        // height:10,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: '#ffffff',
            
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY: 10,
                color:'#0d0c22'
                
               
              },
              value: {
                show: true,
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                offsetY:-20,
                color:'#0d0c22'
               
              },
            }
          }
        }
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#1764e8', '#74a2f1','#c3d8fd','#d1e0fa','#e7effc']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
              height:10,
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ]
    };
   }

  ngOnInit(): void {
  this.an = localStorage.getItem("key")
  if(this.an==1){
    this.reloadfunc()
  }
  }
  reloadfunc(): void{
    location.reload();
    this.an = 2;
    localStorage.removeItem("key")
    localStorage.setItem("key",this.an) 
  }
  getID(id:any,stat:any){
    this.op=id
    console.log(this.op);
    // var assert = {
    //   name: "209311",
    //   mess: this.idarray[this.count],
    // };
    // this.newassert.push(assert);
    // ++this.count;
    if(this.op=="AC")
    {
      this.res=1
    }
    if(this.op=="Cleaner")
    {
      this.res=2
    }
    if(this.op=="CCTV")
    {
      this.res=3
    }
    if(this.op=="Thermal")
    {
      this.res=4
    }
    if(this.op=="Fire Alarm")
    {
      this.res=5
    }
    this.statop=stat;
    console.log(this.statop);
    if(this.statop=="Good")
    {
      this.status_res=1;
    }
    if(this.statop=="Bad")
    {
      this.status_res=2;
    }
  }
}
