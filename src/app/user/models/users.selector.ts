import { createFeatureSelector } from '@ngrx/store';
import { Users } from './users';
 
export const selectUsers = createFeatureSelector<Users[]>('myUsers');