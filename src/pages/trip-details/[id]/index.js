import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { Grid, Button, Typography, Paper, Box, Card, Link } from "@mui/material"
import classes from "./trip-details.module.css"
import { useEffect, useState } from "react"
import { deleteBooking, retrieveBooking } from "@/data/booking"
import { useRouter } from "next/router"
import formatDate from "@/components/utility/date-formatter"
import convertTime from "@/components/utility/convert-time"

export default function TripDetails() {
  const router = useRouter()
  const { id } = router.query
  const [booking, setBooking] = useState({})
  const [tickets, setTickets] = useState([])
  const [depart, setDepart] = useState({})
  const [arrive, setArrive] = useState({})
  const taxes = .10
  const fees = 12.00

  const handleCancel = () => {
    const bookingObj = {
      booking_id: booking.id
    }
    deleteBooking(bookingObj)
    router.push("/")
  }

  const handleContinue = () => {
      router.push(`//ticket-form/${booking.id}`)
  }

  useEffect(()=>{
    retrieveBooking(id).then((res)=>{
      setBooking(res)
      setTickets(res.tickets)
    })
  },[id])

  useEffect(()=>{
    if (tickets.length) {
      setDepart(tickets[0].flight)
      if (tickets.length > 0) {
        const lastFlight = tickets.length-1
        setArrive(tickets[lastFlight].flight)
      } else {
        setArrive(tickets[0].flight)
      }
    }
  },[tickets])
  
  return (
    <>
      <Grid 
        container 
        component="main"
        spacing={1}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} 
      >
          <Grid item md={10.5}>
            <Paper elevation={3} className={`${classes.mainPaper}`}>
                <Box className={`${classes.paperUpper}`}>
                  <Box className={`${classes.flightMain}`}>
                    <Box className={`${classes.titleContainer}`}>
                      <Typography variant="h4" className={`${classes.title}`}>
                        Flight details
                      </Typography>
                    </Box>
                    <Box className={`${classes.flightBox}`}>
                      <Typography>
                        {tickets.length ? formatDate(tickets[0].flight.departureDay) : ""}
                      </Typography>
                      <Box className={`${classes.flightDetail}`}>
                        <Typography variant="h5" fontWeight="700">
                          {depart.departureAirport?.airport_code} to {arrive.arrivalAirport?.airport_code}
                        </Typography>
                        <Typography>
                          {convertTime(depart.departureTime)} - {convertTime(arrive.arrivalTime)}
                        </Typography>
                      </Box>
                      <Typography>
                        {tickets.length > 1 ?
                        `${tickets.length-1} stop`
                        :
                        "Nonstop"
                        }
                      </Typography>
                    </Box>
                    <Grid item lg={12}>
                      <Card className={`${classes.line}`}></Card>
                    </Grid>
                  </Box>
                  <Card className={`${classes.pricingMain}`}>
                    <Box className={`${classes.price}`}>
                      <Typography>
                        Price per passenger
                      </Typography>
                      <Typography>
                        ${booking.total_price}
                      </Typography>
                    </Box>
                    <Box className={`${classes.price}`}>
                      <Typography>
                        Taxes and Fees per passenger
                      </Typography>
                      <Typography>
                        ${fees + (booking.total_price * taxes)}
                      </Typography>
                    </Box>
                    <Grid item lg={12}>
                      <Card className={`${classes.line}`}></Card>
                    </Grid>
                    <Box className={`${classes.price}`}>
                      <Typography>
                        Total per passenger
                      </Typography>
                      <Typography>
                        ${booking.total_price + fees + (booking.total_price * taxes)}
                      </Typography>
                    </Box>
                    <Box className={`${classes.price}`}>
                      <Typography>
                        Numbers of passengers
                      </Typography>
                      <Typography>
                        x1
                      </Typography>
                    </Box>
                    <Grid item lg={12}>
                      <Card className={`${classes.line}`}></Card>
                    </Grid>
                    <Box className={`${classes.price}`}>
                      <Typography>
                        Flight Total
                      </Typography>
                      <Typography>
                      ${booking.total_price + fees + (booking.total_price * taxes)}
                      </Typography>
                    </Box>
                  </Card>
                  </Box>
                  <Box className={`${classes.paperLower}`}>
                    <Button
                        onClick={handleCancel} 
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
                        Cancel Booking
                      </Button>
                      <Button 
                      onClick={handleContinue}
                      variant="contained"
                      sx={{
                        marginLeft:2,
                        boxShadow: 3, 
                        backgroundColor: '#F3B12C',
                        color: 'white',
                        ":hover": {
                            backgroundColor: '#A1A1A1',
                            color: 'white'
                        }
                    }}
                    >
                      Continue to Payment
                    </Button>
                  </Box>
            </Paper>
          </Grid>
      </Grid>
    </>
  )
}

TripDetails.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
