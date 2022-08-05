import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


//  login username

currentUsername:any

// login acno

currentAcno:any


// acno to child
acno:any 



  // database
  userDetails:any={
    1000:{acno:1000,userName:'neer',password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,userName:'laisha',password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,userName:'vyom',password:1002,balance:4000,transaction:[]}
  }


  constructor() {
    this.getDetails()
   }

// to store data in localstorage

saveDetails(){

  //database
  if(this.userDetails){
    localStorage.setItem('userDetails',JSON.stringify(this.userDetails))
  }

  // login acno
if(this.currentAcno){
  localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
}

//login username
if(this.currentUsername){
  localStorage.setItem('currentUsername',JSON.stringify(this.currentUsername))
}


}


// to get data from localstorage

getDetails(){

  //database
  if(localStorage.getItem('userDetails')){
    this.userDetails=JSON.parse(localStorage.getItem('userDetails') ||'')
  }

  if(localStorage.getItem('currentAcno')){
    this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') ||'')
  }

  if(localStorage.getItem('currentUsername')){
    this.currentUsername=JSON.parse(localStorage.getItem('currentUsername') ||'')
  }
}







  //register

  register(acno:any,password:any,userName:any){

    let userDetails=this.userDetails

    if(acno in userDetails){
      return false
    }else{
      userDetails[acno]={
        acno,
        userName,
        password,
        balance:0,transaction:[]
      }
      this.saveDetails()
      return true
    }
    
  }

//login
login(acno:any,pswd:any){
   let userDetails=this.userDetails
  if(acno in userDetails){
   if(pswd == userDetails[acno]['password']){
    this.currentUsername=userDetails[acno]['userName']
    this.currentAcno=acno
    this.saveDetails()
         return true
      }else{
        alert("Incorrect password")
        return false
      }
    }else{
      alert("User doesnot exist")
      return false
    }
  
  }



  //deposit

  deposit(acno:any,pswd:any,amt:any){

let userDetails=this.userDetails
var amount=parseInt(amt)
if(acno in userDetails){

  if(pswd == userDetails[acno]['password']){

    userDetails[acno]['balance']+=amount
    userDetails[acno]['transaction'].push({
      type:'credit',
      amount

    })
    this.saveDetails()
    return userDetails[acno]['balance']

  }else{
    alert("Incorrect password")
    return false
  }

}else{
  alert("User does not exist")
  return false
}

  }


  // withdraw
  withdraw(acno:any,pswd:any,amt:any){

    let userDetails=this.userDetails
    var amount=parseInt(amt)
    if(acno in userDetails){

      if(pswd == userDetails[acno]['password']){

        if(userDetails[acno]['balance']>amount){
          userDetails[acno]['balance']-=amount
          userDetails[acno]['transaction'].push({
            type:'debit',
            amount
      
          })
          this.saveDetails()
          console.log(userDetails);
          
          return userDetails[acno]['balance']
        }else{
          alert("Insufficient balance")
          return false
        }

        

      }else{
        alert("Incorrect password")
        return false
      }

    }else{
      alert("User does not exist")
      return false
    }

  }


  //transaction
  getTransaction(acno:any){
    return this.userDetails[acno]['transaction']
  }


}
