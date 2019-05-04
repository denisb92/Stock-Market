import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { Http, Response } from '@angular/http';
import { URL } from 'url';
import { DataStorageService } from '../data-storage-service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
id:number =0;;
stock:Stock;
stocks:Stock[];
aapl:string='aapl';
d:string = 'd';
m:string ='m';
y:string = 'y';
newVal:string = "close";
newVal2:string = "close";
newVal3:string = "close";
category:string;
typechart:string = 'dashinfo';
categories:string[] = ['close','low','high', 'average'];
categories2:string[]= ['close','low', 'high', 'change']
  constructor(private route:ActivatedRoute,private stockService:StockService, private router:Router,private datastorage:DataStorageService) { }

  ngOnInit() {
    console.log(this.category);
    this.stocks = this.stockService.getStocks();
   // this.id = this.route.snapshot.params['id'];
    this.id = +this.route.snapshot.url[1].path;
   // console.log(this.id);
   this.stock = this.stockService.getStock(this.id);
   //console.log(this.route.snapshot.url[1].path);
    this.route.queryParams.subscribe(
      (params: Params) =>{
         
         // this.stock = this.stockService.getStock(this.id);
      
      }
    );
  }
  onRemove(){
   alert(this.stocks[this.id].companyName + " was removed from your dashboard")
    this.stockService.removeStock(this.id)
    this.datastorage.storeStocks();
    // this.datastorage.storeStocks().subscribe(
    //   (response:Response)=>{
    //       console.log(response);
    //   }
    // );
    this.router.navigate(['dashboard']);
  }
  onChange(event):void{
    this.newVal= event.target.value;
    console.log(this.newVal);
  }
  onChange2(event):void{
    this.newVal2= event.target.value;
    console.log(this.newVal2);
  }
  onChange3(event):void{
    this.newVal3= event.target.value;
    console.log(this.newVal3);
  }

}
