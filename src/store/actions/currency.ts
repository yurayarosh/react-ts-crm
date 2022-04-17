import { Dispatch } from 'react'
import { ActionTypes } from './types'
import { CurrencyAction, ICurrencyData } from './types/currency'

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
