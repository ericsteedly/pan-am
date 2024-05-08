import BookingCard from "@/components/booking/booking-card"
import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import formatDate from "@/components/utility/date-formatter"
import { deleteBooking, listBookings } from "@/data/booking"
import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function Bookings() {
  const router = useRouter()
  const [bookings, setBookings] = useState([])

  const handleDelete = (id) => {
    const cancel = window.confirm("Are you sure you would like to delete this flight?")
    if (cancel){
      const bookingObj = {
        booking_id: id
      }
      deleteBooking(bookingObj)
      getSetBookings()
      router.reload()
    }
  }

  const getSetBookings = () => {
    listBookings().then((res)=>{
      setBookings(res)
    })
  }

  useEffect(()=>{
    getSetBookings()
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
              <BookingCard key={booking.id} booking={booking} handleDelete={handleDelete} destination={destination}/>
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
