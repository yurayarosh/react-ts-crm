export interface IUser {
  email?: string | null
  name?: string | null
  localId?: string | null
  bill?: string | number | null
}

export interface IPostUserResponse {
  name: string
}

export interface ISetUserState {
  user?: IUser | null
  userInfoName?: string
  error?: string
}

export interface ActionPostUser {
  type: string
  user?: IUser | null
  userInfoName?: string
  error?: string
}

export interface ActionSetUser {
  type: string
  user?: IUser | null
  userInfoName?: string
  error?: string
}

export interface ActionFetchUser {
  type: string
  localId?: string
  user?: IUser | null
  userInfoName?: string
  error?: string
}

export interface ActionUpdateUser {
  type: string
  user?: IUser
  error?: string
}
