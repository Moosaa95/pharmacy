import React, { useEffect, useState } from 'react'
import MedicineDetails from "../../components/medicine-details/MedicineDetails.jsx"
import Header from '../../components/Layout/Header.jsx'
import Footer from '../../components/Layout/Footer.jsx'
import { useParams } from 'react-router-dom'
import { productData } from '../../static/data.js'
export const MedicineDetailPage = () => {
    const {medicineId} = useParams()
    const [data, setData] = useState(null)
    const medicineName = medicineId.replace(/-/, "")


        console.log(medicineId, 'hey', medicineName);

        useEffect(() => {
            const data = productData.find((i) => i.name === medicineName)
            setData(data)
        }, [])

  return (
    <div>
        <Header activeHeading={2}/>
        <MedicineDetails data={data}/>
        <Footer />
    </div>
  )
}
