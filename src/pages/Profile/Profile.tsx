import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { IInputError, simpleInputValidate } from '../../assets/scripts/validation'
import Input from '../../components/UI/Input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { updateUser } from '../../store/actions'
import { IUser } from '../../store/actions/types/setUser'

const Profile: FC = () => {
  const [isFormTouched, setFormTouched] = useState(false)
  const [nameError, setNameError] = useState<IInputError>({ error: true })
  const [name, setName] = useState<string>('')

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(({ setUserReducer }) => setUserReducer)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const validation = simpleInputValidate({
      val: e.target.value,
      required: true,
      type: e.target.type,
    })

    setName(e.target.value)
    setNameError({
      error: validation.error,
      text: validation.text,
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setFormTouched(true)

    const isValid = !nameError.error

    if (isValid) {
      console.log({ user })

      const newInfo: IUser = {
        ...user,
        name,
      }

      if (user?.localId) dispatch(updateUser(user.localId, newInfo))
    }
  }

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Профиль</h3>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <Input
          name="username"
          type="text"
          label="Имя"
          hasError={isFormTouched && nameError.error}
          errorMessage={nameError.text}
          onCustomChange={onInputChange}
        />

        <button className="btn waves-effect waves-light" type="submit">
          Обновить
          <i className="material-icons right">send</i>
        </button>
      </form>
    </LayoutDafault>
  )
}

export default Profile
