import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CognitoService } from './cognito.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

const URL_LS:string[]=[
  // "http://localhost:3000/api/v1/dataHeader?ProjectKey=NDOW&take=1",
  "http://localhost:3000/api/v1/dataheader?PrimaryKey=12080116133138912012-09-01&take=1000",
  "http://localhost:3000/api/v1/dataHeader?ProjectKey=NDOW&take=1000"
]
const URL_unprotected:string = "http://localhost:3000/api/v1/dataheader?PrimaryKey=12080116133138912012-09-01"

const URL_LSDP:string[]=[
  "http://localhost:5001/api/ndow"
]

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
  getTEST(printme:any){
    // this.authenticator.user.getSession()
    // this.http.get(URL_unprotected)
    // .subscribe((res:any)=>{
    //   console.log(res)
    // })
  }

  getNDOW_DATAPACKET(printme:any){
    const body = {
      data:{
        "primaryKeys":[
          "17101012114127892017-09-01",
        ],
      },
    }
    let id = this.authenticator.user.getSignInUserSession()
    let idT = id?.getIdToken()
    let idTJ = idT?.getJwtToken()

    let headers = new HttpHeaders({
      'ContentType': 'application/json',
      'Authorization': `Bearer ${idTJ}`
    })
    let requestOptions = {headers: headers}
    console.log(requestOptions)
    this.http.put(URL_LSDP[0], body, requestOptions)
    .subscribe((res:any)=>{
      console.log(res)
    })
  }
  getNDOW_DATAPACKET_BADTOKEN(printme:any){
    const body = {
      data:{
        "primaryKeys":[
          "17101012114127892017-09-01",
        ],
      },
    }
    let id = this.authenticator.user.getSignInUserSession()
    let idT = id?.getIdToken()
    let idTJ = idT?.getJwtToken()

    let headers = new HttpHeaders({
      'ContentType': 'application/json',
      'Authorization': `Bearer `
    })
    let requestOptions = {headers: headers}
    console.log(requestOptions)
    this.http.put(URL_LSDP[0], body, requestOptions)
    .subscribe((res:any)=>{
      console.log(res)
    })
  }
}