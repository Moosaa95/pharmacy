import React, { useContext, useEffect, useState } from 'react'
import MedicineDetails from "../../components/medicine-details/MedicineDetails.jsx"
import Header from '../../components/Layout/Header.jsx'
import Footer from '../../components/Layout/Footer.jsx'
import { useParams } from 'react-router-dom'
import { productData } from '../../static/data.js'
import SuggestedProuduct from '../../components/medicine-details/SuggestedProduct.jsx'
import AuthContext from '../../context/AuthContext.js'
export const MedicineDetailPage = () => {
    const {medicineId} = useParams()
    console.log(medicineId, 'this is param');
    const [data, setData] = useState(null)
    const {fetchDrug}  = useContext(AuthContext)
    // const medicineName = medicineId.replace(/-/, "")
    // const medicineName = medicineId.replace(/-/g, ""); //TODO: Fix for search 


        console.log(medicineId, 'hey');

        useEffect(() => {
            // const data = productData.find((i) => i.name === medicineName)
            // setData(data)
            const fetchData = async () => {
              try{
                const drug = await fetchDrug(medicineId)
                console.log(drug, 'this is my d');
                setData(drug[0])
              }catch{
                console.log('so');
              }
            }

            fetchData()
        }, [medicineId])

        console.log(data, 'drug data');

  return (
    <div>
        <Header activeHeading={2}/>
        <MedicineDetails data={data}/>
        {
        
        data && <SuggestedProuduct data={data} />
        }
        <Footer />
    </div>
  )
}
