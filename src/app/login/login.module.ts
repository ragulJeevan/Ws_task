import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { UsersEffect } from '../models/users.effect';
import { userReducer } from '../models/users.reducer';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myUsers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ]
})
export class LoginModule { }