import { Dispatch } from 'react'
import { ActionTypes } from './types'
import { ActionRecords, ICreateRecordResponse, IRecord, IRecords } from './types/records'

export const createRecord =
  (localId: string, record: IRecord) => async (dispatch: Dispatch<ActionRecords>) => {
    try {
      // dispatch({ type: ActionTypes.CREATE_RECORD_START })
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/records.json`,
        {
          method: 'post',
          body: JSON.stringify(record),
        }
      )

      const data: ICreateRecordResponse = await response.json()

      if (response.ok) {
        dispatch({ type: ActionTypes.CREATE_RECORD_SUCCESS, record, recordName: data.name })
      } else {
        dispatch({
          type: ActionTypes.CREATE_RECORD_ERROR,
          error: `Create record error ${response.statusText}`,
        })
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.CREATE_RECORD_ERROR,
        error: `Create record server error ${error}`,
      })
    }
  }

export const fetchRecords = (localId: string) => async (dispatch: Dispatch<ActionRecords>) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/records.json`
    )

    const records: IRecords = await response.json()

    if (response.ok) {
      dispatch({ type: ActionTypes.FETCH_RECORD_SUCCESS, records })
    } else {
      dispatch({
        type: ActionTypes.FETCH_RECORD_ERROR,
        records: null,
        error: `Fetch record error ${response.statusText}`,
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_RECORD_ERROR,
      records: null,
      error: `Fetch record server error ${error}`,
    })
  }
}

// export const updateCategory =
//   (localId: string, category: { [key: string]: ICategory }) =>
//   async (dispatch: Dispatch<ActionCategories>) => {
//     try {
//       const [categoryName] = Object.keys(category)
//       const [cat] = Object.values(category)

//       const response = await fetch(
//         `${process.env.REACT_APP_FIREBASE_URI}/users/${localId}/categories/${categoryName}.json`,
//         {
//           method: 'put',
//           body: JSON.stringify(cat),
//         }
//       )

//       if (response.ok) {
//         dispatch({ type: ActionTypes.UPDATE_CATEGORY_SUCCESS, category: cat, categoryName })
//       } else {
//         dispatch({
//           type: ActionTypes.UPDATE_CATEGORY_ERROR,
//           categories: null,
//           error: `Update category error ${response.statusText}`,
//         })
//       }
//     } catch (error) {
//       dispatch({
//         type: ActionTypes.UPDATE_CATEGORY_ERROR,
//         categories: null,
//         error: `Update category server error ${error}`,
//       })
//     }
//   }
