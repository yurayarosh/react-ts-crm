import { FC, useEffect, useState } from 'react'
import { filterDate } from '../../assets/scripts/helpers'

const Clock: FC = () => {
  const [newDate, setNewDate] = useState(filterDate(new Date(), 'date-time'))

  useEffect(() => {
    const updateDate = setInterval(() => {
      setNewDate(filterDate(new Date(), 'date-time'))
    }, 1000)

    return () => {
      clearInterval(updateDate)
    }
  })

  return <>{`${newDate}`}</>
}

export default Clock
