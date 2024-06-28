
import userReducer from '../../components/services/redux/slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { procektApi } from './procektApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [procektApi.reducerPath]: procektApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(procektApi.middleware),
})


setupListeners(store.dispatch)