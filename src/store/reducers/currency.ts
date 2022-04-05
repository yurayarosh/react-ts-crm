import { ActionTypes, CurrencyAction, ICurrencyState } from '../actions/types'

export const currencyReducer = (
  state: ICurrencyState = { isLoading: false, data: null },
  action: CurrencyAction
): ICurrencyState => {
  switch (action.type) {
    case ActionTypes.FETCH_CURRENCY_START:
      return {
        ...state,
        isLoading: true,
      }

    case ActionTypes.FETCH_CURRENCY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      }

    case ActionTypes.FETCH_CURRENCY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    default:
      return state
  }
}
