import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { DataStorageService } from '../data-storage-service';
import { StockService } from '../stock.service';
import { Subscription, Observable } from 'rxjs';
import { NgOnChangesFeature } from '@angular/core/src/render3';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit ,OnChanges{
  Chartdata:number[]= [];
  chartLegend:string[] = [];
  subscription:Subscription;
  
constructor(private dataStorage:DataStorageService, private stockservice:StockService){}
@Input() sym:String;
@Input() time:String;
@Input() type:string;
@Input() filter:string;

ngOnInit(){
 
 
//    this.dataStorage.getChartData(this.stockservice.getCurrSearch()).subscribe(data =>{

//    console.log(data[0].close);
//    for(let x =0; x< data.length; x++)
//    {
//      this.chartData.push(data[x].close)
//      this.chartLegend.push("Day: " + (x+1));

//    }
   
//   // this.chartData.push(data[0].close);
//   // this.chartData.push(data[4].close);
//   // this.chartData.push(data[8].close);
//   // this.chartData.push(data[12].close);
//   // this.chartData.push(data[16].close);
//   // this.chartData.push(data[20].close);
//  // this.chartData.push(data[24]);
//   console.log(this.stockservice.getCurrSearch());
//     console.log(typeof(this.chartData[0]));
//   });
}
  public lineChartData:Array<any> = [
    {data: <Array<number>>this.Chartdata}
    //{data: [187.63, 188.58, 190.24, 193.46, 190.7, 185.69], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = this.chartLegend;
  public lineChartOptions:any = {
    responsive: true
  };
  // public lineChartColors:Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(255,255,255)',
  //     borderColor: 'rgba(255,255,255,1)',
  //     pointBackgroundColor: 'rgba(255,255,255,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(255,255,255)'
  //   },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  // ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log(this.lineChartData);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 

  onLoadChart(data1:number)
  {
    let _lineChartData:Array<any> = new Array(data1);
    //let _lineChartLegend:Array<any> = new Array(data1);
    _lineChartData[0] = {data: new Array(data1), label: this.lineChartData[0].label};
    
    for(let x = 0; x < data1; x++){
      _lineChartData[0].data[x] = this.Chartdata[x];
      
    }

    this.lineChartData = _lineChartData;
    this.lineChartLabels= this.chartLegend;
   
  }
  ngOnChanges(){
    
     
    
     this.dataStorage.getChartData(this.sym, this.time).catch((error: Response)=>{
     
    return Observable.throw('Something went wrong')}).subscribe(data =>{
   console.log(this.sym);
      
      this.chartLegend.length = data.length;
      for(let x =0; x< data.length; x++)
      {
       if(this.filter == 'close'){
        this.Chartdata[x] = data[x].close;
       }
       else if(this.filter == 'high'){
        this.Chartdata[x] = data[x].high;
       }
       else if(this.filter == 'low'){
        this.Chartdata[x] = data[x].low;
       }
       else if(this.filter == 'average'){
        this.Chartdata[x] = data[x].average;
       }
       else if(this.filter == 'change'){
        this.Chartdata[x] = data[x].change;
       }

       
      
        this.chartLegend[x] =data[x].date;
       
   
      }
      
     // this.chartData.push(data[0].close);
     // this.chartData.push(data[4].close);
     // this.chartData.push(data[8].close);
     // this.chartData.push(data[12].close);
     // this.chartData.push(data[16].close);
     // this.chartData.push(data[20].close);
    // this.chartData.push(data[24]);
    //  console.log(this.Chartdata);
    //    console.log(typeof(this.Chartdata[0]));
   
    //    console.log(this.lineChartData.length);
       this.onLoadChart(data.length);
     });
    // if(this.chartData !=null){
    // this.chartData = [];}
   
    
  
     

  }
}



