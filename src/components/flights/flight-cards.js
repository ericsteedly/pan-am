import  Card  from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import  Box  from "@mui/material/Box"
import  Typography  from "@mui/material/Typography"
import convertTime from "@/components/utility/convert-time"
import convertDuration from "../utility/convert-duration"
import classes from "./flight-cards.module.css"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from "react"

export default function FlightCards({ flightList }) {
    const [price, setPrice] = useState('economy')

    const handlePriceChange = (event, newPrice) => {
        setPrice(newPrice)
    }


  return (
    <>
        {flightList ? flightList.map((flight) => {
                    if (flight.flight1) { 
                        return (
                        <Grid item key={flight.flight1.id} lg={8}>
                            <Card className={`${classes.flightCard}`}>
                                <Box className={`${classes.timeBox}`}>
                                    <Typography>
                                        Flight #{flight.flight1.id} / {flight.flight2.id}
                                    </Typography>
                                    <Typography variant="h6" className={`${classes.title}`}>
                                        {convertTime(flight.flight1.departureTime)} - {convertTime(flight.flight2.arrivalTime)}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.stopBox}`}>
                                    <Card sx={{ backgroundColor: 'darkgray', pl: 1, pr: 1}}>
                                        <Typography>
                                            1 Stop
                                        </Typography>
                                    </Card>
                                    <Typography>
                                        Change Planes {flight.flight1.arrivalAirport.airport_code}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.durationBox}`}>
                                    <Typography variant="h6">
                                        {convertDuration(flight.total_duration)}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.toggleBox}`}> 
                                    <ToggleButtonGroup
                                        color='info'
                                        value={price}
                                        exclusive
                                        onChange={handlePriceChange}
                                        aria-label="ticket buttons"
                                    >
                                        <ToggleButton value={flight.flight1.id} aria-label="ticket" className={`${classes.toggle}`}>
                                            <Typography variant="h6" color='black'>
                                            ${flight.total_price}
                                            </Typography>
                                            <Typography fontSize={10} color='red'>
                                                <i>{flight.flight1.seats} left</i>
                                            </Typography>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Card>
                        </Grid>
                        )
                    } 
                    return (
                        <Grid item key={flight.id} lg={8}>
                            <Card className={`${classes.flightCard}`}>
                                <Box className={`${classes.timeBox}`}>
                                    <Typography>
                                        Flight #{flight.id}
                                    </Typography>
                                    <Typography variant="h6" className={`${classes.title}`}>
                                        {convertTime(flight.departureTime)} - {convertTime(flight.arrivalTime)}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.stopBox}`}>
                                    <Card sx={{ backgroundColor: 'darkgray', pl: 1, pr: 1}}>
                                        <Typography>
                                        Nonstop
                                        </Typography>
                                    </Card>
                                </Box>
                                <Box className={`${classes.durationBox}`}>
                                    <Typography variant="h6">
                                        {convertDuration(flight.duration)}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.toggleBox}`}> 
                                    <ToggleButtonGroup
                                    color="info"
                                        value={price}
                                        exclusive
                                        onChange={handlePriceChange}
                                        aria-label="ticket buttons"
                                    >
                                        <ToggleButton value={flight.id} aria-label="ticket" className={`${classes.toggle}`}>
                                            <Typography variant="h6" color='black'>
                                            ${flight.price}
                                            </Typography>
                                            <Typography fontSize={10} color='red'>
                                                <i>{flight.seats} left</i>
                                            </Typography>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Card>
                        </Grid>
                    )
                }) : 
                    <p>...Loading</p>
                }
    </>
  )
}
