import {
  ActionRegister,
  ActionTypes,
  AuthAction,
  IAuthState,
  IRegisterState,
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

export const registerReducer = (
  state: IRegisterState = {},
  action: ActionRegister
): IRegisterState => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}
