import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//login username
  user=""



acno=""
pswd=""
amount=""

acno1=""
pswd1=""
amount1=""


dashForm=this.fb.group({
 
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
})

withdrawForm=this.fb.group({
 
  acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
})


lDate:any



  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUsername
    this.lDate=new Date()
  }

  ngOnInit(): void {

    if(!localStorage.getItem('currentAcno')){
alert("Please login")
this.router.navigateByUrl("")

    }

  }


  //deposit

  deposit(){
    
    var acno=this.dashForm.value.acno
    var pswd=this.dashForm.value.pswd
    var amount=this.dashForm.value.amount

    if(this.dashForm.valid){
      const result = this.ds.deposit(acno,pswd,amount)
      if(result){
        alert(`${amount} deposited sucessfully and new balance is ${result}`)
      }

    }else{
      alert("Invalid form")
    }
   



  }




//withdraw

withdraw(){

  let acno=this.withdrawForm.value.acno1
  let pswd=this.withdrawForm.value.pswd1
  let amount=this.withdrawForm.value.amount1

  if(this.withdrawForm.valid){
    const result = this.ds.withdraw(acno,pswd,amount)

 if(result){
  alert(`${amount} debited sucessfully and new balance is ${result}`)
 }

  }else{
    alert("Invalid form")
  }
 

}


//logout
logout(){
  //remove login acno.username
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUsername')

  //navigate to login
  this.router.navigateByUrl("")


}

//deleteparent

deleteparent(){

  this.acno=JSON.parse(localStorage.getItem('currentAcno') ||'')

}

//cancel()-to set acno as empty
cancel(){
  this.acno=""
}

}
