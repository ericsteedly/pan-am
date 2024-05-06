import { Button, Grid, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar/navbar";
import classes from "./book-flight.module.css"
import AirportSelect from "@/components/airport-select";
import { useState, useEffect, useRef } from "react";
import { getAirports, getFlights } from "@/data/flights";
import DateSelector from "@/components/date-select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/state";


export default function BookFlight() {
  const { setDepartQuery, setReturnQuery } = useAppContext()
  const [disablePicker, setDisablePicker] = useState(false)
  const [airports, setAirports] = useState([])
  const refEls = {
    depart: useRef(),
    arrive: useRef(),
    departDate: useRef(null),
    returnDate: useRef(null)
  }
  const router = useRouter()

  const findFlights = async (event) => {
    event.preventDefault()
    const departDateObj = dayjs(refEls.departDate.current)
    const departFormat = departDateObj.format('YYYY-MM-DD')
    const returnDateObj = dayjs(refEls.returnDate.current)
    const returnFormat = returnDateObj.format('YYYY-MM-DD')
    const d = refEls.depart.current.id
    const a = refEls.arrive.current.id
    const departQuery = `departureAirport=${d}&arrivalAirport=${a}&departureDay=${departFormat}`
    let returnQuery = null
    refEls.returnDate.current !== null 
      ? 
      returnQuery = `departureAirport=${a}&arrivalAirport=${d}&departureDay=${returnFormat}`
      :
      null

    try {
      setDepartQuery(departQuery)
      setReturnQuery(returnQuery)
      router.push("depart-flight")

    } catch (error) {
      console.error('Error fetching flights', error)
    }
  }

  const disabler = () => {
    setDisablePicker(!disablePicker)
  }

  useEffect(()=>{
    getAirports().then( res => {
        setAirports(res)
    })
},[])


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
            <FormControl onSubmit={findFlights}>
              <Box className={`${classes.titleContainer}`}>
                <Typography variant="h3" className={`${classes.title}`}>
                  Book a Flight
                </Typography>
              </Box>
              <Box className={`${classes.formMain}`}>
                <Box className={`${classes.formUpper}`}>
                  <RadioGroup 
                    row 
                    name="flight-radio" 
                    defaultValue="roundtrip"
                    onChange={disabler} 
                  >
                  <FormControlLabel value={'oneway'} control={<Radio />} label="Oneway" />
                  <FormControlLabel value={'roundtrip'} control={<Radio />} label="Roundtrip" />
                  </RadioGroup>
                </Box>
                <Box component="form" className={`${classes.formLower}`}>
                  <Box className={`${classes.column1}`}>
                    <AirportSelect 
                      label={"Depart"} 
                      airports={airports}
                      refEl={refEls.depart}
                    />
                    <AirportSelect 
                      label={"Arrive"} 
                      airports={airports}
                      refEl={refEls.arrive}
                    />
                  </Box>
                  <Box className={`${classes.column2}`}>
                    <DateSelector
                      disabled={disablePicker}
                      departRefEl={refEls.departDate}
                      returnRefEl={refEls.returnDate} 
                    />
                  </Box>
                  <Box className={`${classes.column3}`}>
                    <Button 
                      variant="contained"
                      type="submit"
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
                    Search Flight
                    </Button>
                  </Box>
                </Box>
              </Box>
            </FormControl>
            </Paper>
          </Grid>
      </Grid>
    </>
  )
}

BookFlight.getLayout = function getLayout(page) {
  return (
      <Layout>
        <NavBar/>
          {page}
      </Layout>
  )
}