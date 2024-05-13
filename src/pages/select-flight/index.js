import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { getFlights } from "@/data/flights"
import Card  from "@mui/material/Card"
import  Box from "@mui/material/Box"
import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context/state"
import classes from "./select-flight.module.css"
import formatDate from "@/components/utility/date-formatter"
import FlightCards from "@/components/flights/flight-cards"
import { createBooking, createRoundTrip } from "@/data/booking"
import { useRouter } from "next/router"
import { deleteTickets, editTickets } from "@/data/ticket"


export default function SelectFlightList() {
    const { departQuery, returnQuery } = useAppContext()
    const [flightChoice, setFlightChoice] = useState([])
    const [flightList, setFlightList] = useState([])
    const [depart, setDepart] = useState("")
    const [arrive, setArrive] = useState("")
    const [date, setDate] = useState("")
    const [returnFlight, setReturnFlight] = useState(false)
    const [departBookingId, setDepartBookingId] = useState(0)
    const router = useRouter()
    const { id } = router.query



    useEffect(()=>{
        getFlights(departQuery).then((res)=>{
            setFlightList(res)
        })
    },[departQuery])

    useEffect(()=>{
        if (returnFlight) {
        getFlights(returnQuery).then((res)=>{
            setFlightList(res)
        })}
    },[returnFlight])

    useEffect(()=>{
        if (flightList.length) {
            let res = flightList.find(flight => flight.departureAirport)
            setDepart(res.departureAirport.airport_code)
            setArrive(res.arrivalAirport.airport_code)
            let newDate = formatDate(res.departureDay)
            setDate(newDate)
        }
    },[flightList])

    const handleContinue = (event) => {
        const flightPackage = []
        flightChoice.map(flight => {
            const flightObj = {
                flight_id: flight
            }
            flightPackage.push(flightObj)
        })

        if (router.query.id){
            const confirmed = window.confirm("Are you sure you want to change this flight?")
            if(confirmed){
                const editObj = {
                    booking_id: router.query.id,
                    flights: flightPackage
                }
                deleteTickets(router.query.id).then(()=>{
                    editTickets(editObj)
                    router.push("bookings")
                })
            }
                
        } else {
            createBooking(flightPackage).then((res)=>{
                if (departBookingId) {
                const roundtripObj = {
                    departure_id: departBookingId,
                    return_id: res.id
                }
                    createRoundTrip(roundtripObj).then((res)=>{
                        router.push(`trip-details/${res.id}/roundtrip?departId=${res.departure_booking}&returnId=${res.return_booking}`)
                })
                } else {
                    router.push(`trip-details/${res.id}`)
                }
            })
        }
    }

    useEffect(()=>{

    },[])

    const handleNextFlight = (event) => {
        const flightPackage = []
        flightChoice.map(flight => {
            const flightObj = {
                flight_id: flight
            }
            flightPackage.push(flightObj)
        })
        createBooking(flightPackage).then((res)=>{
            setDepartBookingId(res.id)
        })
        setReturnFlight(true)
        setFlightChoice([])
    }

    return (
        <>
            <Grid 
                container 
                rowSpacing={1}
                sx={{
                    mt: 1,
                    justifyContent: 'center'
                 }}
            >
                <Grid item lg={8}>
                    <Card className={`${classes.headerCard}`}>
                        {returnFlight ? 
                        <Typography variant="h5" className={`${classes.title}`}>
                            Return: {depart} to {arrive}
                        </Typography>
                        :
                        <Typography variant="h5" className={`${classes.title}`}>
                            Depart: {depart} to {arrive}
                        </Typography>
                        }
                        <Typography variant="h6">{date}</Typography>
                    </Card>
                </Grid>
                <Grid item lg={8}>
                    <Card className={`${classes.line}`}></Card>
                </Grid>
                <Grid item lg={8} className={`${classes.labelBar}`}>
                    <Box className={`${classes.departLabelBox}`}> 
                        <Typography fontSize={20} fontWeight={600}>
                            Departing Flights
                        </Typography>
                    </Box>
                    <Box className={`${classes.labelBox}`}>
                        <Typography fontSize={15} fontWeight={600}>
                            Number of Stops
                        </Typography>
                    </Box>
                    <Box className={`${classes.labelBox}`}>
                        <Typography fontSize={15} fontWeight={600}>
                            {/* Duration */}
                        </Typography>
                    </Box>
                    <Box className={`${classes.labelBox}`}>
                        <Typography fontSize={15} fontWeight={600} marginRight={2}>
                            Ticket 
                        </Typography>
                    </Box>
                </Grid>
                    <FlightCards flightList={flightList} flightChoice={flightChoice} setFlightChoice={setFlightChoice}/>
                    <Grid item lg={8} className={`${classes.buttonBox}`}>
                    {returnQuery == null || returnFlight || id ?       
                        <Button 
                            variant="contained"
                            disabled={flightChoice.length ? false : true}
                            onClick={()=>handleContinue()}
                            sx={{
                                marginRight: 6,
                                marginTop: 1,
                                boxShadow: 3, 
                                backgroundColor: '#F3B12C',
                                color: 'white',
                                ":hover": {
                                    backgroundColor: '#A1A1A1',
                                    color: 'white'
                                }
                            }}
                        >
                            Continue
                        </Button> 
                        :
                        <Button 
                            variant="contained"
                            disabled={flightChoice.length ? false : true}
                            onClick={()=>handleNextFlight()}
                            sx={{
                                marginRight: 6,
                                marginTop: 1,
                                boxShadow: 3, 
                                backgroundColor: '#F3B12C',
                                color: 'white',
                                ":hover": {
                                    backgroundColor: '#A1A1A1',
                                    color: 'white'
                                }
                            }}
                        >
                            Next Flight
                        </Button>
                    }
                    </Grid>
            </Grid>
        </>
    )
}


SelectFlightList.getLayout = function getLayout(page) {
    return (
        <Layout>
        <NavBar/>
            {page}
        </Layout>
    )
}