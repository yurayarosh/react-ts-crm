import { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import LayoutForm from '../../layouts/LayoutForm'
import { RouteNames } from '../../router'

const Login: FC = () => {
  return (
    <LayoutForm>
      <form className="card auth-card">
        <div className="card-content">
          <span className="card-title">Домашняя бухгалтерия</span>
          <Input type="text" label="Email" hasError={false} />
          {/* <v-input
        type="text"
        label="Email"
        :inputClasses="{ invalid: $v.email.$error }"
        :hasError="$v.email.$error"
        v-model.trim="email"
      /> */}
          {/* <v-input
        type="password"
        label="Пароль"
        :inputClasses="{ invalid: $v.password.$error }"
        :hasError="$v.password.$error"
        v-model.trim="password"
      /> */}
        </div>
        <div className="card-action">
          <div>
            <Button className="auth-submit" icon="send">
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
