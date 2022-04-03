import { ActionTypes, CurrencyAction, ICurrencyState } from '../actions/types'

export const currencyReducer = (
  state: ICurrencyState = { isLoading: false, data: null },
  action: CurrencyAction
) => {
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
        data: state.data,
      }

    case ActionTypes.FETCH_CURRENCY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: state.error,
      }

    default:
      return state
  }
}
