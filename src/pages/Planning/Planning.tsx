import classNames from 'classnames'
import { FC, useMemo } from 'react'
import { filterCurrency, getSpentAmount } from '../../assets/scripts/helpers'
import Preloader from '../../components/Preloader/Preloader'
import { useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { ICategory } from '../../store/actions/types/categories'

const Planning: FC = () => {
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

  const categoriesList: ICategory[] | null = useMemo(() => {
    if (!categories || !records) return null

    return Object.values(categories).map((category, i) => {
      const key = Object.keys(categories)[i]
      const spent: number = Object.values(records).reduce(getSpentAmount(key), 0)

      return {
        ...category,
        spent: spent < 0 ? spent * -1 : 0,
      }
    })
  }, [categories, records])

  if (!categoriesList?.length) return <Preloader />

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
