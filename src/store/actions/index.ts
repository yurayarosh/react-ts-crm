import { Dispatch } from 'redux'
import {
  ActionRegister,
  ActionTypes,
  AuthAction,
  CurrencyAction,
  ICurrencyData,
  IRegisterFormData,
  IRegisterResponseData,
} from './types'

export const setAuth = (isAuth: boolean) => (dispatch: Dispatch<AuthAction>) => {
  // if (isAuth) {
  //   // localStorage.setItem('isAuth', 'true')
  //   dispatch({ type: ActionTypes.SET_AUTH_TRUE })
  // } else {
  //   // localStorage.removeItem('isAuth')
  //   dispatch({ type: ActionTypes.SET_AUTH_FALSE })
  // }
  // console.log('auth', process.env.REACT_APP_FIREBASE_API_KEY)
}

export const register =
  (formData: IRegisterFormData) => async (dispatch: Dispatch<ActionRegister>) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: 'post',
          body: JSON.stringify(formData),
        }
      )

      if (res.ok) {
        const data: IRegisterResponseData = await res.json()

        dispatch({ type: ActionTypes.REGISTER_SUCCESS, data })
      } else {
        dispatch({
          type: ActionTypes.REGISTER_ERROR,
          error: `Registration error ${res.statusText}`,
        })
      }
    } catch (error: any) {
      dispatch({ type: ActionTypes.REGISTER_ERROR, error: `register server error: ${error}` })
    }
  }

export const fetchCurrency = () => async (dispatch: Dispatch<CurrencyAction>) => {
  try {
    dispatch({ type: ActionTypes.FETCH_CURRENCY_START })

    const res = await fetch('https://api.exchangerate-api.com/v4/latest/UAH')

    if (res.ok) {
      const data: ICurrencyData = await res.json()

      dispatch({
        type: ActionTypes.FETCH_CURRENCY_SUCCESS,
        data,
      })
    } else {
      dispatch({
        type: ActionTypes.FETCH_CURRENCY_ERROR,
        error: 'Response error',
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_CURRENCY_ERROR,
      error,
    })
  }
}
