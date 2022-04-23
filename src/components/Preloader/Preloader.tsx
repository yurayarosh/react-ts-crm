import classNames from 'classnames'
import { FC } from 'react'

import styles from './Preloader.module.css'

const Preloader: FC = () => {
  return (
    <div className={classNames('preloader-another-wrapper', styles.wrapper)}>
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
