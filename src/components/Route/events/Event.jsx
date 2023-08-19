import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles';
import EventCard from "./EventCard";
import AuthContext from '../../../context/AuthContext';

const Events = () => {
  const {fetchEvents} = useContext(AuthContext)
  const [allEvents, setAllEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // const {allEvents,isLoading} = useSelector((state) => state.events);
  const getEvent = async () => {
    const events  = await fetchEvents()
    console.log(events, 'this is the event');
    setAllEvents(events?.events)

  }  
  useEffect(() => {
    getEvent()
  }, [])
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
         {
          allEvents?.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         }
         <h4>{
           allEvents?.length === 0 && (
            'No Events have!'
           )
          }

         </h4>
      </div>
     
    </div>
      )
     }
  </div>
  )
}

export default Events