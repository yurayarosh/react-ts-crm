import { useEffect, useState } from 'react'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import { useAppDispatch, useAppSelector } from './hooks/store'
import { fetchUser, setUser } from './store/actions'

function App() {
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.setUserReducer)
  const { localId } = useAppSelector(state => state.loginReducer)

  const setCurrentUser = () => {
    const userInfoName = localStorage.getItem('userInfoName')

    console.log('setting user start', { userInfoName, user })

    if (userInfoName && user?.localId && user.name && user.email) {
      console.log('setting user success')

      dispatch(
        setUser({
          userInfoName,
          user,
        })
      )
    }
  }

  useEffect(() => {
    // const userInfoName = localStorage.getItem('userInfoName')

    // if (userInfoName && user?.localId && user.name && user.email) {
    //   dispatch(
    //     setUser({
    //       userInfoName,
    //       user,
    //     })
    //   )

    //   setLoaded(true)
    // }
    setCurrentUser()
    setLoaded(true)
  }, [user])

  useEffect(() => {
    if (localId) setCurrentUser()
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

  if (!isLoaded) return <div>loading...</div>

  return <AppRouter />
}

export default App
