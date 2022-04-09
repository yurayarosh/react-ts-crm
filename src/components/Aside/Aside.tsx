import classNames from 'classnames'
import { FC, Key } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'

interface IListItem {
  id: Key
  title: string
  to: string
  exact?: boolean
}

const Aside: FC = () => {
  const asideIsOpen = useAppSelector(state => state.asideReducer.isOpen)

  const list: IListItem[] = [
    { id: 1, title: 'Счет', to: RouteNames.HOME, exact: true },
    { id: 2, title: 'История', to: RouteNames.HISTORY },
    { id: 3, title: 'Планирование', to: RouteNames.PLANNING },
    { id: 4, title: 'Новая запись', to: RouteNames.RECORD },
    { id: 5, title: 'Категории', to: RouteNames.CATEGORIES },
  ]

  return (
    <ul className={classNames('sidenav app-sidenav', { open: asideIsOpen })}>
      {list.map(({ id, title, to }) => (
        <li key={id}>
          <Link to={to} className="waves-effect waves-orange pointer">
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Aside
