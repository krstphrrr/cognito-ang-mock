import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CognitoService } from './cognito.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

const URL_LS:string[]=[
  "http://localhost:3000/api/v1/dataHeader?ProjectKey=NDOW",
  "http://localhost:5016/api/v1/dataHeader?ProjectKey=NDOW"
]
const URL_unprotected:string = "http://localhost:5016/api/v1/dataheader?PrimaryKey=12080116133138912012-09-01"

const API_URL:string = URL_LS[1]; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  stub: string = "test";
  headers:any;

  constructor(
    // private router: Router,
    //           private cognitoService: CognitoService,
              public http: HttpClient,
              public authenticator: AuthenticatorService,
              )
               {
    this.isAuthenticated = false;
  }


  ngOnInit(){

  }

  printUser(printme:any){
    console.log(printme)
  }

  getPayload(printme:any){
    let id = this.authenticator.user.getSignInUserSession()
    let idT = id?.getIdToken()
    let idTJ = idT?.getJwtToken()

    let headers = new HttpHeaders({
      'ContentType': 'application/json',
      'Authorization': `Bearer ${idTJ}`
    })
    let requestOptions = {headers: headers}
    console.log(headers)
   this.http.get(API_URL, requestOptions)
   .subscribe((res: any)=>{
    console.log(res)
   })
  }
  getPayloadBADTOKEN(printme:any){
    let id = this.authenticator.user.getSignInUserSession()
    let idT = id?.getIdToken()
    let idTJ = idT?.getJwtToken()

    let headers = new HttpHeaders({
      'ContentType': 'application/json',
      'Authorization': `Bearer `
    })
    let requestOptions = {headers: headers}
    console.log(headers)
   this.http.get(API_URL, requestOptions)
   .subscribe((res: any)=>{
    console.log(res)
   })
  }

  getPayloadNOAUTHNDOW(printme:any){
    this.http.get(API_URL)
    .subscribe((res:any)=>{
      console.log(res)
    })
  }

  getPayloadNOAUTH(printme:any){
    this.http.get(URL_unprotected)
    .subscribe((res:any)=>{
      console.log(res)
    })
  }

  

}