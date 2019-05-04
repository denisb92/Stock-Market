import { NgModule } from "@angular/core";
import{Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { StockDetailComponent } from "./stock-detail/stock-detail.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const appRoutes:Routes=[
    {path:'', component:SigninComponent},
    {path: 'search', component:SearchbarComponent},
    {path: 'dashboard',  component:DashboardComponent},
 
    {path: 'detail/:id',component:StockDetailComponent},
    {path: 'stock', component:StockDetailComponent},
    {path: 'signin', component:SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgotPass', component:ForgotPasswordComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}