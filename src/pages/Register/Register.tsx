import { ChangeEvent, FC, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import simpleInputValidate from '../../assets/scripts/validation'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import LayoutForm from '../../layouts/LayoutForm'
import { RouteNames } from '../../router'

const Login: FC = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const onEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const validation = simpleInputValidate({
      val: e.target.value,
      required: true,
      type: e.target.type,
    })

    console.log(validation)
  }

  return (
    <LayoutForm>
      <form className="card auth-card" onSubmit={onSubmit}>
        <div className="card-content">
          <span className="card-title">Домашняя бухгалтерия</span>
          <Input type="email" label="Email" hasError={false} onCustomChange={onEmailInputChange} />
          <Input type="text" label="Имя" hasError={false} />
          <Input type="password" label="Пароль" hasError={false} />

          <div>
            <label>
              <input type="checkbox" />
              <span>С правилами согласен</span>
            </label>
            <p className="helper-text invalid">
              <small>Поле обязательно</small>
            </p>
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
