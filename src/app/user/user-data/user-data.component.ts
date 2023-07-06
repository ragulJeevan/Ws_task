import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeDeleteUserAPI, invokeUsersAPI, } from '../models/users.action';
import { selectUsers } from '../models/users.selector';
import { Appstate } from 'src/app/user/models/appstate'
import { setAPIStatus } from 'src/app/user/models/app.action';
import { selectAppState } from 'src/app/user/models/app.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  public users$! : Observable<any>;
  appStore: any;
  deleteModal: any;

  constructor(
    private store: Store,
    private router : Router
  ){
  }
  

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectUsers));
    this.store.dispatch(invokeUsersAPI());
  }
  addUser(){
    this.router.navigate(['/user/add-user'])
  }

  delete(data:any) {
    this.store.dispatch(
      invokeDeleteUserAPI({
        id: data.id,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState:any) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

}
