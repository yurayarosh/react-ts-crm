import { ComponentType, Key } from 'react'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'

export interface IRoute {
  path: string
  Component: ComponentType
}

export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/',
  RECORD = '/record',
  HISTORY = '/history',
  CATEGORIES = '/categories',
  PLANNING = '/planning',
  PROFILE = '/profile',
}

export const publicRoutes: IRoute[] = [
  // {
  //   path: RouteNames.HOME,
  //   Component: Home,
  // },
  {
    path: RouteNames.LOGIN,
    Component: Login,
  },
]

// export const privateRoutes: IRoute[] = [
//   {path: RouteNames.EVENT, exact: true, component: Event}
// ]
