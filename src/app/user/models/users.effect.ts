import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { usersFetchAPISuccess, invokeUsersAPI } from './users.action';
import { selectUsers } from './users.selector';
 
@Injectable()
export class UsersEffect {

 constructor(
    private actions$: Actions,
    private usersService: UserService,
    private store: Store
 ){

 }   

 loadAllUsers$ = createEffect(() =>
 this.actions$.pipe(
   ofType(invokeUsersAPI),
   withLatestFrom(this.store.pipe(select(selectUsers))),
   mergeMap(([, userformStore]) => {
     if (userformStore && userformStore.length > 0) {
       return EMPTY;
     }
     return this.usersService
       .get()
       .pipe(map((data) => usersFetchAPISuccess({ allUsers: data })));
   })
 )
);

}
