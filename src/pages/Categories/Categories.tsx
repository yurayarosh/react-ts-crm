import { FC, useEffect } from 'react'
import CategoriesAddForm from '../../components/CategoriesAddForm/CategoriesAddForm'
import CategoriesEditForm from '../../components/CategoriesEditForm/CategoriesEditForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LayoutDafault from '../../layouts/LayoutDefault'
import { fetchCategories } from '../../store/actions/categories'

const Categories: FC = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(({ categoriesReducer }) => categoriesReducer)
  const { user } = useAppSelector(state => state.setUserReducer)

  useEffect(() => {
    if (!categories && user?.localId) dispatch(fetchCategories(user.localId))
  }, [])

  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <div className="row">
          <div className="col s12 m6">
            <CategoriesAddForm />
          </div>

          <div className="col s12 m6">
            {categories ? <CategoriesEditForm categories={categories} /> : <p>is loading</p>}
          </div>
        </div>
      </section>
    </LayoutDafault>
  )
}

export default Categories
