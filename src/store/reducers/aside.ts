import { TOGGLE_ASIDE } from '../actions/types'

interface AsideAction {
  type: string
  payload?: object
}

interface IAsideState {
  isOpen: Boolean
}

// const initialState:IAsideState = {
//   isOpen: true,
// }

export const asideReducer = (state: IAsideState = { isOpen: true }, action: AsideAction) => {
  switch (action.type) {
    case TOGGLE_ASIDE:
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    default:
      return state
  }
}
