import { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import { useAppDispatch, useAppSelector } from './hooks/store'
import { fetchUser, setUser } from './store/actions'

function App() {
  const dispatch = useAppDispatch()
  const { localId } = useAppSelector(({ loginReducer }) => loginReducer)
  const { userInfo } = useAppSelector(state => state.setUserReducer)

  useEffect(() => {
    if (localId) {
      dispatch(fetchUser(localId))
    }
  }, [localId])

  useEffect(() => {
    if (userInfo) {
      dispatch(
        setUser({
          localId: userInfo.localId,
          name: userInfo.name,
          email: userInfo.email,
        })
      )
    }
  }, [userInfo])

  useEffect(() => {
    const user = localStorage.getItem('userId')
      ? {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('userEmail'),
          localId: localStorage.getItem('userId'),
        }
      : null

    dispatch(setUser(user))
  }, [])

  return <AppRouter />
}

export default App
