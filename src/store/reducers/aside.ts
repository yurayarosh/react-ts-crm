import { ActionTypes } from '../actions/types'
import { AsideAction, IAsideState } from '../actions/types/aside'

export const asideReducer = (state: IAsideState = { isOpen: true }, action: AsideAction) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_ASIDE:
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    default:
      return state
  }
}
