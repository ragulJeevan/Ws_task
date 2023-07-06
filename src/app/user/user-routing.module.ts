import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { UserActionComponent } from './user-action/user-action.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'user-details',component:UserDataComponent},
  {path:'edit-user/:id',component:EditUserComponent},
  {path:'add-user',component:UserActionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
