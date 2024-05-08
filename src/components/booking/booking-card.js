import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material"
import formatDate from "../utility/date-formatter"
import convertTime from "../utility/convert-time"
import { useState, useEffect } from "react"
import { useAppContext } from "@/context/state"
import { useRouter } from "next/router"


export default function BookingCard({ booking, handleDelete, destination}) {
    const router = useRouter()
    const { setDepartQuery, setReturnQuery } = useAppContext()
    const [tickets, setTickets] = useState([])
    const [depart, setDepart] = useState({})
    const [arrive, setArrive] = useState({})

    useEffect(()=>{
        setTickets(booking.tickets)
    },[booking])
    
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

    const editFlight = async (event) => {
      event.preventDefault()
      const d = depart.departureAirport.id
      const a = arrive.arrivalAirport.id
      const date = depart.departureDay
      const departQuery = `departureAirport=${d}&arrivalAirport=${a}&departureDay=${date}`
  
      try {
        setDepartQuery(departQuery)
        router.push("select-flight")
      } catch (error) {
        console.error('Error fetching flights', error)
      }
    }

    return (
    <>
        <Grid item key={booking.id} lg={8}>
            <Paper sx={{padding: 4}}>
              <Box >
                <Typography variant="h4" fontWeight="800" color='#3182E5'>
                  {booking.tickets[destination].flight.arrivalAirport.city}
                </Typography>
                <Typography variant="h5">
                  {formatDate(booking.tickets[0].flight.departureDay)}
                </Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                <Box sx={{}}>
                  <Typography variant="h5" fontWeight="700">
                    {depart.departureAirport?.airport_code} to {arrive.arrivalAirport?.airport_code}
                  </Typography>
                  <Typography>
                    {convertTime(depart.departureTime)} - {convertTime(arrive.arrivalTime)}
                  </Typography>
                </Box>
                
                    {tickets.length > 1 ?
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                        <Typography fontWeight="700">
                          {tickets.length-1} stop
                        </Typography>
                      </Card>
                      <Typography >
                        {tickets[0].flight.arrivalAirport.city}
                      </Typography>
                    </Box>
                    :
                    <Card sx={{margin: 2, padding: 1, backgroundColor: "lightgrey"}}>
                      <Typography fontWeight="700">
                        Nonstop
                      </Typography>
                    </Card>
                    }
                
                <Box>
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
                        onClick={editFlight}
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
              </Box>
            </Paper>
        </Grid>
    </>
  )
}
