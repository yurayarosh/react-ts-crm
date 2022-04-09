import {
  ActionTypes,
  AuthAction,
  IAuthState,
} from '../actions/types'

export const authReducer = (state: IAuthState = { isAuth: false }, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_TRUE:
      return {
        ...state,
        isAuth: true,
      }
    case ActionTypes.SET_AUTH_FALSE:
      return {
        ...state,
        isAuth: false,
      }

    default:
      return state
  }
}
