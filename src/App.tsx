import { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import { useAppDispatch } from './hooks/store'
import { setUser } from './store/actions'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      localId: localStorage.getItem('userId'),
    }

    dispatch(setUser(user))
  })

  return <AppRouter />
}

export default App
