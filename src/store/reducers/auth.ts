import {
  ActionLogin,
  ActionRegister,
  ActionSetUser,
  ActionTypes,
  AuthAction,
  IAuthState,
  ILoginState,
  IRegisterState,
  ISetUserState,
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
  state: IRegisterState = { isLoading: false },
  action: ActionRegister
): IRegisterState => {
  switch (action.type) {
    case ActionTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      }
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }

    default:
      return state
  }
}

export const setUserReducer = (
  state: ISetUserState = { user: null },
  action: ActionSetUser
): ISetUserState => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    // case ActionTypes.POST_USER_START:
    //   return {
    //     ...state,
    //   }
    case ActionTypes.POST_USER_SUCCESS:
      return {
        ...state,
      }
    case ActionTypes.POST_USER_ERROR:
      return {
        ...state,
        error: action.error,
      }
    // case ActionTypes.FETCH_USER_START:
    //   return {
    //     ...state,
    //   }
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
      }
    case ActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}

export const loginReducer = (
  state: ILoginState = { isLoading: false },
  action: ActionLogin
): ILoginState => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        localId: action.localId,
        isLoading: false,
      }
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }

    default:
      return state
  }
}
