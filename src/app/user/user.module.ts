import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDataComponent } from './user-data/user-data.component';
import { UserActionComponent } from './user-action/user-action.component';


@NgModule({
  declarations: [
    UserDataComponent,
    UserActionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
