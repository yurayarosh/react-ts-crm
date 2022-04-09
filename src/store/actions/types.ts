export enum ActionTypes {
  TOGGLE_ASIDE = 'TOGGLE_ASIDE',
  SET_AUTH_TRUE = 'SET_AUTH_TRUE',
  SET_AUTH_FALSE = 'SET_AUTH_FALSE',

  FETCH_CURRENCY_START = 'FETCH_CURRENCY_START',
  FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS',
  FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR',

  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_ERROR = 'REGISTER_ERROR',
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
  [key: string]: number
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

// REGISTER
export interface IRegisterResponseData {
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  refreshToken: string
}

export interface IRegisterFormData {
  email: string
  password: string
  name?: string
}

export interface IRegisterState {
  data?: IRegisterResponseData | undefined
  error?: string
}

export interface ActionRegister {
  type: string
  data?: IRegisterResponseData | undefined
  error?: any
}
