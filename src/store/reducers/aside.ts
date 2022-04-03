import { AsideAction, IAsideState, ActionTypes } from '../actions/types'

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
