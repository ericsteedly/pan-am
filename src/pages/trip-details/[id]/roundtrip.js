import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { Grid, Button, Typography, Paper, Box, Card } from "@mui/material"
import classes from "./roundtrip.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { deleteRoundtrip, retrieveBooking, editBooking } from "@/data/booking"
import { getPayments } from "@/data/payment"
import convertTime from "@/components/utility/convert-time"
import formatDate from "@/components/utility/date-formatter"
import AddCardSharpIcon from '@mui/icons-material/AddCardSharp';
import PaymentModal from "@/components/payment-modal"
import PaymentSelect from "@/components/payment-select"

export default function RoundTrip() {
    const router = useRouter()
    const { id, departId, returnId } = router.query
    const [departBooking, setDepartBooking] = useState({})
    const [returnBooking, setReturnBooking] = useState({})
    const [departTickets, setDepartTickets] = useState([])
    const [returnTickets, setReturnTickets] = useState([])
    const [depart, setDepart] = useState({})
    const [arrive, setArrive] = useState({})
    const [returnDepart, setReturnDepart] = useState({})
    const [returnArrive, setReturnArrive] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)

    const [paymentList, setPaymentList] = useState([])
    const [payment, setPayment] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const taxes = .10
    const fees = 12.00 * 2
  
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleCancel = () => {
      const roundTripObj = {
        depart_booking_id: departBooking.id,
        return_booking_id: returnBooking.id
      }
      deleteRoundtrip(roundTripObj)
      router.push("/")
    }
  
    const handleBook = () => {
        const paymentObj = {
          payment_id: payment.id
        }
        if (!payment.id) {
          window.alert("Please select a payment type")
        } else {
          editBooking(paymentObj, departBooking.id)
          editBooking(paymentObj, returnBooking.id)
          sessionStorage.setItem("departQuery", null)
          sessionStorage.setItem("returnQuery", null)
          router.push(`/bookings`)
        }
    }

    useEffect(()=>{
      if(departId){
        retrieveBooking(departId).then((res)=>{
          setDepartBooking(res)
          setDepartTickets(res.tickets)
        })
      }
      if(returnId){
        retrieveBooking(returnId).then((res)=>{
          setReturnBooking(res) 
          setReturnTickets(res.tickets) 
        })
      }
    },[departId, returnId])

    useEffect(()=>{
      const price = departBooking?.total_price + returnBooking?.total_price
      setTotalPrice(price)
    },[departBooking, returnBooking])

    useEffect(()=>{
      if (departTickets.length) {
        setDepart(departTickets[0].flight)
        if (departTickets.length > 0) {
          const lastFlight = departTickets.length-1
          setArrive(departTickets[lastFlight].flight)
        } else {
          setArrive(departTickets[0].flight)
        }
      }
    },[departTickets])

    useEffect(()=>{
      if (returnTickets.length) {
        setReturnDepart(returnTickets[0].flight)
        if (returnTickets.length > 0) {
          const lastFlight = returnTickets.length-1
          setReturnArrive(returnTickets[lastFlight].flight)
        } else {
          setReturnArrive(returnTickets[0].flight)
        }
      }
    },[returnTickets])
  
    useEffect(()=>{
      getPayments().then((res)=>{
        setPaymentList(res)
      })
    },[payment])

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
                        <Typography variant="h5">
                          {departTickets.length ? formatDate(departTickets[0].flight.departureDay) : ""}
                        </Typography>
                        <Box className={`${classes.flightDetail}`}>
                          <Typography variant="h5" fontWeight="700">
                            {depart.departureAirport?.airport_code} to {arrive.arrivalAirport?.airport_code}
                          </Typography>
                          <Typography>
                            {convertTime(depart.departureTime)} - {convertTime(arrive.arrivalTime)}
                          </Typography>
                        </Box>
                        {departTickets.length > 1 ?
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                            <Typography fontWeight="700">
                              {departTickets.length-1} stop
                            </Typography>
                          </Card>
                          <Typography >
                            {departTickets[0].flight.arrivalAirport.city}
                          </Typography>
                        </Box>
                        :
                        <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                          <Typography fontWeight="700">
                            Nonstop
                          </Typography>
                        </Card>
                        }
                      </Box>
                        


                      <Grid item lg={12}>
                        <Card className={`${classes.line}`}></Card>  
                      </Grid>



                      <Box className={`${classes.returnFlightBox}`}>
                        <Typography variant="h5">
                          {returnTickets.length ? formatDate(returnTickets[0].flight.departureDay) : ""}
                        </Typography>
                        <Box className={`${classes.flightDetail}`}>
                          <Typography variant="h5" fontWeight="700">
                            {returnDepart.departureAirport?.airport_code} to {returnArrive.arrivalAirport?.airport_code}
                          </Typography>
                          <Typography>
                            {convertTime(returnDepart.departureTime)} - {convertTime(returnArrive.arrivalTime)}
                          </Typography>
                        </Box>
                        {returnTickets.length > 1 ?
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                            <Typography fontWeight="700">
                              {returnTickets.length-1} stop
                            </Typography>
                          </Card>
                          <Typography >
                            {returnTickets[0].flight.arrivalAirport.city}
                          </Typography>
                        </Box>
                        :
                        <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                          <Typography fontWeight="700">
                            Nonstop
                          </Typography>
                        </Card>
                        }
                      </Box>
                    </Box>


                    <Card className={`${classes.pricingMain}`}>
                      <Box className={`${classes.price}`}>
                        <Typography>
                          <b>Departure</b> Price per passenger
                        </Typography>
                        <Typography>
                          ${departBooking.total_price?.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box className={`${classes.price}`}>
                        <Typography>
                          <b>Return</b> Price per passenger
                        </Typography>
                        <Typography>
                          ${returnBooking.total_price?.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box className={`${classes.price}`}>
                        <Typography>
                          Taxes and Fees per passenger
                        </Typography>
                        <Typography>
                          ${(fees + (totalPrice * taxes)).toFixed(2)}
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
                          ${(totalPrice + fees + (totalPrice * taxes)).toFixed(2)}
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
                        <Typography variant="h6">
                          Trip Total
                        </Typography>
                        <Typography>
                        ${(totalPrice+ fees + (totalPrice * taxes)).toFixed(2)}
                        </Typography>
                      </Box>
                    </Card>
                    </Box>
                    <Box className={`${classes.paperLower}`}>
                      <Button
                        onClick={handleOpenModal}
                        sx={{
                          marginBottom: 4,
                          boxShadow: 3, 
                          backgroundColor: '#3182E5',
                          marginRight: 1,
                          color: 'white',
                          ":hover": {
                              backgroundColor: '#A1A1A1',
                              color: 'white'
                          }
                        }}
                      >
                        New
                        <AddCardSharpIcon sx={{ marginLeft: 1}}/>
                      </Button>
                      <PaymentModal openModal={openModal} handleCloseModal={handleCloseModal} setPayment={setPayment} />
                      <PaymentSelect paymentList={paymentList} setPayment={setPayment} />
                      <Button 
                        onClick={handleBook}
                        variant="contained"
                        sx={{
                          marginBottom: 4,
                          boxShadow: 3, 
                          backgroundColor: '#F3B12C',
                          color: 'black',
                          ":hover": {
                              backgroundColor: '#A1A1A1',
                              color: 'white'
                          }
                      }}
                      >
                        Book Trip!
                      </Button>
                      <Button
                          onClick={handleCancel} 
                          variant="contained"
                          sx={{
                            marginBottom: 4,
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
                          Cancel Booking
                        </Button>
                    </Box>
              </Paper>
            </Grid>
        </Grid>
      </>
    )
    

}
  
RoundTrip.getLayout = function getLayout(page) {
    return (
        <Layout>
        <NavBar/>
            {page}
        </Layout>
    )
}
  

