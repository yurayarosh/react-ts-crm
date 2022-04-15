export interface IUser {
  email: string | null
  name: string | null
  localId: string | null
}

export interface IUserInfo {
  email: string
  localId: string
  name: string
}

export interface ISetUserState {
  userInfo?: IUserInfo
  user?: IUser | null
  error?: string
}

export interface ActionPostUser {
  type: string
  user?: IUser | null
  error?: string
}

export interface ActionSetUser {
  type: string
  user?: IUser | null
  userInfo?: IUserInfo
  error?: string
}

export interface ActionFetchUser {
  type: string
  localId?: string
  error?: string
}
