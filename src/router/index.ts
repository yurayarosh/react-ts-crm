import { ComponentType } from 'react'
import Categories from '../pages/Categories/Categories'
import History from '../pages/History/History'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Planning from '../pages/Planning/Planning'
import Profile from '../pages/Profile/Profile'
import Record from '../pages/Record/Record'
import RecordPage from '../pages/RecordPage/RecordPage'
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
  RECORDS = '/records',
}

export const publicRoutes: IRoute[] = [
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
    path: RouteNames.HISTORY,
    Component: History,
  },
  {
    path: RouteNames.CATEGORIES,
    Component: Categories,
  },
  {
    path: RouteNames.PROFILE,
    Component: Profile,
  },
  {
    path: RouteNames.PLANNING,
    Component: Planning,
  },
  {
    path: RouteNames.RECORD,
    Component: Record,
  },
  {
    path: `${RouteNames.RECORDS}/:id`,
    Component: RecordPage,
  },
]
