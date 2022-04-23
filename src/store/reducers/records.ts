import { ActionTypes } from '../actions/types'
import { ActionRecords, IRecordsState } from '../actions/types/records'

export const recordsReducer = (
  state: IRecordsState = { records: null },
  action: ActionRecords
): IRecordsState => {
  switch (action.type) {
    case ActionTypes.CREATE_RECORD_SUCCESS:
      return {
        ...state,
        records: {
          ...state.records,
          [action.recordName]: action.record,
        },
      }
    case ActionTypes.CREATE_RECORD_ERROR:
      return {
        ...state,
        error: action.error,
        records: null,
      }
    case ActionTypes.FETCH_RECORD_SUCCESS:
      return {
        ...state,
        records: action.records || null,
      }
    case ActionTypes.FETCH_RECORD_ERROR:
      return {
        ...state,
        error: action.error,
        records: null,
      }
    case ActionTypes.FETCH_SINGLE_RECORD_SUCCESS:
      return {
        ...state,
        records: state.records,
        record: action.record,
      }
    case ActionTypes.FETCH_SINGLE_RECORD_ERROR:
      return {
        ...state,
        error: action.error,
        records: null,
      }
    // case ActionTypes.UPDATE_CATEGORY_SUCCESS:
    //   return {
    //     ...state,
    //     categories: {
    //       ...state.categories,
    //       [action.categoryName]: action.category,
    //     },
    //   }
    // case ActionTypes.UPDATE_CATEGORY_ERROR:
    //   return {
    //     ...state,
    //     error: action.error,
    //     categories: null,
    //   }

    default:
      return state
  }
}
