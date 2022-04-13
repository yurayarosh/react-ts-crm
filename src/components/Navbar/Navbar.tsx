import M from 'materialize-css'
import { createRef, FC, MouseEvent, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/store'
import { setUser } from '../../store/actions'
import { ActionTypes } from '../../store/actions/types'
import Clock from '../Clock/Clock'

const Navbar: FC = () => {
  const dispatch = useAppDispatch()

  const toggleAside = () => {
    dispatch({ type: ActionTypes.TOGGLE_ASIDE })
  }

  const dropdownTrigger = createRef<HTMLAnchorElement>()

  useEffect(() => {
    const dropdown = dropdownTrigger.current && M.Dropdown.init(dropdownTrigger.current)

    return () => {
      if (dropdown?.destroy) dropdown.destroy()
    }
  })

  const logout = (e: MouseEvent) => {
    e.preventDefault()

    dispatch(setUser(null))
  }

  return (
    <nav className="navbar orange lighten-1">
      <div className="nav-wrapper">
        <div className="navbar-left">
          <button type="button" onClick={toggleAside}>
            <i className="material-icons black-text">dehaze</i>
          </button>
          <span className="black-text">
            <Clock />
          </span>
        </div>

        <ul className="right hide-on-small-and-down">
          <li>
            <a
              className="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref={dropdownTrigger}
            >
              {/* {/* {{ $store.state.auth.userName || 'user name ' }} */}
              name
              <i className="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" className="dropdown-content">
              <li>
                {/* to="profile" */}
                <a className="black-text">
                  <i className="material-icons">account_circle</i>Профиль
                </a>
              </li>
              <li className="divider" tabIndex={-1} />
              <li>
                {/* @click.prevent="logout" */}
                <a href="#" className="black-text" onClick={logout}>
                  <i className="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
