import { FC } from 'react'
import LayoutDafault from '../../layouts/LayoutDefault'

const Categories: FC = () => {
  return (
    <LayoutDafault>
      <div className="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <div className="row">
          <div className="col s12 m6">{/* <categories-add-form /> */}</div>

          <div className="col s12 m6">
            {/* <categories-edit-form :categories="categories" /> */}
          </div>
        </div>
      </section>
    </LayoutDafault>
  )
}

export default Categories
