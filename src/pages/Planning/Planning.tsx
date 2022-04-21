import { FC, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCategories } from '../../store/actions/categories'
import { fetchRecords } from '../../store/actions/records'
import { ICategory } from '../../store/actions/types/categories'
import { IRecord } from '../../store/actions/types/records'

const Planning: FC = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.categoriesReducer)
  const { records } = useAppSelector(state => state.recordsReducer)
  const { user } = useAppSelector(state => state.setUserReducer)

  useEffect(() => {
    if (user?.localId) {
      dispatch(fetchCategories(user.localId))
      dispatch(fetchRecords(user.localId))
    }
  }, [])

  const categoriesList: ICategory[] | null = useMemo(() => {
    return categories ? Object.values(categories) : null
  }, [categories])

  const recordsList: IRecord[] | null = useMemo(() => {
    return records ? Object.values(records) : null
  }, [records])

  useEffect(() => {
    console.log({ records })
  }, [records])

  if (!categoriesList?.length) return <div>loading...</div>

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Планирование</h3>
        {/* {{ bill | currency }} */}
        <h4>8 320,00 грн.</h4>
      </div>

      {/* <v-preloader v-if="isLoading" /> */}

      {/* <p v-else-if="!categories.length">Пока нет ни одной категории</p> */}

      {/* <p v-else-if="!records.length">Пока нет ни одной записи</p> */}

      <section>
        {categoriesList.map(category => (
          <div key={category.id}>
            <p>
              <strong>{category.name}:</strong>
              spent из {category.limit}
            </p>
            <div className="progress">
              <div className="determinate" />
            </div>
          </div>
        ))}
      </section>
    </LayoutDafault>
  )
}

export default Planning
