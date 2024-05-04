import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig } from 'redux-persist/es/types';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import splashReducer from '../reducers/splashReducer';
import themeReducer from '../reducers/themeReducer';

const persistConfig: PersistConfig<unknown> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['splashReducer'],
};

export const rootReducer = combineReducers({
  splashReducer,
  themeReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();
const { dispatch } = store;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { dispatch, useAppSelector, useAppDispatch };
