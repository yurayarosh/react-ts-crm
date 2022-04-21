import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from 'react'

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
  // hasError: boolean
  // errorMessage?: string | null
  value?: string
  onCustomChange?: (e: ChangeEvent<HTMLInputElement>) => void
  // onCustomFocus?: (e: FocusEvent<HTMLInputElement>) => void
  // onCustomBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

const Radio: FC<IRadio> = ({
  children,
  checked,
  value: inputValue = '',
  onCustomChange,
  ...attrs
}) => {
  const [value, setValue] = useState<string>(inputValue)

  // useEffect(() => {
  //   setValue(inputValue)
  // }, [inputValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCustomChange?.(e)
    // setValue(e.target.value)
  }

  return (
    <label>
      <input
        className="with-gap"
        type="radio"
        checked={checked}
        value={value}
        onChange={onChange}
        {...attrs}
      />
      <span>{children}</span>
    </label>
  )
}

export default Radio
