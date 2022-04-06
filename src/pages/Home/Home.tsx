import { FC } from 'react'
import Bill from '../../components/Bill/Bill'
import Currency from '../../components/Currency/Currency'
import { useAppDispatch } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCurrency } from '../../store/actions'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  const refreshData = () => {
    dispatch(fetchCurrency())
  }

  return (
    <LayoutDafault>
      {/* <div> */}
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

      {/*  <v-preloader v-if="isLoading" /> */}

      <div className="row">
        {/* <v-bill :rates="currency.rates" />

          <v-currency :rates="currency.rates" :date="currency.date" /> */}

        <Bill />

        <Currency />
      </div>
      {/* </div> */}
    </LayoutDafault>
  )
}

export default Home
