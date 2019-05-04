import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../data-storage-service';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { auth } from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
subscription:Subscription
errors:string = '';
stocks:Stock[];
logging:boolean = false;
  constructor(private router:Router, private dataservice: DataStorageService, private stockService:StockService, private authservice:AuthService) { }

  ngOnInit() {
    //console.log(this.authservice.getToken())
  }
  onSubmit(form: NgForm){
    this.logging = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.signinUser(email,password);
    this.errors = "Logging In..."
    setTimeout(()=> {
      if(this.authservice.errors){
        this.errors = this.authservice.errors;
      }
   
      this.dataservice.setCurrentUser(email)
     this.Login();
    },1000);
    this.logging= false;
   
   
}
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

Login(){
  if(this.authservice.isAuthenticated()){
   
 console.log(this.dataservice.getStocks());
    // if(stocks !=null){
    //   this.stockService.setStocks(stocks);
    //   }
      setTimeout(()=> {
        this.router.navigate(['dashboard']);
      },1000);

//   this.subscription=  this.dataservice.getStocks().subscribe(
//     (stocks:Stock[])=>{
     
//      this.stockService.stocks = stocks;
     

//      }
// );

}

}
onForgotPassword(){
  this.router.navigate(['/forgotPass']);
}
}
