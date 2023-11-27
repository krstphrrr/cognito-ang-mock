import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import awsconfig from '../aws-exports';
import {Amplify} from 'aws-amplify';
import { HomeComponent } from './home/home.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
// import { httpInterceptorProviders } from './interceptor/http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

Amplify.configure(awsconfig)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
