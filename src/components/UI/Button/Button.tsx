import classNames from 'classnames'
import { ButtonHTMLAttributes, FC, LinkHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
}

interface ILink extends LinkHTMLAttributes<HTMLLinkElement> {
  icon: string
}

const Button: FC<IButton> = props => {
  const { className, icon, children, ...attrs } = props

  return (
    <button className={classNames('btn waves-effect waves-light', className)} {...attrs}>
      {children}
      <i className="material-icons right">{icon}</i>
    </button>
  )
}

export default Button
