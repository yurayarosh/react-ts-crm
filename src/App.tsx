import { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import { useAppDispatch } from './hooks/store'
import { setAuth } from './store/actions'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isAuth = !!localStorage.getItem('isAuth')

    dispatch(setAuth(isAuth))
  })

  return <AppRouter />
}

export default App
