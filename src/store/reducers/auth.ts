import { SET_AUTH_FALSE, SET_AUTH_TRUE } from '../actions/types'

interface AuthAction {
  type: string
  payload?: object
}

interface IAuthState {
  isAuth: Boolean
}

export const authReducer = (state: IAuthState = { isAuth: false }, action: AuthAction) => {
  switch (action.type) {
    case SET_AUTH_TRUE:
      return {
        ...state,
        isAuth: true,
      }
    case SET_AUTH_FALSE:
      return {
        ...state,
        isAuth: false,
      }

    default:
      return state
  }
}
