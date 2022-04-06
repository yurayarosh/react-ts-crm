import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchCurrency } from '../../store/actions'

const Currency: FC = () => {
  const currencies = ['UAH', 'EUR', 'USD']
  const dispatch = useAppDispatch()
  const { data: currency } = useAppSelector(state => state.currencyReducer)

  useEffect(() => {
    dispatch(fetchCurrency())
  }, [])

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
              {currencies.map(curr => (
                <tr key={curr}>
                  <td>{curr}</td>
                  <td>{currency ? (1 / +currency.rates[curr]).toFixed(4) : ''}</td>
                  <td>{currency?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Currency
