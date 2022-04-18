import { ActionTypes } from '../actions/types'
import { ActionCategories, ICategoriesState } from '../actions/types/categories'

export const categoriesReducer = (
  state: ICategoriesState = { categories: null },
  action: ActionCategories
): ICategoriesState => {
  switch (action.type) {
    case ActionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryName]: action.category,
        },
      }
    case ActionTypes.CREATE_CATEGORY_ERROR:
      return {
        ...state,
        error: action.error,
        categories: null,
      }
    case ActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.categories || null,
      }
    case ActionTypes.FETCH_CATEGORY_ERROR:
      return {
        ...state,
        error: action.error,
        categories: null,
      }
    case ActionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryName]: action.category,
        },
      }
    case ActionTypes.UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        error: action.error,
        categories: null,
      }

    default:
      return state
  }
}
