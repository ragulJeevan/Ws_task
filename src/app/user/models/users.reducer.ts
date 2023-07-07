import { createReducer, on } from "@ngrx/store";
import { Users } from "./users";
import { usersFetchAPISuccess, saveNewUserAPISucess,updateUserAPISucess,deleteUserAPISuccess } from "./users.action";

export const initialState: ReadonlyArray<Users> = [];

export const userReducer = createReducer(
  initialState,
  // TO GET USERS 
  on(usersFetchAPISuccess, (state, { allUsers }) => {
    return allUsers;
  }),
  // TO ADD USERS 
  on(saveNewUserAPISucess, (state, { newUser }) => {
    let newState = [...state];
    newState.push(newUser);
    return newState;
  }),
  // TO UPDATE USER 
  on(updateUserAPISucess, (state, { updateUser }) => {
    let newState = state.filter((_) => _.id != updateUser.id);
    newState.push(updateUser);
    return newState;
  }),
  // TO DELETE USER 
  on(deleteUserAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _.id != id);
    return newState;
  })
);
