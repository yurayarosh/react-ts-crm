import classNames from 'classnames'
import { FC, useEffect, useMemo, useState } from 'react'
import { generateRandomColor, getSpentAmount } from '../../assets/scripts/helpers'
import HistoryChart, { IChartData } from '../../components/Chart/Chart'
import HistoryTable from '../../components/HistoryTable/HistoryTable'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCategories } from '../../store/actions/categories'
import { fetchRecords } from '../../store/actions/records'
import { ExpencesTypes, ITableRecord } from '../../store/actions/types/records'

import styles from './History.module.css'

const History: FC = () => {
  const dispatch = useAppDispatch()
  const { records } = useAppSelector(state => state.recordsReducer)
  const { categories } = useAppSelector(state => state.categoriesReducer)
  const { user } = useAppSelector(state => state.setUserReducer)

  useEffect(() => {
    if (user?.localId) {
      dispatch(fetchRecords(user.localId))
      dispatch(fetchCategories(user.localId))
    }
  }, [])

  const recordsList: ITableRecord[] | null = useMemo(() => {
    return records && categories
      ? Object.values(records).map(record => {
          const color: string = record.expenseType === ExpencesTypes.INCOME ? 'green' : 'red'
          const typeText: string = record.expenseType === ExpencesTypes.INCOME ? 'Доход' : 'Расход'
          const categoryName: string = categories[record.categoryId].name

          return {
            ...record,
            color,
            typeText,
            categoryName,
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
            {recordsChartData && <HistoryChart data={recordsChartData} />}
          </div>

          <HistoryTable records={recordsList} />

          {/* <v-pagination
          v-model="page"
          :pageCount="pageCount"
          :clickHandler="paginateHandler"
          :prevText="'Prev'"
          :nextText="'Next'"
          :containerClass="'pagination'"
        /> */}
        </section>
      )}
    </LayoutDafault>
  )
}

export default History
