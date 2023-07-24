import React from 'react'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import MedicineCard from '../medicine-card/MedicineCard'

const Featured = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Medicines</h1>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    productData && productData.map((i, index) => (
                        <MedicineCard data={i} key={index} />
                    ))
                }

            </div>

        </div>
    </div>
  )
}

export default Featured