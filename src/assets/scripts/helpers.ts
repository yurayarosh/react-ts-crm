import M from 'materialize-css'

export const filterDate = (value: Date, format: String = '') => {
  const options =
    format === 'date-time'
      ? ({
          hour12: false,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        } as const)
      : ({
          hour12: false,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        } as const)

  return new Intl.DateTimeFormat('uk-UA', options).format(value)
}

export const UID = () => `uid-${Math.random().toString(36).slice(2, 9)}`

export const showToast = (html: string) => M.toast({ html })
export const showToastError = (html: string) => M.toast({ html: `[ERROR]: ${html}` })
