import React from 'react'
import Header from '../../components/Layout/Header'
import Payment from '../../components/payment/Payment'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import Footer from '../../components/Layout/Footer'


const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage