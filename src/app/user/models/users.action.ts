import { createAction, props } from '@ngrx/store';
import { Users } from './users';
 
// TO GET USER DATA 
export const invokeUsersAPI = createAction(
  '[User API] Invoke Users Fetch API'
);
 
export const usersFetchAPISuccess = createAction(
  '[User API] Fetch API Success',
  props<{ allUsers: Users[] }>()
);

// TO ADD USER DATA 

export const invokeSaveNewUserAPI = createAction(
  '[Users API] Inovke save new User api',
  props<{ newUser: Users }>()
);
 
export const saveNewUserAPISucess = createAction(
  '[Users API] save new User api success',
  props<{ newUser: Users }>()
);


// TO UPDATE USER DATA 

export const invokeUpdateUserAPI = createAction(
  '[Users API] Inovke update user api',
  props<{ updateUser: Users }>()
);
 
export const updateUserAPISucess = createAction(
  '[Users API] update  User api success',
  props<{ updateUser: Users }>()
);

// TO DELETE USER 
export const invokeDeleteUserAPI = createAction(
  '[Users API] Inovke delete User api',
  props<{id:number}>()
);
 
export const deleteUserAPISuccess = createAction(
  '[Users API] deleted User api success',
  props<{id:number}>()
);