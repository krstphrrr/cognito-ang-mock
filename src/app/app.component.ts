import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CognitoService } from './cognito.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';



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
   this.http.get("http://localhost:3000/api/v1/aerosummary?PrimaryKey=12080116133138912012-09-01", requestOptions)
   .subscribe((res: any)=>{
    console.log(res)
   })
  }

  

}