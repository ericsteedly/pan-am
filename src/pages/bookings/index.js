import BookingCard from "@/components/booking/booking-card"
import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { deleteBooking, listBookings } from "@/data/booking"
import { Grid } from "@mui/material"
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
        {bookings.length ? bookings.map((booking)=> {
          const destination = booking.tickets.length-1
          return (
              <BookingCard key={booking.id} booking={booking} handleDelete={handleDelete} destination={destination}/>
          )})
        :
        <>
          <Box sx={{backgroundColor: 'rgb(203, 199, 199)', display: 'flex', justifyContent: 'center', width: '100%', padding: 4}}>
            <Typography variant="h4">
                You currently have no flights booked.
            </Typography>
            <Button 
                    variant="contained"
                    onClick={()=>{router.push("/")}}
                    sx={{
                        marginLeft: 6,
                        boxShadow: 3, 
                        backgroundColor: '#F3B12C',
                        color: 'white',
                        ":hover": {
                            backgroundColor: '#A1A1A1',
                            color: 'white'
                        }
                    }}
            >
                    Book Now!
            </Button> 
          </Box> 
        </>
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
