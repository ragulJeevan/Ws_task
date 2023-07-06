import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';
import { UserDataComponent } from './user-data/user-data.component';
import { UserActionComponent } from './user-action/user-action.component';
import { userReducer } from './models/users.reducer';
import { UsersEffect } from './models/users.effect';


@NgModule({
  declarations: [
    UserDataComponent,
    UserActionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('myUsers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
  ]
})
export class UserModule { }
