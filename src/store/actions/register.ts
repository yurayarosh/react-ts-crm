import { Dispatch } from 'react'
import { ActionTypes } from './types'
import { ActionRegister, IRegisterFormData, IRegisterResponseData } from './types/register'

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
