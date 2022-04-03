// import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ActionCreators from '../store/actions'
import { useAppDispatch } from './store'

export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}
