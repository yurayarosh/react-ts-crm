import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { filterCurrency, filterDate } from '../../assets/scripts/helpers'
import { RouteNames } from '../../router'
import { ITableRecord } from '../../store/actions/types/records'

import ReactPaginate from 'react-paginate'

interface HistoryTableProps {
  records: ITableRecord[]
  itemsPerPage: number
}

const HistoryTable: FC<HistoryTableProps> = ({ records, itemsPerPage }) => {
  const [currentRecords, setCurrentRecords] = useState<Array<ITableRecord> | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [itemOffset, setItemOffset] = useState<number>(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentRecords(records.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(records.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % records.length
    setItemOffset(newOffset)
  }

  return (
    <>
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
          {currentRecords &&
            currentRecords.map((record, i) => (
              <tr key={record.id}>
                <td>{i + 1}</td>
                <td>{filterCurrency(+record.amount)}</td>
                <td>{filterDate(new Date(record.date))}</td>
                <td>{record.categoryName}</td>
                <td>
                  <span className={classNames('white-text badge', record.color)}>
                    {record.typeText}
                  </span>
                </td>
                <td>
                  <Link
                    to={`${RouteNames.RECORDS}/${record.recordNameId}`}
                    className="btn-small btn"
                  >
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        previousLabel={<i className="material-icons">chevron_left</i>}
        nextLabel={<i className="material-icons">chevron_right</i>}
        className="pagination"
        pageClassName="waves-effect"
        activeClassName="active"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
      />
    </>
  )
}

export default HistoryTable
