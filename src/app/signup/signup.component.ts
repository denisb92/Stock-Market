import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
errors: string = '';
  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit() {

  }
OnSignUp(form:NgForm){
  this.errors = '';
  const email = form.value.email;
  const password = form.value.password
  
this.authservice.signupUser(email,password);
this.errors = "Creating Account..."
setTimeout(()=> {
  this.errors = this.authservice.errors;
  if(this.errors == "Creating Account..." || this.errors == null){
    alert("Account Created!")
    this.router.navigate(['/signin']);
    }
},1000);


}
}
