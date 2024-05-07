import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { Grid, Button, Typography, Paper, Box, Card } from "@mui/material"
import classes from "./roundtrip.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


export default function RoundTrip() {
    router = useRouter()
    const { id } = router.query
    const [booking, setBooking] = useState({})


    useEffect(()=>{

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
                  <Box className={`${classes.paperUpper}`}>
                    <Box className={`${classes.flightMain}`}>
                      <Box className={`${classes.titleContainer}`}>
                        <Typography variant="h4" className={`${classes.title}`}>
                          Flight details
                        </Typography>
                      </Box>
                      <Box>
                        srthrth
                      </Box>
                      <Grid item lg={12}>
                        <Card className={`${classes.line}`}></Card>
                      </Grid>
                      <Box>
                        srthsrt
                      </Box>
                    </Box>
                    <Card className={`${classes.pricingMain}`}>
                      srethergerg
                    </Card>
                    </Box>
                    <Box className={`${classes.paperLower}`}>
                      <Button 
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
                        Continue to Payment
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
  

