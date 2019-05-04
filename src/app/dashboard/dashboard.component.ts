import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { Observable, Subscription } from 'rxjs';
import { Http } from '@angular/http';
import { DataStorageService } from '../data-storage-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
stocks: Stock[];
listSym: String[];
subscriptionArray:Subscription[] = [];
subscription:Subscription
time:Date;
open:string;
temp:any; 
DayOfWeek:string;
  constructor(private stockService: StockService, private http: Http, private dataService:DataStorageService,private router:Router) { }
  index: number = 0;

  ngOnInit() {


  this.time= this.stockService.getCurrentDate();

    this.stocks= this.stockService.getStocks();
    
//    this.stocks= this.stockService.getStocks();}
if(this.stockService.getDate() > 9 && this.stockService.getDate() < 16 && this.stockService.getDay() != 0 && this.stockService.getDay() != 6){
  this.open = "Open";
  if(this.stocks != null){


  this.onLoad();
 
this.temp = setInterval(() => this.onLoad(), 10000)
  }
}
else{
  this.open= "Closed";
  for(let stock of this.stocks){
    this.dataService.getClosedMarketData(stock.symbol).subscribe(data =>
      {
      
        console.log(data);
        stock.opening = data.open;
        stock.closing = data.close;
        stock.change = data.change;
        stock.changePercent = data.changePercent;
      }
    );
  }
 
  this.stockService.setStocks(this.stocks);

  }
  }
 
  ngOnChanges(){
    this.stocks = this.stockService.getStocks();
    
    console.log(this.stocks);
   
  }
  onDetail(){
    this.router.navigate(['detail']);
    
  }
 
  onLoad(){
    var counter = 0; 
    console.log(this.stockService.getDay())
    for(let stock of this.stocks){
   
this.subscriptionArray[counter] =  this.dataService.searchStocks(stock.symbol).subscribe(data =>{
    
  stock.current = data.iexRealtimePrice;
  stock.change = data.change;
 console.log(data.iexRealtimePrice);
 
  
});
counter++;
//this.subscriptionArray.push(this.subscription)
    }
   


//this.stocks[this.index].change = stock.change;
this.index++;

  
   
    
  }
  ngOnDestroy(){
    clearInterval(this.temp);
    if(this.subscriptionArray){

   for(let i = 0; i < this.subscriptionArray.length; i++){


    this.subscriptionArray[i].unsubscribe();
   }
    }
    console.log(this.subscriptionArray);
  }
  

}
