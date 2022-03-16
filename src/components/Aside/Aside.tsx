import classNames from 'classnames'
import { FC, Key } from 'react'
import { useAppSelector } from '../../hooks/store'

interface IListItem {
  id: Key
  title: String
  to: String
  exact?: Boolean
}

const Aside: FC = () => {
  const asideIsOpen = useAppSelector(state => state.asideReducer.isOpen)

  const list: IListItem[] = [
    { id: 1, title: 'Счет', to: '/', exact: true },
    { id: 2, title: 'История', to: '/history' },
    { id: 3, title: 'Планирование', to: '/planning' },
    { id: 4, title: 'Новая запись', to: '/record' },
    { id: 5, title: 'Категории', to: '/categories' },
  ]

  return (
    <ul className={classNames('sidenav app-sidenav', { open: asideIsOpen })}>
      {list.map(({ id, title }, i) => (
        <li key={id}>
          {/* :to="item.to" */}
          <a className="waves-effect waves-orange pointer">{title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Aside
