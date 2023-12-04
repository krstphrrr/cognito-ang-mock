import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';

import awsExports from '../../aws-exports'
import { Amplify } from 'aws-amplify';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-example',
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   MatTabsModule
  // ],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  constructor(
    public authenticator: AuthenticatorService,
    public router: Router,
    ){
    Amplify.configure(awsExports)
    this.authenticator = authenticator;
    authenticator.subscribe((data: any) => {
      if (data.authStatus !== "authenticated") {
        this.router.navigate(['/']);
      };
    })
  }
  ngOnInit(){
    console.log(this.authenticator)
  }
}
