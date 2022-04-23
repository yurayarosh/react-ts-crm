import { FC, useEffect } from 'react'
import Bill from '../../components/Bill/Bill'
import Currency from '../../components/Currency/Currency'
import Preloader from '../../components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCurrency } from '../../store/actions/currency'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.setUserReducer)
  const { data: currency } = useAppSelector(state => state.currencyReducer)

  const refreshData = () => {
    dispatch(fetchCurrency())
  }

  useEffect(() => {
    dispatch(fetchCurrency())
  }, [])

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Счет</h3>

        <button
          className="btn waves-effect waves-light btn-small"
          type="button"
          onClick={refreshData}
        >
          <i className="material-icons">refresh</i>
        </button>
      </div>

      <div className="row">
        {user?.bill ? <Bill bill={user.bill} /> : <Preloader />}

        {currency ? <Currency currency={currency} /> : <Preloader />}
      </div>
    </LayoutDafault>
  )
}

export default Home
