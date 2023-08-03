import {  bindActionCreators,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as coreActions from './core/actions'
import * as usersActions from './users/actions'
import * as ordersActions from './orders/actions'
import * as costsActions from './costs/actions'
import { coreSlice } from "./core/slice";
import { usersSlice } from "./users/slice";
import { ordersSlice } from "./orders/slice";
import { costsSlice } from "./costs/slice";

export const combineActions = {
  ...coreActions,
  ...usersActions,
  ...ordersActions,
  ...costsActions
};

export const store = configureStore({
  reducer: combineReducers({
    core: coreSlice.reducer,
    users: usersSlice.reducer,
    orders: ordersSlice.reducer,
    costs: costsSlice.reducer,
  }),
});

export const useAppSelector: TypedUseSelectorHook<RTK.RootState> = useSelector;

export function useAppDispatch() {
  return useDispatch<RTK.AppDispatch>();
}

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(combineActions, dispatch),
    [dispatch]
  );
};
