import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Login module routing
const loginMOdule = () => import('src/app/login/login-routing.module').then(x => x.LoginRoutingModule);
//USER module routing
const userMOdule = () => import('src/app/user/user-routing.module').then(x => x.UserRoutingModule);

const routes: Routes = [
  //LOGIN MODULE
  { path: 'login', loadChildren: loginMOdule },

  // USER MODULE
  { path: 'user', loadChildren: userMOdule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
