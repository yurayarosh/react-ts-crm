import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { asideReducer } from './reducers/aside'
import { authReducer, registerReducer } from './reducers/auth'
import { currencyReducer } from './reducers/currency'

const rootReducer = combineReducers({
  asideReducer,
  authReducer,
  registerReducer,
  currencyReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware))

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>
