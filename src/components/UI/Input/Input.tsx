import classNames from 'classnames'
import { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, useState } from 'react'
import { UID } from '../../../assets/scripts/helpers'
import { ErrorMessages } from '../../../assets/scripts/validation'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hasError: boolean
  errorMessage?: string | null
  onCustomChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onCustomFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onCustomBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

const Input: FC<IInput> = props => {
  const {
    className,
    children,
    label,
    hasError,
    errorMessage = ErrorMessages.EMPTY,
    onCustomChange,
    onCustomFocus,
    onCustomBlur,
    ...attrs
  } = props

  const [value, setValue] = useState<string>('')
  const [hasFocus, setFocus] = useState<boolean>(false)
  const uid = UID()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCustomChange?.(e)
    setValue(e.target.value)
  }

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    onCustomFocus?.(e)
    setFocus(true)
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    onCustomBlur?.(e)
    setFocus(false)
  }

  return (
    <div className="input-field">
      <input
        className={classNames('validate', className, { invalid: hasError })}
        id={uid}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...attrs}
      />
      <label htmlFor={uid} className={classNames({ active: !!value || hasFocus })}>
        {label}
      </label>
      {hasError && errorMessage ? (
        <small className="helper-text invalid">{errorMessage}</small>
      ) : (
        ''
      )}
    </div>
  )
}

export default Input
