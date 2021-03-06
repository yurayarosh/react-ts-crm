import { useEffect, useState } from 'react'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import Preloader from './components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from './hooks/store'
import { fetchCategories } from './store/actions/categories'
import { fetchRecords } from './store/actions/records'
import { fetchUser, setUser } from './store/actions/setUser'

function App() {
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { user, userInfoName } = useAppSelector(state => state.setUserReducer)
  const { localId } = useAppSelector(state => state.loginReducer)
  const { records } = useAppSelector(state => state.recordsReducer)
  const { categories } = useAppSelector(state => state.categoriesReducer)

  const setCurrentUser = () => {
    if (userInfoName && user?.localId && user.name && user.email) {
      dispatch(
        setUser({
          userInfoName,
          user,
        })
      )
    }
  }

  useEffect(() => {
    setCurrentUser()
    if (user?.localId) {
      if (!categories) dispatch(fetchCategories(user.localId))
      if (!records) dispatch(fetchRecords(user.localId))

      setLoaded(true)
    }
  }, [user])

  useEffect(() => {
    if (localId) {
      dispatch(fetchUser(localId))
      setCurrentUser()
    }
  }, [localId])

  useEffect(() => {
    const id = localStorage.getItem('userId')

    if (id) {
      dispatch(fetchUser(id))
    } else {
      dispatch(setUser({ user: null }))
      setLoaded(true)
    }
  }, [])

  if (!isLoaded) return <Preloader />

  return <AppRouter />
}

export default App
