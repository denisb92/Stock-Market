import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
errors:string;
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit() {
  }
onSubmit(form:NgForm){
  const email = form.value.email;
this.authservice.forgotEmail(email);
this.errors = "Sending..."
setTimeout(()=> {
  this.errors = this.authservice.errors;
  if(this.errors == "Sending..." || this.errors == null){
    alert("Email Sent to " + email )
    this.router.navigate(['/signin']);
    }


},1000);
}




}
