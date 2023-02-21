import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from '../API/Api';
import auth from '../features/authentication/login/loginSlice';
import foldersSlice from '../features/folders/foldersSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth,
        foldersSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
