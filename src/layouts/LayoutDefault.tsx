import { FC } from 'react'
import classNames from 'classnames'
import { useAppSelector } from '../hooks/store'
import Navbar from '../components/Navbar/Navbar'
import Aside from '../components/Aside/Aside'
import { Link } from 'react-router-dom'
import { RouteNames } from '../router'

const LayoutDafault: FC = ({ children }) => {
  const asideIsOpen = useAppSelector(state => state.asideReducer.isOpen)

  return (
    <div className="app-main-layout">
      <Navbar />

      <Aside />

      <main className={classNames('app-content', { full: !asideIsOpen })}>
        <div className="app-page">{children}</div>
      </main>

      <div className="fixed-action-btn">
        <Link to={RouteNames.RECORD} className="btn-floating btn-large blue">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default LayoutDafault
