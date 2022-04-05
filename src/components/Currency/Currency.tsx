import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { useActions } from '../../hooks/useActions'
// import { fetchCurrency } from '../../store/actions'
// import { ICurrencyData } from '../../store/actions/types'

const Currency: FC = () => {
  const [date, setDate] = useState<string>('')
  // const [curr, setCurrency] = useState<ICurrencyData | null>(null)

  // const dispatch = useAppDispatch()

  const { data: currency, isLoading } = useAppSelector(state => state.currencyReducer)

  const { fetchCurrency } = useActions()

  useEffect(() => {
    fetchCurrency()
  }, [])

  if (isLoading) return <h1>IS LOADING</h1>

  return (
    <div className="col s12 m6 l8">
      <div className="card orange darken-3 bill-card">
        <div className="card-content white-text">
          <div className="card-header">
            <span className="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Валюта</th>
                <th>Курс</th>
                <th>Дата</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>UAH</td>
                <td>{currency ?  (1 / +currency.rates.UAH).toFixed(4) : ''}</td>
                <td>{currency?.date}</td>
              </tr>

              <tr>
                <td>EUR</td>
                <td>{currency ?  (1 / +currency.rates.EUR).toFixed(4) : ''}</td>
                <td>{currency?.date}</td>
              </tr>

              <tr>
                <td>USD</td>
                <td>{currency ?  (1 / +currency.rates.USD).toFixed(4) : ''}</td>
                <td>{currency?.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Currency
