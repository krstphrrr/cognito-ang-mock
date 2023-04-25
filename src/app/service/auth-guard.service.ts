import { Injectable } from '@angular/core';

import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {Amplify} from 'aws-amplify';

const AUTH_API = 'http://localhost:3000/api/v1/aerosummary/';

@Injectable()

export class AuthGuardService {

 constructor() {}

 redirectToLogin() {

   const config = Amplify.Auth.configure();

   const {

     domain,

     redirectSignIn,

     redirectSignOut,

     responseType

   } = config.oauth;

   const clientId = config.userPoolWebClientId;

   const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;

   // Launch hosted UI

   window.location.assign(url);

 }
}

 /* canActivate(): boolean {

 canActivate(

   next: ActivatedRouteSnapshot,

   state: RouterStateSnapshot): Observable<boolean> {

   return this.amplifyService.auth().currentSession().catch((error)   =>  {

      this.redirectToLogin();

   });

 }

}*/