// import { Switch, Route, Redirect } from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes, RouteNames } from '../../router'
// import { useTypedSelector } from '../hooks/useTypedSelector'

const AppRouter = () => {
  // const { isAuth } = useTypedSelector(state => state.auth)

  // return isAuth ? (
  //   <Switch>
  //     {privateRoutes.map(route => (
  //       <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
  //     ))}
  //     <Redirect to={RouteNames.EVENT} />
  //   </Switch>
  // ) : (
  //   <Switch>
  //     {publicRoutes.map(route => (
  //       <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
  //     ))}
  //     <Redirect to={RouteNames.LOGIN} />
  //   </Switch>
  // )

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
    </Routes>
  )
}

export default AppRouter
