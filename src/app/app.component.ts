import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isAuthenticated: boolean;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.isAuthenticated = false;
  }

  

}