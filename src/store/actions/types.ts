export enum ActionTypes {
  TOGGLE_ASIDE = 'TOGGLE_ASIDE',
  SET_AUTH_TRUE = 'SET_AUTH_TRUE',
  SET_AUTH_FALSE = 'SET_AUTH_FALSE',
  FETCH_CURRENCY_START = 'FETCH_CURRENCY_START',
  FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS',
  FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR',
}

export interface AsideAction {
  type: string
  isOpen?: boolean
}

export interface IAsideState {
  isOpen: boolean
}

export interface AuthAction {
  type: string
  isAuth?: boolean
}

export interface IAuthState {
  isAuth: boolean
}

export interface IRates {
  UAH: number
  EUR: number
  USD: number
}

export interface ICurrencyData {
  base: string
  date: string
  rates: IRates
}

export interface CurrencyAction {
  type: string
  isLoading?: boolean
  data?: ICurrencyData | null | undefined
  error?: any
}

export interface ICurrencyState {
  isLoading: boolean
  data: ICurrencyData | null | undefined
  error?: any
}
