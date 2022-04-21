import { Dispatch } from 'react'
import { ActionTypes } from './types'
import {
  ActionCategories,
  ICategories,
  ICategory,
  ICreateCategoryResponse,
} from './types/categories'

export const createCategory =
  (localId: string, category: ICategory) => async (dispatch: Dispatch<ActionCategories>) => {
    try {
      // dispatch({ type: ActionTypes.CREATE_CATEGORY_START })
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/categories.json`,
        {
          method: 'post',
          body: JSON.stringify(category),
        }
      )

      const data: ICreateCategoryResponse = await response.json()

      if (response.ok) {
        dispatch({ type: ActionTypes.CREATE_CATEGORY_SUCCESS, category, categoryName: data.name })
      } else {
        dispatch({
          type: ActionTypes.CREATE_CATEGORY_ERROR,
          error: `Create category error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.CREATE_CATEGORY_ERROR,
        error: `Create category server error ${error}`,
      })
    }
  }

export const fetchCategories =
  (localId: string) => async (dispatch: Dispatch<ActionCategories>) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/categories.json`
      )

      const categories: ICategories = await response.json()

      if (response.ok) {
        dispatch({ type: ActionTypes.FETCH_CATEGORY_SUCCESS, categories })
      } else {
        dispatch({
          type: ActionTypes.CREATE_CATEGORY_ERROR,
          categories: null,
          error: `Create category error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_CATEGORY_ERROR,
        categories: null,
        error: `Fetch category server error ${error}`,
      })
    }
  }

export const updateCategory =
  (localId: string, category: { [key: string]: ICategory }) =>
  async (dispatch: Dispatch<ActionCategories>) => {
    try {
      const [categoryName] = Object.keys(category)
      const [cat] = Object.values(category)

      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/categories/${categoryName}.json`,
        {
          method: 'put',
          body: JSON.stringify(cat),
        }
      )

      if (response.ok) {
        dispatch({ type: ActionTypes.UPDATE_CATEGORY_SUCCESS, category: cat, categoryName })
      } else {
        dispatch({
          type: ActionTypes.UPDATE_CATEGORY_ERROR,
          categories: null,
          error: `Update category error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.UPDATE_CATEGORY_ERROR,
        categories: null,
        error: `Update category server error ${error}`,
      })
    }
  }
