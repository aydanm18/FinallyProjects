// import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/slices/userSlice'


// export const store = configureStore({
//   reducer: {
//    

//   },
// })

// export default store;

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