import classNames from 'classnames'
import { FC, useEffect, useMemo } from 'react'
import { filterCurrency } from '../../assets/scripts/helpers'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCategories } from '../../store/actions/categories'
import { fetchRecords } from '../../store/actions/records'
import { ICategory } from '../../store/actions/types/categories'
import { ExpencesTypes } from '../../store/actions/types/records'

const Planning: FC = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.categoriesReducer)
  const { records } = useAppSelector(state => state.recordsReducer)
  const { user } = useAppSelector(state => state.setUserReducer)

  const getExpensePercentage = (category: ICategory) =>
    category.spent ? (+category.spent / +category.limit) * 100 : 0

  const getColor = (percent: number) => {
    let color
    if (percent < 60) color = 'green'
    else if (percent >= 100) color = 'red'
    else color = 'yellow'

    return color
  }

  useEffect(() => {
    if (user?.localId) {
      dispatch(fetchCategories(user.localId))
      dispatch(fetchRecords(user.localId))
    }
  }, [])

  const categoriesList: ICategory[] | null = useMemo(() => {
    if (!categories || !records) return null

    return Object.values(categories).map((category, i) => {
      const key = Object.keys(categories)[i]

      const spent: number = Object.values(records).reduce((acc, record) => {
        if (record.categoryId !== key) return acc

        const INDEX = record.expenseType === ExpencesTypes.INCOME ? 1 : -1
        const expense = +record.amount * INDEX

        return acc + expense
      }, 0)

      return {
        ...category,
        spent: spent < 0 ? spent * -1 : 0,
      }
    })
  }, [categories, records])

  if (!categoriesList?.length) return <div>loading...</div>

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Планирование</h3>
        <h4>{user?.bill && filterCurrency(+user.bill)}</h4>
      </div>

      {!categories ? (
        <p>Пока нет ни одной категории</p>
      ) : !records ? (
        <p>Пока нет ни одной записи</p>
      ) : (
        <section>
          {categoriesList.map(category => (
            <div key={category.id}>
              <p>
                <strong>{category.name}:</strong>&nbsp;
                {filterCurrency(category.spent || 0)} из {filterCurrency(+category.limit)}
              </p>
              <div className="progress">
                <div
                  className={classNames('determinate', getColor(getExpensePercentage(category)))}
                  style={{ width: `${getExpensePercentage(category)}%` }}
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </LayoutDafault>
  )
}

export default Planning
