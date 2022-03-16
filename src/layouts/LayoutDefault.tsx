import { FC } from 'react'
import classNames from 'classnames'
import { useAppSelector } from '../hooks/store'
import Navbar from '../components/Navbar/Navbar'
import Aside from '../components/Aside/Aside'

const LayoutDafault: FC = ({ children }) => {
  const asideIsOpen = useAppSelector(state => state.asideReducer.isOpen)

  return (
    <div className="app-main-layout">
      <Navbar />

      <Aside />

      <main className={classNames('app-content', { full: !asideIsOpen })}>
        <div className="app-page">{/* <router-view></router-view> */}</div>
      </main>

      <div className="fixed-action-btn">
        {/* to="record" */}
        <a className="btn-floating btn-large blue">
          <i className="large material-icons">add</i>
        </a>
      </div>
    </div>
  )
}

export default LayoutDafault
