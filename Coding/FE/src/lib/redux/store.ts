import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import AuthenticationSlice from './slice/authSlice';
import RoleSlice from './slice/roleSlice';
import listAllServiceSlice from './slice/listAllServiceSlice';
import userSlice from './slice/userSlice';
import shopSlice from './slice/shopSlice';


export const store = configureStore({
  reducer: {
    auth: AuthenticationSlice,
    role: RoleSlice,
    service: listAllServiceSlice,
    user: userSlice,
    shop: shopSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;