import { createAction, props } from '@ngrx/store';
import { Users } from './users';
 
export const invokeUsersAPI = createAction(
  '[User API] Invoke Users Fetch API'
);
 
export const usersFetchAPISuccess = createAction(
  '[User API] Fetch API Success',
  props<{ allUsers: Users[] }>()
);

export const invokeSaveNewUserAPI = createAction(
  '[Users API] Inovke save new User api',
  props<{ newUser: Users }>()
);
 
export const saveNewUserAPISucess = createAction(
  '[Users API] save new User api success',
  props<{ newUser: Users }>()
);