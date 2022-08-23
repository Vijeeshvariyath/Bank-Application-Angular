import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';


// global headers

const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  
  constructor(private http:HttpClient) {
   
   }

  //register

  register(acno:any,password:any,userName:any){

// req body
    
    const data={
      acno,password,userName
    }

// register api - asynchronous

    return this.http.post('http://localhost:3000/register',data)
    
  }

//login
login(acno:any,pswd:any){
  // req body
    
  const data={
    acno,pswd
  }

// register api - asynchronous

  return this.http.post('http://localhost:3000/login',data)
  
}

// to get headers with token

getOptions(){
  // fetch the token from localstorage
  const token = JSON.parse(localStorage.getItem('token')||'')
  // to get the header,create an header for httpheaders

  let headers = new HttpHeaders()
  // append token inside the header
  if(token){
    headers = headers.append('x-access-token',token)
    // implement overloaded
    options.headers=headers
  }
  return options

} 

  //deposit

  deposit(acno:any,pswd:any,amt:any){
// req body
    
const data={
  acno,pswd,amt
}

// register api - asynchronous

return this.http.post('http://localhost:3000/deposit',data,this.getOptions())

  }


  // withdraw
  withdraw(acno:any,pswd:any,amt:any){

    // req body
    
const data={
  acno,pswd,amt
}

// register api - asynchronous

return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())


  }


  //transaction
  getTransaction(acno:any){
     // req body
    
const data={
  acno
}

// register api - asynchronous

return this.http.post('http://localhost:3000/getTransaction',data,this.getOptions())

  }

  //delete api
  delete(acno:any){
    return this.http.delete('http://localhost:3000/onDelete/'+acno)
  }

}
