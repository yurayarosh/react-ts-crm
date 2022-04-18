//LOGIN
export interface ILoginData {
  email: string
  password: string
}

export interface ILoginState {
  isLoading: boolean
  localId?: string
  error?: string
}

export interface ActionLogin {
  type: string
  localId?: string
  error?: string
}

export interface ILoginResponseError {
  code: number
  errors: Array<{
    domain: string
    message: string
    reason: string
  }>
  message: string
}

export interface ILoginResponse {
  displayName: string
  email: string
  idToken: string
  kind: string
  localId: string
  registered: boolean
  error?: ILoginResponseError
}
