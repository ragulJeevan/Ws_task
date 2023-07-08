import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { UserActionComponent } from './user-action/user-action.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from '../guard/auth.guard';
import { UserGuard } from '../guard/user.guard';

const routes: Routes = [
  { path: 'user-details', component: UserDataComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'add-user', component: UserActionComponent, canActivate: [AuthGuard, UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
