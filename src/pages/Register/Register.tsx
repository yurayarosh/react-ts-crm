import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showToastError } from '../../assets/scripts/helpers'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutForm from '../../layouts/LayoutForm'
import { RouteNames } from '../../router'
import { register } from '../../store/actions'

const Login: FC = () => {
  const [isFormTouched, setFormTouched] = useState(false)
  const [emailError, setEmailError] = useState<IInputError>({ error: true })
  const [nameError, setNameError] = useState<IInputError>({ error: true })
  const [passwordError, setPasswordError] = useState<IInputError>({ error: true })
  const [hasTermsError, setTermsError] = useState(true)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()
  const { data, error } = useAppSelector(({ registerReducer }) => registerReducer)

  useEffect(() => {
    if (error) showToastError(error)
    if (data?.email) {
      // TODO: Add login logic
    }
  }, [data, error])

  const onSubmit = async (e: FormEvent) => {
    setFormTouched(true)

    const isValid = !emailError.error && !nameError.error && !passwordError.error && !hasTermsError
    e.preventDefault()

    const formData = {
      email,
      name,
      password,
    }

    if (isValid) dispatch(register(formData))
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
      case 'username':
        setName(e.target.value)
        setNameError({
          error: validation.error,
          text: validation.text,
        })
        break
      case 'password':
        setPassword(e.target.value)
        setPasswordError({
          error: validation.error,
          text: validation.text,
        })
        break
    }
  }

  const onTermsInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermsError(!e.target.checked)
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
            name="username"
            type="text"
            label="Имя"
            hasError={isFormTouched && nameError.error}
            errorMessage={nameError.text}
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

          <div>
            <label>
              <input type="checkbox" onChange={onTermsInputChange} />
              <span>С правилами согласен</span>
            </label>
            {isFormTouched && hasTermsError ? (
              <p className="helper-text invalid">
                <small>Поле обязательно</small>
              </p>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="card-action">
          <div>
            <Button className="auth-submit" icon="send">
              Зарегистрироваться
            </Button>
          </div>

          <p className="center">
            Уже есть аккаунт?
            <Link to={RouteNames.LOGIN}>Войти!</Link>
          </p>
        </div>
      </form>
    </LayoutForm>
  )
}

export default Login
