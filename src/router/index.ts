import { ComponentType } from 'react'
import Categories from '../pages/Categories/Categories'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'
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
  {
    path: RouteNames.CATEGORIES,
    Component: Categories,
  },
  {
    path: RouteNames.PROFILE,
    Component: Profile,
  },
  // {
  //   path: RouteNames.EVENT,
  //   Component: Event,
  // },
]
