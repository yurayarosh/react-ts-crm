import { FC } from 'react'
import { ICurrencyData } from '../../store/actions/types/currency'
import { CURRENCIES } from '../../utils'

interface CurrencyProps {
  currency: ICurrencyData
}

const Currency: FC<CurrencyProps> = ({ currency }) => {
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
              {CURRENCIES.map(curr => (
                <tr key={curr}>
                  <td>{curr}</td>
                  <td>{currency ? (1 / +currency.rates[curr]).toFixed(4) : ''}</td>
                  <td>{currency.date}</td>
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
