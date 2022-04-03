import { Dispatch } from 'redux'
import { ActionTypes, AuthAction, CurrencyAction, ICurrencyData } from './types'

export const setAuth = (isAuth: boolean) => (dispatch: Dispatch<AuthAction>) => {
  if (isAuth) {
    localStorage.setItem('isAuth', 'true')
    dispatch({ type: ActionTypes.SET_AUTH_TRUE })
  } else {
    localStorage.removeItem('isAuth')
    dispatch({ type: ActionTypes.SET_AUTH_FALSE })
  }
}

export const fetchCurrency = () => async (dispatch: Dispatch<CurrencyAction>) => {
  try {
    dispatch({ type: ActionTypes.FETCH_CURRENCY_START })

    const res = await fetch('https://api.exchangerate-api.com/v4/latest/UAH')
    const data: ICurrencyData = await res.json()

    console.log({ data })

    dispatch({
      type: ActionTypes.FETCH_CURRENCY_SUCCESS,
      data,
    })
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_CURRENCY_ERROR,
      error,
    })
  }
}
