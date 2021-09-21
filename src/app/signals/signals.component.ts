import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectedRow } from 'src/app/Model/Object'
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
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors:string[];
  stroke:ApexStroke;
  plotOptions: ApexPlotOptions;
};
export interface List {
  AssertId: string;
  AssertName: string;
  // Catalogue: string;
  Location: string;
  AlertDate: string;
  AlertCount: string;
  Brand: string;
}

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
const LIST_DATA: List[] = [
  { AssertId: '209313', AssertName:'AC' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'2',Brand:"xx"},
  { AssertId: '209312', AssertName:'Electrical' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'6',Brand:"yy"},
  { AssertId: '209314', AssertName:'Laptop' , Location:'First', AlertDate:'August 12,2020',AlertCount:'9',Brand:"yy"},
  { AssertId: '209315', AssertName:'Panel' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'1',Brand:"xx"},
  { AssertId: '209316', AssertName:'AC' , Location:'First', AlertDate:'August 12,2020',AlertCount:'2',Brand:"yy"},
  { AssertId: '209317', AssertName:'Panel' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'2',Brand:"xx"},
  { AssertId: '209318', AssertName:'AC' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'2',Brand:"yy"},
  { AssertId: '209319', AssertName:'Panel' , Location:'First', AlertDate:'August 12,2020',AlertCount:'3',Brand:"xx"},
  { AssertId: '209319', AssertName:'AC' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'8',Brand:"xx"},
  { AssertId: '209313', AssertName:'Laptop' , Location:'First', AlertDate:'August 12,2020',AlertCount:'5',Brand:"xx"},
  { AssertId: '209312', AssertName:'AC' , Location:'Voltas', AlertDate:'August 12,2020',AlertCount:'6',Brand:"yy"},
];
@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements OnInit {
  selection = new SelectionModel<List>(true, []);
  displayedColumns: string[] = [
    'check',
    'AssertId',
    'AssertName',
    'Catalogue',
    'Location',
    'AlertDate',
    'AlertCount',
    'Brand',
    'Menu',
    
  ];
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
InfoAlert:number=0;
WarningAlert:List[]=[];
SuccessAlert:number=0;
DangerAlert:List[]=[];
SelectedRow: SelectedRow[] = [];
  public chartOptions: ChartOptions;
  public chartOptions1: ChartOptions1;
  isExpand: boolean=true;
  constructor(private router: Router) {
    this.chartOptions = {
      series: [80],
      chart: {
        height: 155,
        type: "radialBar"
      },
      colors:["#28fc49"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 20,
            size: "60%"
          },
         
          dataLabels: {
           // showOn: "always",
            name: {
              offsetY: 20,
              show: true,
              color: "#888",
              fontSize: "12px",
              fontFamily:"poppins"
            },
            value: {
              offsetY: -15,
              color: "#111",
              fontSize: "14px",
              fontWeight:600,
              fontFamily:"poppins",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Overall"]
    };
    //line
    this.chartOptions1 = {
     
      series: [
        {
          name: "Desktops",
          data: [10,80,35,55,8,80]
         
          
        },
        {
          name: "Desktops",
          data: [45,87,53,55,80,9]
        
        },
        {
          name: "Desktops",
          data: [1,98,39,54,85,19]
        
        },
        {
          name: "Desktops",
          data: [23,38,52,57,48,29]
        
        }
      ],
      
      chart: {
        toolbar: {
          show: false,
        }, 
        height: 180,
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
          text: "Signals",
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
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun"
        ]
      }
    };
  }
  allComplete:any;
  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  assign(){
    // console.log(this.selection.selected);
    this.SelectedRow = this.selection.selected;
    console.log(this.SelectedRow);
    localStorage.setItem('assignedRows', JSON.stringify(this.SelectedRow));
    
    localStorage.setItem('ass','true');
    this.router.navigate(['/assign']); 
  }

  IsSelected(){
    
      console.log(this.selection.selected);
    
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  Deleterow(index:number){
LIST_DATA.splice(index,1);
this.data = Object.assign(LIST_DATA);
this.dataSource = new MatTableDataSource<List>(this.data);
  }
  MovetoDanger(index:number){
this.DangerAlert.push(LIST_DATA[index]);
this.Deleterow(index);
  }
  MovetoWarning(index:number){
this.WarningAlert.push(LIST_DATA[index]);
this.Deleterow(index);

  }
  Expand(){
    this.isExpand=!this.isExpand;
  }
}
