import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navbar"
import { getFlights } from "@/data/flights"
import Card  from "@mui/material/Card"
import  Box from "@mui/material/Box"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context/state"
import classes from "./depart-flight.module.css"


export default function DepartFlightList() {
    const { departQuery, returnQuery } = useAppContext()
    const [flightList, setFlightList] = useState([])

    useEffect(()=>{
        getFlights(departQuery).then((res)=>{
            setFlightList(res)
        })
    },[departQuery])

    return (
        <>
            <Grid 
                container 
                spacing={5}
                sx={{
                    flexGrow: 1,
                 }}
            >
                {flightList ? flightList.map((flight) => {
                    if (flight.flight1) { 
                        return (
                        <Grid item key={flight.flight1.id} lg={8} className={`${classes.border}`}>
                            <Card className={`${classes.cardMain}`}>{flight.flight1.id} - {flight.flight2.id}</Card>
                        </Grid>
                        )
                    }
                    return (
                        <Grid item key={flight.id} lg={8} className={`${classes.border}`}>
                            <Card className={`${classes.cardMain}`}>{flight.id}</Card>
                        </Grid>
                    )
                }) : 
                    <p>...Loading</p>
                }
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