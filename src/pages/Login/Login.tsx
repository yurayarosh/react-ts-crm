import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showToastError } from '../../assets/scripts/helpers'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutForm from '../../layouts/LayoutForm'
import { RouteNames } from '../../router'
import { login } from '../../store/actions/login'

const Login: FC = () => {
  const [isFormTouched, setFormTouched] = useState(false)
  const [emailError, setEmailError] = useState<IInputError>({ error: true })
  const [passwordError, setPasswordError] = useState<IInputError>({ error: true })
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector(({ loginReducer }) => loginReducer)

  useEffect(() => {
    if (error) showToastError(error)
  }, [error])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setFormTouched(true)

    const isValid = !emailError.error && !passwordError.error
    e.preventDefault()

    if (isValid) {
      const formData = {
        email,
        password,
      }

      dispatch(login(formData))
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name

    const validation = simpleInputValidate({
      val: e.target.value,
      required: true,
      type: e.target.type,
    })

    switch (name) {
      case 'email':
        setEmail(e.target.value)
        setEmailError({
          error: validation.error,
          text: validation.text,
        })

        break
      case 'password':
        setPassword(e.target.value)
        setPasswordError({
          error: validation.error,
        })
        break
    }
  }

  return (
    <LayoutForm>
      <form className="card auth-card" onSubmit={onSubmit}>
        <div className="card-content">
          <span className="card-title">Домашняя бухгалтерия</span>
          <Input
            name="email"
            type="email"
            label="Email"
            hasError={isFormTouched && emailError.error}
            errorMessage={emailError.text}
            onCustomChange={onInputChange}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            hasError={isFormTouched && passwordError.error}
            errorMessage={passwordError.text}
            onCustomChange={onInputChange}
          />
        </div>

        <div className="card-action">
          <div>
            <Button className="auth-submit" icon="send" disabled={isLoading}>
              Войти
            </Button>
          </div>

          <p className="center">
            Нет аккаунта?
            <Link to={RouteNames.REGISTER}>Зарегистрироваться</Link>
          </p>
        </div>
      </form>
    </LayoutForm>
  )
}

export default Login
