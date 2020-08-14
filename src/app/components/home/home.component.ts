import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;

  globalData:GlobalDataSummary[];
  dataTable =[];
  chart={
    PieChart:'PieChart',
    ColumnChart:'ColumnChart',
    height:600,
    width:800,
    options:{
      animation:{
        duration:1000,
        easing:'out'
      },
      Is3D:true
    }
  };
  constructor(private  dataservice :DataServiceService) { }

  initChart(caseType:string){
      this.dataTable=[];
        
        //this.dataTable.push(["Country","Cases"])
        this.globalData.forEach(cs=>{
          let value:number ;
          if(caseType =='c'){
            if(cs.confirmed>5000){
             value=cs.confirmed
             } 
          }
          else if(caseType =='d'){
            if(cs.deaths>5000){
              value=cs.deaths
             } 
          }
          else if(caseType =='r'){
            if(cs.recovered>5000){
              value=cs.recovered
             } 
          }
          else if(caseType =='a'){
            if(cs.active>5000){
              value=cs.active
             } 
          }
         this.dataTable.push([
            cs.country,value
            ])
        })
        console.log(this.dataTable);
        
   }
   ngOnInit(): void {
        this.dataservice.getglobalData().subscribe(
          {next: (result)=>{
            console.log(result);
            this.globalData=result;
            result.forEach(cs=>{
              if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeaths+=cs.deaths
              this.totalRecovered=cs.recovered
              }
            })
            this.initChart('c');
          }
        })
      }
      
      updateChart(input :HTMLInputElement){
        console.log(input.value);
        this.initChart(input.value); 
      }

}
