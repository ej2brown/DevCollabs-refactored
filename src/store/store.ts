import { combineReducers } from "redux";
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer
}); //store imported into src/index.ts

//types below imported into src/features/counter 
export type RootState = ReturnType<typeof store.getState>; //typical state
export type AppThunk<ReturnType = void> = ThunkAction<  //async state
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
