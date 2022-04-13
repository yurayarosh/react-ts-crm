import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '../../router'
import { useAppSelector } from '../../hooks/store'

const AppRouter = () => {
  const { user } = useAppSelector(({ setUserReducer }) => setUserReducer)

  return user?.localId ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
    </Routes>
  )
}

export default AppRouter
