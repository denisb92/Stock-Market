import { Component, OnInit, ElementRef } from '@angular/core';
import { DataStorageService } from './data-storage-service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  loadedFeature = 'Dashboard';
constructor(private dataservice:DataStorageService, private elementref: ElementRef){}
  ngOnInit(){
    
    firebase.initializeApp({
      apiKey: "AIzaSyA9bAbGYz_6k3rrZmSEHiNsUAtU7q8SJuA",
      authDomain: "stockmarketapp-d0b57.firebaseapp.com",
      databaseURL:"https://stockmarketapp-d0b57.firebaseio.com"
    });
  }
 onNavigate(feature: string){
  
   console.log(feature);
   this.loadedFeature = feature;
 }
 
}
