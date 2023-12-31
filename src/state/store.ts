import {  bindActionCreators,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as coreActions from './core/actions'
import * as usersActions from './users/actions'
import * as ordersActions from './orders/actions'
import * as productsActions from './products/actions'
import { coreSlice } from "./core/slice";
import { usersSlice } from "./users/slice";
import { ordersSlice } from "./orders/slice";
import { productsSlice } from "./products/slice";

export const combineActions = {
  ...coreActions,
  ...usersActions,
  ...ordersActions,
  ...productsActions
};

export const store = configureStore({
  reducer: combineReducers({
    core: coreSlice.reducer,
    users: usersSlice.reducer,
    orders: ordersSlice.reducer,
    products: productsSlice.reducer,
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
