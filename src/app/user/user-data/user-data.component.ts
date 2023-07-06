import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeUsersAPI } from '../models/users.action';
import { selectUsers } from '../models/users.selector'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  public users$! : Observable<any>;

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

}
