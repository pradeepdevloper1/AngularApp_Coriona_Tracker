import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data:GlobalDataSummary[];
  loading=true;
  countries:string[]=[];
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  selectedCountryData:DateWiseData[];
  dateWiseData;
  dataTable =[];
  chart={
    PieChart:'PieChart',
    ColumnChart:'ColumnChart',
    LineChart:'LineChart',
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


  constructor(private service :DataServiceService) { }

  ngOnInit(): void {
    merge(
     this.service.getDateWiseData().pipe(
       map(result =>{
        this.dateWiseData=result;  
  
       })
     ),
     this.service.getglobalData().pipe(
       map(result=>{
        this.data=result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
       }))
    ).subscribe(
      {
        complete:()=>{
          this.updateValues('India');
          this.selectedCountryData=this.dateWiseData['India']
          this.updateChart();
          this.loading=false;
        }
      }
    )
  
  
  }
  updateValues(country:string){
  console.log(country);
  this.data.forEach(cs=>{
   if(cs.country==country){
     this.totalActive=cs.active
     this.totalConfirmed=cs.confirmed
     this.totalDeaths=cs.deaths 
     this.totalRecovered=cs.recovered
   } 
  })
    this.selectedCountryData=this.dateWiseData[country];
    this.updateChart();
    //console.log(this.selectedCountryData);
}
updateChart(){
  let dataTable=[];
 // dataTable.push(['cases','Date'])
  this.selectedCountryData.forEach(cs=>{
    dataTable.push([cs.cases,cs.cases])
  }) 
this.dataTable=dataTable;

}
}
