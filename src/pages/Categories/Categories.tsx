import { FC } from 'react'
import CategoriesAddForm from '../../components/CategoriesAddForm/CategoriesAddForm'
import CategoriesEditForm from '../../components/CategoriesEditForm/CategoriesEditForm'
import LayoutDafault from '../../layouts/LayoutDefault'

const Categories: FC = () => {
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
            <CategoriesEditForm />
          </div>
        </div>
      </section>
    </LayoutDafault>
  )
}

export default Categories
