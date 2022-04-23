import classNames from 'classnames'
import { FC } from 'react'
import { filterCurrency, filterDate } from '../../assets/scripts/helpers'
import { ITableRecord } from '../../store/actions/types/records'

interface HistoryTableProps {
  records: ITableRecord[]
}

const HistoryTable: FC<HistoryTableProps> = ({ records }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {records.map((record, i) => (
          <tr key={record.id}>
            <td>{i + 1}</td>
            <td>{filterCurrency(+record.amount)}</td>
            <td>{filterDate(new Date(record.date))}</td>
            <td>{record.categoryName}</td>
            <td><span className={classNames('white-text badge', record.color)}>{record.typeText}</span></td>
            <td>
              <a className="btn-small btn">
                <i className="material-icons">open_in_new</i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HistoryTable
