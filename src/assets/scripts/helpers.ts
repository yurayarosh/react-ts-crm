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
