import React, { useEffect, useState } from 'react'
import { getAppointements } from '../utils/api'

function Appointment() {

  const [appointment,SetAppointment] = useState()

    useEffect(()=>{
      async function fetchData(){
        const data = getAppointements();
        
        console.log(data)
      }
      // SetAppointment(data)
      fetchData()
    })

  return (
    <div>
      {

      }
    </div>
  )
}

export default Appointment