import { FC } from 'react'
import { filterCurrency } from '../../assets/scripts/helpers'
import { ICurrencyData } from '../../store/actions/types/currency'
import { CURRENCIES } from '../../utils'

interface BillProps {
  bill: string | number
  currency: ICurrencyData
}

const Bill: FC<BillProps> = ({ currency, bill }) => {
  const getBill = (curr: string) => +bill * +currency.rates[curr]

  return (
    <div className="col s12 m6 l4">
      <div className="card light-blue bill-card">
        <div className="card-content white-text">
          <span className="card-title">Счет в валюте</span>

          {CURRENCIES.map(curr => (
            <p key={curr} className="currency-line">
              <span>{filterCurrency(getBill(curr), curr)}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bill
