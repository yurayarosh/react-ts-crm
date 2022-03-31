import { ComponentType, Key } from 'react'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

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
  EVENT = '/event',
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
  {
    path: RouteNames.REGISTER,
    Component: Register,
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    Component: Home,
  },
  // {
  //   path: RouteNames.EVENT,
  //   Component: Event,
  // },
]
