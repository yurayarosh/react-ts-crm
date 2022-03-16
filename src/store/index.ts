import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { asideReducer } from './reducers/aside'

const rootReducer = combineReducers({
  // appReducer,
  asideReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
