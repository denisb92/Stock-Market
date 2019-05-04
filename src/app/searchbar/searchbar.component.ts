import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';
import {NgForm} from '@angular/forms';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../data-storage-service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  typechart:string = 'search';
Checker:Stock[];
datas: Stock;
searchRequest:string;
chartData:number[]= [];
btnDisabled:Boolean = false;
urlString: String = null;
chartDataClose: number;
chartDataOpen: number;
chartDataChange: number;
subscription1: Subscription;
subscription2: Subscription;
subscription3: Subscription;
errormsg:string;
time:string = 'm';
closing:string = 'close';
dateRequest:string = "Month Data: ";
notification:String = "Add To Dashboard";
  constructor(private http :Http, private stockservice:StockService,private router:Router,private dataStorage:DataStorageService ) {}

  ngOnInit() {
    
   
  }
onAdd(){
this.stockservice.addNewStock(this.datas);
console.log(this.datas.symbol);
this.dataStorage.storeStocks();
// this.dataStorage.storeStocks().subscribe(
//   (response:Response)=>{
//       console.log(response);
//   }
// );

this.router.navigate(['dashboard']);
  
}
onDay(){
  this.time = 'd';
  this.dateRequest = "Day Data:";
}
onYear(){
  this.time = 'y';
  this.dateRequest = "Year Data: ";
}
onMonth(){
  this.time = 'm';
  this.dateRequest = "Month Data: ";
}
onSearch(form:NgForm){
this.errormsg = "";
  this.notification = "Add To Dashboard";
  this.btnDisabled = false;
 this.searchRequest = form.value.name;
 this.stockservice.setCurrSearch(this.searchRequest);
 this.http.get('https://api.iextrading.com/1.0/stock/'+this.searchRequest +'/company').map((res: Response) => res.json()).catch((error: Response)=>{
    this.errormsg = "This Stock Ticker Does Not Exist"
  return Observable.throw('Something went wrong');

})

 .subscribe(data =>{
   console.log(data);
 this.datas = data;
 this.http.get('https://api.iextrading.com/1.0/stock/'+this.searchRequest +'/logo?filter=logo').map((res: Response) => res.json())
 .subscribe(data =>{
   
   this.urlString = data.url;
  // console.log(this.urlString);
  this.datas.icon = data.url;
  this.http.get('https://api.iextrading.com/1.0/stock/'+this.searchRequest +'/quote?filter=close,open,change,changePercent').map((res: Response) => res.json())
  .subscribe(data =>{
    
    this.datas.closing= data.close;
    this.datas.opening = data.open;
    this.datas.change = data.change;
    this.datas.changePercent = data.changePercent;
   
   
    
  });
  
 });
   
 });
console.log(this.datas);
this.Checker = this.stockservice.getStocks();
//console.log(this.Checker);
if(this.Checker != null){
for(let checks of this.Checker){
  
  if(this.Checker.length >=10){
    this.btnDisabled = true;
    this.notification = "Dashboard Full"
  }
  else if(checks.symbol.toLowerCase()  == this.searchRequest || checks.symbol.toUpperCase() == this.searchRequest)
  {
    
    this.btnDisabled = true;
    this.notification = "Exists On Dashboard"
  }


  console.log(checks.symbol.valueOf());
}
}




 form.reset();
}

}
