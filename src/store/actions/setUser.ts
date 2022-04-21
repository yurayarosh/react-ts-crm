import { Dispatch } from 'react'
import { ActionTypes } from './types'
import {
  ActionFetchUser,
  ActionPostUser,
  ActionSetUser,
  ActionUpdateUser,
  IPostUserResponse,
  IUser,
} from './types/setUser'

export const setUser =
  ({ userInfoName, user }: { userInfoName?: string; user: IUser | null }) =>
  (dispatch: Dispatch<ActionSetUser>) => {
    if (user?.localId && userInfoName) {
      localStorage.setItem('userId', user.localId)
      dispatch({ type: ActionTypes.SET_USER, user })
    } else {
      localStorage.removeItem('userId')

      dispatch({ type: ActionTypes.SET_USER, user: null })
    }
  }

export const postUser =
  (localId: string, userInfo: IUser) => async (dispatch: Dispatch<ActionPostUser>) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/info.json`,
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
  (localId: string, userInfo: { [key: string]: IUser }) =>
  async (dispatch: Dispatch<ActionUpdateUser>) => {
    try {
      const [userInfoName] = Object.keys(userInfo)
      const [user] = Object.values(userInfo)

      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/info/${userInfoName}.json`,
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
      `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/info.json`
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
