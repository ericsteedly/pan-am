import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import formatDate from "@/components/utility/date-formatter"
import { listBookings } from "@/data/booking"
import { Grid, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"


export default function Bookings() {
  const [bookings, setBookings] = useState([])


  useEffect(()=>{
    listBookings().then((res)=>{
      setBookings(res)
    })
  },[])

  return (
    <>
      <Grid 
        container
        rowSpacing={4}
        sx={{
            mt: 1,
            justifyContent: 'center'
         }} 
      >
        {bookings ? bookings.map((booking)=> {
          const destination = booking.tickets.length-1
          return (
            <Grid item key={booking.id} lg={8}>
            <Paper sx={{padding: 4}}>
              <Typography variant="h4">
                {booking.tickets[destination].flight.arrivalAirport.city}
              </Typography>
              <Typography variant="h5">
                {formatDate(booking.tickets[0].flight.departureDay)}
              </Typography>
            </Paper>
          </Grid>
          )})
        :
        ""
      }

      </Grid>
    
    </>
  )
}

Bookings.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
