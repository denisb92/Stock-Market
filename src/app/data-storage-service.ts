import { Http, Response } from "@angular/http";
import { StockService } from "./stock.service";
import { Injectable } from "@angular/core";
import { Stock } from "./stock.model";
import { Subscription } from "rxjs";
import * as firebase from 'firebase';
import { ThrowStmt } from "@angular/compiler";
import { async } from "q";
@Injectable()
export class DataStorageService{
    Subscription:Subscription;
    datas: Stock;
   num:number;
    database;
    user:string;
  
    constructor(private http: Http, private stockService: StockService){}
    setCurrentUser(current:string){
    this.user = current;
    }
    getCurrentUser(){
        return this.user; 
    }
    storeStocks(){
        var userId = firebase.auth().currentUser.uid;
        console.log(userId);
        this.database = firebase.database();
        this.database.ref('users/ '+ userId).set({
            data:this.stockService.getStocks()
        });
        
        
    }
    getStocks(){ 
       var temp1;
        var userId = firebase.auth().currentUser.uid;
        console.log(userId);
       return firebase.database().ref('users/ '+ userId).once('value').then((snapshot)=> {
            var temp = snapshot.child("data").val()
           this.stockService.setStocks(temp);
              temp1 = temp;
            });
           
 
       
    }

    searchStocks(searchRequest){
   

 return this.http.get('https://api.iextrading.com/1.0/stock/'+searchRequest +'/quote?filter=iexRealtimePrice, change').map((res: Response) => res.json())

 



    }
    getClosedMarketData(searchRequest){
        return this.http.get('https://api.iextrading.com/1.0/stock/'+searchRequest +'/quote?filter=open,close, change,changePercent').map((res: Response) => res.json())
    }
    getChartData(searchRequest,time){
        return this.http.get('https://api.iextrading.com/1.0/stock/'+searchRequest +'/chart/1'+ time).map((res: Response) => res.json())

        
    }
  
    
}