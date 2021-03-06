import classNames from 'classnames'
import { ChangeEvent, FC, FocusEvent, SelectHTMLAttributes, useEffect, useState } from 'react'
import { UID } from '../../../assets/scripts/helpers'
import { ErrorMessages } from '../../../assets/scripts/validation'
import { ICategory } from '../../../store/actions/types/categories'

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hasError?: boolean
  options: ICategory[] | null
  errorMessage?: string | null
  value?: string
  onCustomChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  onCustomFocus?: (e: FocusEvent<HTMLSelectElement>) => void
  onCustomBlur?: (e: FocusEvent<HTMLSelectElement>) => void
}

const Select: FC<ISelectProps> = props => {
  const {
    className,
    value: inputValue = '',
    children,
    label,
    hasError,
    value: fieldValue,
    errorMessage = ErrorMessages.EMPTY,
    options,
    onCustomChange,
    onCustomFocus,
    onCustomBlur,
    ...attrs
  } = props

  const [value, setValue] = useState<string>(inputValue)
  const [hasFocus, setFocus] = useState<boolean>(false)
  const uid = UID()

  useEffect(() => {
    if (typeof inputValue === 'string' || typeof inputValue === 'number') setValue(inputValue)
  }, [])

  useEffect(() => {
    setValue(inputValue)
  }, [inputValue])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCustomChange?.(e)
    setValue(e.target.value)
  }

  const onFocus = (e: FocusEvent<HTMLSelectElement>) => {
    onCustomFocus?.(e)
    setFocus(true)
  }

  const onBlur = (e: FocusEvent<HTMLSelectElement>) => {
    onCustomBlur?.(e)
    setFocus(false)
  }
  return (
    <div>
      <label htmlFor="_uid">{label}</label>
      <select
        className={classNames('browser-default', className, { invalid: hasError })}
        id={uid}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...attrs}
      >
        {options &&
          options.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>

      {hasError && errorMessage ? (
        <small className="helper-text invalid">{errorMessage}</small>
      ) : (
        ''
      )}
    </div>
  )
}

export default Select
