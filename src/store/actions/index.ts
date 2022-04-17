import { Dispatch } from 'redux'
import { ActionTypes } from './types'
import { CurrencyAction, ICurrencyData } from './types/currency'
import { ActionLogin, ILoginData, ILoginResponse } from './types/login'
import { ActionRegister, IRegisterFormData, IRegisterResponseData } from './types/register'
import {
  ActionFetchUser,
  ActionPostUser,
  ActionSetUser,
  ActionUpdateUser,
  IPostUserResponse,
  IUser,
  // IUserInfo,
} from './types/setUser'

export const setUser =
  ({ userInfoName, user }: { userInfoName?: string; user: IUser | null }) =>
  (dispatch: Dispatch<ActionSetUser>) => {
    if (user?.localId && userInfoName) {
      localStorage.setItem('userId', user.localId)
      localStorage.setItem('userInfoName', userInfoName)
      dispatch({ type: ActionTypes.SET_USER, user })
    } else {
      localStorage.removeItem('userId')
      localStorage.removeItem('userInfoName')

      dispatch({ type: ActionTypes.SET_USER, user: null })
    }
  }

export const postUser =
  (localId: string, userInfo: IUser) => async (dispatch: Dispatch<ActionPostUser>) => {
    try {
      const response = await fetch(
        `https://new-crm-9f95d-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/info.json`,
        {
          method: 'post',
          body: JSON.stringify(userInfo),
        }
      )

      const data: IPostUserResponse = await response.json()

      if (response.ok) {
        dispatch({ type: ActionTypes.POST_USER_SUCCESS, userInfoName: data.name })
      } else {
        dispatch({
          type: ActionTypes.POST_USER_ERROR,
          error: `Post user error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({ type: ActionTypes.POST_USER_ERROR, error: `Post user server errror: ${error}` })
    }
  }

export const updateUser =
  (localId: string, user: IUser) => async (dispatch: Dispatch<ActionUpdateUser>) => {
    try {
      const userInfoName = localStorage.getItem('userInfoName')

      const response = await fetch(
        `https://new-crm-9f95d-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/info/${userInfoName}.json`,
        {
          method: 'put',
          body: JSON.stringify(user),
        }
      )

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, user })
      } else {
        dispatch({
          type: ActionTypes.UPDATE_USER_ERROR,
          error: `Update user error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.UPDATE_USER_ERROR,
        error: `Update user server errror: ${error}`,
      })
    }
  }

export const fetchUser = (localId: string) => async (dispatch: Dispatch<ActionFetchUser>) => {
  try {
    dispatch({ type: ActionTypes.FETCH_USER_START })

    const response = await fetch(
      `https://new-crm-9f95d-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/info.json`
    )
    
    const data: { [key: string]: IUser } = await response.json()
    const [userInfoName] = Object.keys(data)
    const userInfo: IUser | null = userInfoName ? data[userInfoName] : null

    if (response.ok) {
      dispatch({
        type: ActionTypes.FETCH_USER_SUCCESS,
        userInfoName,
        user: userInfo,
      })
    } else {
      dispatch({ type: ActionTypes.FETCH_USER_ERROR, error: '' })
    }
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_USER_ERROR, error: `Fetch user server error ${error}` })
  }
}

export const register =
  (formData: IRegisterFormData) => async (dispatch: Dispatch<ActionRegister>) => {
    try {
      dispatch({ type: ActionTypes.REGISTER_START })

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: 'post',
          body: JSON.stringify(formData),
        }
      )

      if (res.ok) {
        const data: IRegisterResponseData = await res.json()

        dispatch({ type: ActionTypes.REGISTER_SUCCESS, data })
      } else {
        dispatch({
          type: ActionTypes.REGISTER_ERROR,
          error: `Registration error ${res.statusText}`,
        })
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        error: `register server error: ${error}`,
      })
    }
  }

export const login = (loginData: ILoginData) => async (dispatch: Dispatch<ActionLogin>) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: 'post',
        body: JSON.stringify(loginData),
      }
    )

    const data: ILoginResponse = await response.json()

    if (response.ok) {
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, localId: data.localId })
    } else {
      dispatch({
        type: ActionTypes.LOGIN_ERROR,
        error: data.error?.message,
      })
    }
  } catch (error) {
    dispatch({ type: ActionTypes.LOGIN_ERROR, error: `Login server error ${error}` })
  }
}

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
