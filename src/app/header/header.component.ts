import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { StockService } from '../stock.service';
import { DataStorageService } from '../data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authservice:AuthService, private stockservice:StockService, private dataservice:DataStorageService) { }

isAuthenticated(){
  return this.authservice.isAuthenticated();
}
onLogout(){

  this.authservice.logout();
  this.stockservice.clearStockList();
  window.location.replace("./signin");
}


}
