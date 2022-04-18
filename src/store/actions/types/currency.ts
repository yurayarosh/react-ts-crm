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
