interface IConfig {
  minLength?: number
}

// interface IProperties {
//   val: string
//   required: boolean
//   type: string
//   config: IConfig
// }

const simpleInputValidate = ({
  val,
  required,
  type = 'text',
  config = {},
}: {
  val: string
  required: boolean
  type?: string
  config?: IConfig
}) => {
  let error: boolean = false
  let text: string | null = null

  // is empty
  if (required && !val.trim().length) {
    error = true
    // text = translate('empty_field', 'validate');
  }

  // email
  if (required && type == 'email') {
    const test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/
    if (!val.length || val == '' || !test_email.test(val)) {
      error = true
      if (!val.length || val == '') {
        // text = translate('empty_field', 'validate')
      } else {
        // text = translate('incorrect_email', 'validate')
      }
    }
  }

  // password
  if (required && type == 'password') {
    if (val.length < 8 && val.trim().length) {
      error = true
      // text = translate('password_min_characters', 'validate')
    }
  }

  // textarea
  if (required && type == 'textarea') {
    const { minLength = 10 } = config
    if (val.length < minLength && val.trim().length) {
      error = true
      // text = translate('min_characters', 'validate').replace('##', minLength)
    }
  }

  return { error, text }
}

export default simpleInputValidate
