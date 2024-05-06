import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navbar"
import { getFlights } from "@/data/flights"
import Card  from "@mui/material/Card"
import  Box from "@mui/material/Box"
import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context/state"
import classes from "./depart-flight.module.css"
import formatDate from "@/components/utility/date-formatter"
import FlightCards from "@/components/flights/flight-cards"



export default function DepartFlightList() {
    const { departQuery, returnQuery } = useAppContext()
    const [flightList, setFlightList] = useState([])
    const [depart, setDepart] = useState("")
    const [arrive, setArrive] = useState("")
    const [date, setDate] = useState("")



    useEffect(()=>{
        getFlights(departQuery).then((res)=>{
            setFlightList(res)
        })
    },[departQuery])

    useEffect(()=>{
        if (flightList.length) {
            let res = flightList.find(flight => flight.departureAirport)
            setDepart(res.departureAirport.airport_code)
            setArrive(res.arrivalAirport.airport_code)
            let newDate = formatDate(res.departureDay)
            setDate(newDate)
        }
    },[flightList])

    const handleSubmit = (event) => {
        console.log("submit!")
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
                        <Typography variant="h5" className={`${classes.title}`}>Depart: {depart} to {arrive}</Typography>
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
                            Duration
                        </Typography>
                    </Box>
                    <Box className={`${classes.labelBox}`}>
                        <Typography fontSize={15} fontWeight={600}>
                            Ticket 
                        </Typography>
                    </Box>
                </Grid>
                    <FlightCards flightList={ flightList }/>
                    <Grid item lg={8} className={`${classes.buttonBox}`}>
                    <Button 
                        variant="contained"
                        onClick={()=>handleSubmit()}
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
                    </Grid>
            </Grid>
        </>
    )
}


    DepartFlightList.getLayout = function getLayout(page) {
        return (
            <Layout>
            <NavBar/>
                {page}
            </Layout>
        )
    }