import { Dispatch } from 'redux'
import { ActionTypes } from './types'
import { CurrencyAction, ICurrencyData } from './types/currency'
import { ActionLogin, ILoginData, ILoginResponse } from './types/login'
import { ActionRegister, IRegisterFormData, IRegisterResponseData } from './types/register'
import { ActionFetchUser, ActionPostUser, ActionSetUser, IUser, IUserInfo } from './types/setUser'

export const setUser = (user: IUser | null) => (dispatch: Dispatch<ActionSetUser>) => {
  if (user?.localId && user.name && user.email) {
    localStorage.setItem('userId', user.localId)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('userEmail', user.email)
  } else {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
  }

  dispatch({ type: ActionTypes.SET_USER, user })
}

export const postUser = (user: IUser) => async (dispatch: Dispatch<ActionPostUser>) => {
  try {
    const response = await fetch(
      `https://new-crm-9f95d-default-rtdb.europe-west1.firebasedatabase.app/users/${user.localId}/info.json`,
      {
        method: 'post',
        body: JSON.stringify(user),
      }
    )

    // const data = await response.json()

    if (response.ok) {
      dispatch({ type: ActionTypes.POST_USER_SUCCESS })
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

export const fetchUser = (localId: string) => async (dispatch: Dispatch<ActionFetchUser>) => {
  try {
    dispatch({ type: ActionTypes.FETCH_USER_START })

    const response = await fetch(
      `https://new-crm-9f95d-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/info.json`
    )
    const data = await response.json()
    const userInfo: IUserInfo = data[Object.keys(data)[0]]

    if (response.ok) {
      console.log('fetch user success', { data })

      dispatch({
        type: ActionTypes.FETCH_USER_SUCCESS,
        userInfo,
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
