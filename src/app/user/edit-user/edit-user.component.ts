import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/user/models/app.action';
import { selectAppState } from 'src/app/user/models/app.selector';
import { Appstate } from 'src/app/user/models/appstate';
import { Users } from '../models/users';
import { invokeUpdateUserAPI } from '../models/users.action';
import { selectUserById } from '../models/users.selector';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userForm: Users = {
    id:0,
    user_name:'',
    user_role:'',
    user_skill:''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectUserById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateUserAPI({ updateUser: { ...this.userForm } })
    );
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
