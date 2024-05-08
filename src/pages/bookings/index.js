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
            <Grid item key={booking.id} lg={8}>
            <Paper sx={{padding: 4}}>
              <Box sx={{}}>
                <Typography variant="h4">
                  {booking.tickets[destination].flight.arrivalAirport.city}
                </Typography>
                <Typography variant="h5">
                  {formatDate(booking.tickets[0].flight.departureDay)}
                </Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                  onClick={()=>{handleDelete(booking.id)}}
                  variant="contained"
                  sx={{
                    boxShadow: 3, 
                    backgroundColor: '#F3B12C',
                    color: 'white',
                    ":hover": {
                        backgroundColor: '#A1A1A1',
                        color: 'white'
                    }
                }}
                >
                Cancel
              </Button>
              <Button
                  variant="contained"
                  sx={{
                    ml: 4,
                    boxShadow: 3, 
                    backgroundColor: '#3182E5',
                    color: 'white',
                    ":hover": {
                        backgroundColor: '#A1A1A1',
                        color: 'white'
                    }
                }}
                >
                Change
              </Button>
              </Box>
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
