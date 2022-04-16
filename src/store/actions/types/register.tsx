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
}

export interface IRegisterState {
  isLoading: boolean
  data?: IRegisterResponseData | undefined
  error?: string
}

export interface ActionRegister {
  type: string
  data?: IRegisterResponseData | undefined
  error?: any
}
