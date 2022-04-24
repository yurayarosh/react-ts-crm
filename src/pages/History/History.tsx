import classNames from 'classnames'
import { FC, useMemo } from 'react'
import { generateRandomColor, getSpentAmount } from '../../assets/scripts/helpers'
import HistoryChart, { IChartData } from '../../components/Chart/Chart'
import HistoryTable from '../../components/HistoryTable/HistoryTable'
import Preloader from '../../components/Preloader/Preloader'
import { useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { ExpencesTypes, ITableRecord } from '../../store/actions/types/records'

import styles from './History.module.css'

const History: FC = () => {
  const { records } = useAppSelector(state => state.recordsReducer)
  const { categories } = useAppSelector(state => state.categoriesReducer)

  const recordsList: ITableRecord[] | null = useMemo(() => {
    return records && categories
      ? Object.values(records).map((record, i) => {
          const color: string = record.expenseType === ExpencesTypes.INCOME ? 'green' : 'red'
          const typeText: string = record.expenseType === ExpencesTypes.INCOME ? 'Доход' : 'Расход'
          const categoryName: string = categories[record.categoryId].name

          return {
            ...record,
            color,
            typeText,
            categoryName,
            recordNameId: Object.keys(records)[i],
          }
        })
      : null
  }, [records, categories])

  const recordsChartData: IChartData | null = useMemo(() => {
    if (!records || !categories) return null

    const categoriesList = Object.values(categories)

    return {
      labels: categoriesList.map(category => category.name),
      datasets: [
        {
          label: 'Расход',
          data: categoriesList.map((category, i) => {
            const key = Object.keys(categories)[i]
            const spent: number = Object.values(records).reduce(getSpentAmount(key), 0)

            return spent < 0 ? spent * -1 : 0
          }),
          backgroundColor: categoriesList.map(() => generateRandomColor()),
          borderWidth: 1,
        },
      ],
    }
  }, [records, categories])

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>История записей</h3>
      </div>

      {!recordsList ? (
        <p>Записей пока нет</p>
      ) : (
        <section>
          <div className={classNames('history-chart', styles['chart-wrap'])}>
            {recordsChartData ? <HistoryChart data={recordsChartData} /> : <Preloader />}
          </div>

          <HistoryTable records={recordsList} itemsPerPage={5} />
        </section>
      )}
    </LayoutDafault>
  )
}

export default History
