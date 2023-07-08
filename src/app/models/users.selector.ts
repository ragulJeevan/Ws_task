import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Users } from './users';

export const selectUsers = createFeatureSelector<Users[]>('myUsers');

// TO UPDATE USER 
export const selectUserById = (userId: number) =>
  createSelector(selectUsers, (users: Users[]) => {
    var userbyId = users.filter((_) => _.id == userId);
    if (userbyId && userbyId.length == 0) {
      return null;
    }
    return userbyId[0];
  });