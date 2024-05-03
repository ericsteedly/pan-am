import { Button, Grid, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar/navbar";
import classes from "./book-flight.module.css"
import AirportSelect from "@/components/airport-select";
import { useState, useEffect, useRef } from "react";
import { getAirports } from "@/data/flights";

export default function BookFlight() {
  const [airports, setAirports] = useState([])
  const refEls = {
    depart: useRef(),
    arrive: useRef()
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
              <Box className={`${classes.titleContainer}`}>
                <Typography variant="h3" className={`${classes.title}`}>
                  Book a Flight
                </Typography>
              </Box>
              <Box component="form" className={`${classes.form}`} onSubmit={handleSubmit}>
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

                </Box>
                <Box className={`${classes.column3}`}>
                  <Button onClick={()=>console.log(refEls.depart.current)}>Button</Button>
                </Box>
              </Box>
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