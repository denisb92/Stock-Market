import { Stock} from "./stock.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage-service";
import { Subject } from "rxjs";


@Injectable()



export class StockService{
    fakestock:Stock;
    private stocks: Stock[];
    private stockNames: string[] = [];
    currSearch: string;
    num:number;
    latestRemoved: string; 
    stocksChange = new Subject<Stock[]>();
    constructor(){}
    addNewStock(stock:Stock){
        console.log(this.stocks);
      if(this.stocks == null){

      
       this.stocks = new Array();
    }
  
           this.stocks.push(stock);
    
   

        
   
        //this.stockNames.push(stock.symbol);
        this.stocksChange.next(this.stocks);
    }
   
    getStock(index:number){
        return this.stocks[index];
    }
    getStocks(){
        if(this.stocks != null){

        
        return this.stocks.slice();
        }
    }
    getCurrSearch(){
        return this.currSearch;
    }
    setCurrSearch(curr:string){
        this.currSearch = curr;
    }
    getStockSymbol(){
        return this.stocks.slice();
    }
    setStocks(stock: Stock[]){
        this.stocks = stock;
       this.stocksChange.next(this.stocks);
       console.log(this.stocks);
      
    }
    getNumChange(num:number){
        this.num= num;

    }
    getNum()
    {
        return this.num;
    }
    getDate(){
        var date = new Date();
        return date.getHours();
    }
    getDay(){
        var date = new Date();
        return date.getDay();
    }
    getCurrentDate(){
        var date = new Date();
        return date;;
    }
    removeStock(index:number){
        this.stocks.splice(index,1);
        this.stocksChange.next(this.stocks.slice());
    }
    clearStockList(){
        this.stocks = [];
    }
 
   
 
}