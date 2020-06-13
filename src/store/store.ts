import { combineReducers } from "redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
/**
 * @function configureStore: for logic related to configuring the store 
 * including importing reducers, middleware, and enhancers
 */

const rootReducer = combineReducers({
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
