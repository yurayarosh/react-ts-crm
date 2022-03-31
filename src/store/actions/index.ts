import { Dispatch } from 'redux'
import { SET_AUTH_FALSE, SET_AUTH_TRUE } from './types'

export const setAuth = (isAuth: boolean) => (dispatch: Dispatch) => {
  if (isAuth) {
    localStorage.setItem('isAuth', 'true')
    dispatch({ type: SET_AUTH_TRUE })
  } else {
    localStorage.removeItem('isAuth')
    dispatch({ type: SET_AUTH_FALSE })
  }
}
