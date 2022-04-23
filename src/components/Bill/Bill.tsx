import { FC } from 'react'

interface BillProps {
  bill: string | number
}

const Bill: FC<BillProps> = ({ bill }) => {
  return (
    <div className="col s12 m6 l4">
      <div className="card light-blue bill-card">
        <div className="card-content white-text">
          <span className="card-title">Счет в валюте</span>

          <p className="currency-line">
            <span>8 320,00 грн.</span>
          </p>

          <p className="currency-line">
            <span>257,00 €</span>
          </p>

          <p className="currency-line">
            <span>285,00 $</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Bill
