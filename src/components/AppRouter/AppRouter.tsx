import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '../../router'
import { useAppSelector } from '../../hooks/store'

const AppRouter = () => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth)

  return isAuth ? (
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
