import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    errors: string = "";
    token: string =null;
    constructor(private router: Router){}
    signupUser(email: string, password:string){
        this.errors = null;
       firebase.auth().createUserWithEmailAndPassword(email,password)
        .catch(
            
            error => this.errors = error.message
         
        )
        
    }

    signinUser(email: string,password:string){
        this.errors = null;
       
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            response =>{
                
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string) =>this.token = token
                    
                )
            }
        )
        .catch(
            error => this.errors = error.message
        );
        console.log(this.token);
    }
    isAuthenticated(){
      
        return this.token !=null;
    }
    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
    getToken(){
        firebase.auth().currentUser.getIdToken().then(
           (token:string) =>this.token = token
       );
       return this.token;
   }
   forgotEmail(email){
    
       this.errors = null;
       firebase.auth().sendPasswordResetEmail(email).catch(
            
        error => this.errors = error.message
     
    );
   }
}