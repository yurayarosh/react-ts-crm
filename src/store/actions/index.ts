import { Dispatch } from 'redux'
import {
  ActionRegister,
  ActionTypes,
  ActionLogin,
  ActionUser,
  CurrencyAction,
  ICurrencyData,
  IRegisterFormData,
  IRegisterResponseData,
  IUser,
} from './types'

export const setUser = (user: IUser | null) => (dispatch: Dispatch<ActionUser>) => {
  if (user?.localId && user.name && user.email) {
    localStorage.setItem('userId', user.localId)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('userEmail', user.email)
  } else {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
  }

  dispatch({ type: ActionTypes.SET_USER, user })
}

export const register =
  (formData: IRegisterFormData) => async (dispatch: Dispatch<ActionRegister>) => {
    try {
      dispatch({ type: ActionTypes.REGISTER_START })

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
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        error: `register server error: ${error}`,
      })
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
