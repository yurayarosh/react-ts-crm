import { Dispatch } from 'react'
import { ActionTypes } from './types'
import { ActionLogin, ILoginData, ILoginResponse } from './types/login'

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
