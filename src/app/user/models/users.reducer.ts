import { createReducer,on } from "@ngrx/store";
import { Users } from "./users";
import { usersFetchAPISuccess } from "./users.action";
 
export const initialState: ReadonlyArray<Users> = [];
 
export const userReducer = createReducer(
    initialState,
    on(usersFetchAPISuccess, (state, { allUsers }) => {
        return allUsers;
      })
);