import M from 'materialize-css'
import { ExpencesTypes, IRecord } from '../../store/actions/types/records'

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

export const filterCurrency = (value: number) => {
  return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(value)
}

export const UID = () => `uid-${Math.random().toString(36).slice(2, 9)}`

export const showToast = (html: string) => M.toast({ html })
export const showToastError = (html: string) => M.toast({ html: `[ERROR]: ${html}` })

export const generateRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`

export const getSpentAmount =
  (key: string) =>
  (acc: number, record: IRecord): number => {
    if (record.categoryId !== key) return acc

    const INDEX = record.expenseType === ExpencesTypes.INCOME ? 1 : -1
    const expense = +record.amount * INDEX

    return acc + expense
  }
