import classNames from 'classnames'
import { FC, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { filterCurrency, filterDate } from '../../assets/scripts/helpers'
import Preloader from '../../components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { RouteNames } from '../../router'
import { fetchSingleRecord } from '../../store/actions/records'
import { ExpencesTypes, ITableRecord } from '../../store/actions/types/records'

const RecordPage: FC = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const { user } = useAppSelector(state => state.setUserReducer)
  const { record } = useAppSelector(state => state.recordsReducer)
  const { categories } = useAppSelector(state => state.categoriesReducer)

  useEffect(() => {
    if (user?.localId && id) {
      dispatch(fetchSingleRecord(user.localId, id))
    }
  }, [])

  const recordData: ITableRecord | null = useMemo(() => {
    if (!record || !categories) return null

    const color: string = record.expenseType === ExpencesTypes.INCOME ? 'green' : 'red'
    const typeText: string = record.expenseType === ExpencesTypes.INCOME ? 'Доход' : 'Расход'
    const categoryName: string = categories[record.categoryId].name

    return {
      ...record,
      color,
      typeText,
      categoryName,
    }
  }, [record, categories])

  return (
    <LayoutDafault>
      <div className="breadcrumb-wrap">
        <Link to={RouteNames.HISTORY} className="breadcrumb">
          История
        </Link>
        <span className="breadcrumb">Расход</span>
      </div>
      <div className="row">
        <div className="col s12 m6">
          {recordData ? (
            <div className="card">
              <div className={classNames('card-content white-text', recordData.color)}>
                <p>Описание: {recordData.description}</p>
                <p>Сумма: {filterCurrency(+recordData.amount)}</p>
                <p>Категория: {recordData.categoryName}</p>

                <small>{filterDate(new Date(recordData.date))}</small>
              </div>
            </div>
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </LayoutDafault>
  )
}

export default RecordPage
