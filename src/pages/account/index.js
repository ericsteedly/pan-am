import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { useAppContext } from "@/context/state"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { useEffect } from "react"

export default function Account() {
    const { account } = useAppContext()

    useEffect(()=>{
        console.log(account)
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
                    <Paper>
                        <Box>
                            <Typography variant="h4">
                                Your Account Info
                            </Typography>
                        </Box>
                        <Box>
                            <Box>
                                <Typography variant="h5">
                                    {account.first_name} {account.last_name}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    DOB: {account.customer?.date_of_birth}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Phone#: {account.customer?.phone_number}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Email: {account.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </>
    )
    }

Account.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }