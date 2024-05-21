import { Box, Button, Typography } from "@mui/material"
import Layout from "@/components/layout"
import Router, { useRouter } from "next/router"


export default function Disclaimer() {
    const router = useRouter()

    return (
        <Box sx={{mt: 10, mr: 20, ml: 20, display: 'flex', flexDirection: 'column'}}>
        <Typography>
            <b>DISCLAIMER:</b> This flight booking application is a fictional, educational project created solely for learning and demonstration purposes. It is not affiliated with, endorsed by, or connected to Pan American Airways in any way. Pan American Airways is a trademark of its respective owner.
        </Typography>
        <Typography sx={{mt:2}}>
            This application imitates the general functionality and appearance of a flight booking system but does not process real bookings, accept payments, or have any connection to actual airline operations or databases. All information, including but not limited to flight numbers, schedules, routes, prices, and seat availability, is fictitious and used only for educational purposes.
        </Typography>
        <Typography sx={{mt:5}}>
            By using this application, you acknowledge and agree that:
        </Typography>
            <ol>
                <li>This is not a genuine flight booking platform, and any bookings made through this application are not valid.</li>
                <li>No real transactions or reservations will be processed, and no actual travel arrangements will be made.</li>
                <li>You will not input real payment/credit card information into the application.</li>
                <li>The creator of this application is not responsible for any confusion or misunderstanding arising from the use of this educational tool.</li>
            </ol>
        <Typography>
            For actual flight bookings and information, please visit the official website of your preferred airline or travel agency. This educational application should not be relied upon for any real-world travel planning or bookings.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button 
                variant="contained"
                onClick={()=>{router.push('/login')}}
                sx={{
                mt: 5,
                width: 200,
                boxShadow: 3, 
                backgroundColor: '#F3B12C',
                color: 'white',
                ":hover": {
                    backgroundColor: '#A1A1A1',
                    color: 'white'
                }
            }}
            >
            Return to Login
            </Button>
        </Box>
        </Box>
    )
    }

Disclaimer.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}