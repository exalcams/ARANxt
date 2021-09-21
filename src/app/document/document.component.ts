import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {

  fileToUpload:any[]=[];
  fileToUpload_conf: any[]=[];
  fileToUpload_bill: any[]=[];
  editClicked: any=-1;
  editClicked_conf: any=-1;
  editClicked_bill: any=-1;
  certName:any;
  constructor() {

   }
  
  ngOnInit(): void {
  }
  input_changed(){
    this.editClicked=-1;
    this.editClicked_conf=-1;
    this.editClicked_bill=-1;
  }
  handleFileInput(evt:any): void {
    if (evt.target.files && evt.target.files.length > 0) {
     // this.fileToUpload.forEach(x=>x.name=x.name.split(".")[0])
     var name=evt.target.files[0].name.split(".")[0];
     if(name.length && name.includes(" ")){
         var n=name.split(" ")[1];
         if(n.length>15)
         {
           name=name.split(" ")[0];
         }
     }
     else{
       if(name.includes("_")&& name>20){
        name= name.split("_")[0];
       }
     }
      this.fileToUpload.push({"Name":name,"File":evt.target.files[0]});
      
      // this.fileToUploadList.push(this.fileToUpload);
      console.log(this.fileToUpload)
    }}
    handleFileInput_conf(evt:any): void {
      if (evt.target.files && evt.target.files.length > 0) {
       // this.fileToUpload.forEach(x=>x.name=x.name.split(".")[0])
       var name=evt.target.files[0].name.split(".")[0];
       if(name.length && name.includes(" ")){
        var n=name.split(" ")[1];
        if(n.length>15)
        {
          name=name.split(" ")[0];
        }
    }
    else{
      if(name.includes("_")&& name>20){
       name= name.split("_")[0];
      }
    }
        this.fileToUpload_conf.push({"Name":name,"File":evt.target.files[0]});
        
        // this.fileToUploadList.push(this.fileToUpload);
        console.log(this.fileToUpload)
      }
    }
      handleFileInput_bill(evt:any): void {
        if (evt.target.files && evt.target.files.length > 0) {
         // this.fileToUpload.forEach(x=>x.name=x.name.split(".")[0])
         var name=evt.target.files[0].name.split(".")[0];
         if(name.length && name.includes(" ")){
          var n=name.split(" ")[1];
          if(n.length>15)
          {
            name=name.split(" ")[0];
          }
      }
      else{
        if(name.includes("_")&& name>20){
         name= name.split("_")[0];
        }
      }
      
          this.fileToUpload_bill.push({"Name":name,"File":evt.target.files[0]});
          
          // this.fileToUploadList.push(this.fileToUpload);
          console.log(this.fileToUpload)
        }
  }
  RemoveItem_cert(i:any):void{
this.fileToUpload.splice(i,1);
  }
  RemoveItem_conf(i:any):void{
    this.fileToUpload_conf.splice(i,1);
      }
      RemoveItem_bill(i:any):void{
        this.fileToUpload_bill.splice(i,1);
          }
          edit_cert(i:any){
            // console.log(i);
            this.editClicked=i;
            
          }
          edit_conf(i:any){
            // console.log(i);
            this.editClicked_conf=i;
            
          }
          edit_bill(i:any){
            // console.log(i);
            this.editClicked_bill=i;
            
          }

}
