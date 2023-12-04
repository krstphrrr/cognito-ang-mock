import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ExampleComponent } from './example/example.component';


const routes: Routes = [

  { path: 'authenticated', component: AuthenticatedComponent},
  {path: 'example', component: ExampleComponent}
 
  // { 
  //   path: '', 
  //   component: HomeComponent, 
  //   // canActivate: [AuthGuard]
  // },
 
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}