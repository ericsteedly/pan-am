import { Button, Grid, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar/navbar";
import classes from "./book-flight.module.css"
import AirportSelect from "@/components/airport-select";
import { useState, useEffect, useRef } from "react";
import { getAirports } from "@/data/flights";
import DateSelector from "@/components/date-select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function BookFlight() {
  const [disablePicker, setDisablePicker] = useState(false)
  const [airports, setAirports] = useState([])
  const refEls = {
    depart: useRef(),
    arrive: useRef(),
    departDate: useRef(null),
    returnDate: useRef(null)
  }

  const findFlights = () => {
    event.preventDefault()
    console.log("worked")
  }

  const disabler = () => {
    setDisablePicker(!disablePicker)
  }

  useEffect(()=>{
    getAirports().then( res => {
        setAirports(res)
    })
},[])

  const handleSubmit = () => {
    return console.log("submitted")
  }

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
                <Box component="form" className={`${classes.formLower}`} onSubmit={handleSubmit}>
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
                      // onClick={()=>console.log(refEls.departDate.current)}
                    >
                    Button
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
        <NavBar>
          {page}
        </NavBar>
      </Layout>
  )
}