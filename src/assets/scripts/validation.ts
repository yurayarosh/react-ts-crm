interface IConfig {
  minLength?: number
}

// interface IProperties {
//   val: string
//   required: boolean
//   type: string
//   config: IConfig
// }

export interface IInputError {
  error: boolean
  text?: string | null
}

export enum ErrorMessages {
  EMPTY = 'Поле должно быть заполнено',
  EMAIL = 'Некорректный E-mail',
  PASSWORD = 'Пароль должен иметь минимальную длинну 8 символов',
}

export const simpleInputValidate = ({
  val,
  required,
  type = 'text',
  config = {},
}: {
  val: string
  required: boolean
  type?: string
  config?: IConfig
}): IInputError => {
  let error: boolean = false
  let text: string | null = null

  // is empty
  if (required && !val.trim().length) {
    error = true
    text = ErrorMessages.EMPTY
  }

  // email
  if (required && type === 'email') {
    const test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/
    if (!val.length || val === '' || !test_email.test(val)) {
      error = true
      if (!val.length || val === '') {
        text = ErrorMessages.EMPTY
      } else {
        text = ErrorMessages.EMAIL
      }
    }
  }

  // password
  if (required && type === 'password') {
    if (val.length < 8 && val.trim().length) {
      error = true
      text = ErrorMessages.PASSWORD
    }
  }

  // textarea
  if (required && config.minLength) {
    const { minLength = 10 } = config
    if (val.length < minLength && val.trim().length) {
      error = true
      // text = translate('min_characters', 'validate').replace('##', minLength)
    }
  }

  return { error, text }
}
