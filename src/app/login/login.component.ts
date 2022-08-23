import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // properties/variables 


  // string interpolation method
  aim='your perfect banking partner'

  //property binding
  account='account number here'


  // user input validation
  loginForm=this.fb.group({
   
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })




  // database
  

  //to hold user acno
  acno=""


  //to hold user pswd
  pswd=""


// constructor - to initiliaze object
//dependecy injection
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }



//life cycle hook - angular
  ngOnInit(): void {
  }




// userdefined functions





// event binding method
// login
// login(){
  
//   var acno=this.acno
//   var pswd=this.pswd

//   let userDetails=this.userDetails

//   if(acno in userDetails){

//     if(pswd == userDetails[acno]['password']){
//       alert("Login sucessfull")
//     }else{
//       alert("Incorrect password")
//     }
//   }else{
//     alert("User doesnot exist")
//   }

// }





// template referncing variable method
// login(a:any,p:any){
  
//   var acno=a.value
//   var pswd=p.value

//   let userDetails=this.userDetails

//   if(acno in userDetails){

//     if(pswd == userDetails[acno]['password']){
//       alert("Login sucessfull")
//     }else{
//       alert("Incorrect password")
//     }
//   }else{
//     alert("User doesnot exist")
//   }

// }


// to way binding method - ngmodel
login(){
  
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd

    if(this.loginForm.valid){
 this.ds.login(acno,pswd)
 .subscribe(
  (result:any)=>{

    localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
    localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
    localStorage.setItem('token',JSON.stringify(result.token))



    alert(result.message)
    this.router.navigateByUrl("dashboard")
  },
  result=>{
    alert(result.error.message)
  }
 )      
  }else{
    alert("Invalid form")
  }

  
  
  }




}
