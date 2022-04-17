import classNames from 'classnames'
import { FC, FormEvent } from 'react'
import Button from '../UI/Button/Button'

interface IFormProps {
  titleClass?: string | object
  formClass?: string | object
  title: string
  btnTitle: string
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

const Form: FC<IFormProps> = ({
  children,
  titleClass,
  formClass,
  title,
  btnTitle,
  onSubmit,
}) => {
  return (
    <>
      <div v-if="title" className={classNames(titleClass || 'page-subtitle')}>
        <h4>{title}</h4>
      </div>

      <form className={classNames(formClass)} onSubmit={onSubmit}>
        {children}
        <Button icon="send">{btnTitle}</Button>
      </form>
    </>
  )
}

export default Form
