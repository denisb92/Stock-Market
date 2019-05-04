import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from "./dropdown.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockService } from './stock.service';
import { StockItemComponent } from './stock-item/stock-item.component';
import { DataStorageService } from './data-storage-service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { ChartsModule } from 'ng2-charts';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { AuthService } from './auth-service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SearchbarComponent,
    DropdownDirective,
    StockItemComponent,
    SignupComponent,
    SigninComponent,
    StockDetailComponent,
    StockChartComponent,
    ForgotPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  
  ],
  providers: [StockService,DataStorageService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
