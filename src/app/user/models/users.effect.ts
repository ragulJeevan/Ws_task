import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { usersFetchAPISuccess, invokeUsersAPI,saveNewUserAPISucess,invokeSaveNewUserAPI, updateUserAPISucess,invokeUpdateUserAPI,deleteUserAPISuccess,invokeDeleteUserAPI } from './users.action';
import { selectUsers } from './users.selector';
import { Appstate } from "./appstate";
import { setAPIStatus } from "./app.action";
 
@Injectable()
export class UsersEffect {

 constructor(
    private actions$: Actions,
    private usersService: UserService,
    private store: Store,
    private appStore: Store<Appstate>,
 ){

 }   

//  TO GET ALL USERS 
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

// TO ADD A USER 
saveNewUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeSaveNewUserAPI),
    switchMap((action) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.usersService.create(action.newUser).pipe(
        map((data) => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return saveNewUserAPISucess({ newUser: data });
        })
      );
    })
  );
});

// TO UPDATE USER

updateUserAPI$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeUpdateUserAPI),
    switchMap((action) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.usersService.update(action.updateUser).pipe(
        map((data) => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return updateUserAPISucess({ updateUser: data });
        })
      );
    })
  );
});


// TO DELETE USER 

deleteUsersAPI$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeDeleteUserAPI),
    switchMap((actions) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.usersService.delete(actions.id).pipe(
        map(() => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return deleteUserAPISuccess({ id: actions.id });
        })
      );
    })
  );
});


}
