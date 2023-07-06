import { createAction, props } from '@ngrx/store';
import { Users } from './users';
 
export const invokeUsersAPI = createAction(
  '[User API] Invoke Books Fetch API'
);
 
export const usersFetchAPISuccess = createAction(
  '[User API] Fetch API Success',
  props<{ allUsers: Users[] }>()
);