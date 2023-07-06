import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from '../models/app.action';
import { selectAppState } from '../models/app.selector';
import { Appstate } from '../models/appstate';
import { Users } from '../models/users';
import { invokeSaveNewUserAPI } from '../models/users.action';


@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent {

  userForm: Users = {
    id:0,
    user_name:'',
    user_role:'',
    user_skill:''
  };

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: this.userForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/user-details']);
      }
    });
  }

}
