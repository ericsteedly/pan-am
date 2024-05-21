import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material"
import MainMenu from "./main-menu"


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ minHeight: 160, justifyContent: 'flex-end'}}>
        <Toolbar disableGutters>
            <Box sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',  
                flexGrow: 3
            }}>
            <Typography
                variant="h2"
                noWrap
                sx={{
                    ml: 2,
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'ivory',
                }}
            >
                <Link href="/" underline="none" color="inherit">
                    Fan Am Airways
                </Link>
            </Typography>
            <Typography variant="h10" fontStyle='italic' sx={{marginBottom: 1.5, ml: 2.5}}>
                Pretending to book Pan Am flights since 2024
            </Typography>
            </Box>
            <MainMenu />
        </Toolbar>
        </AppBar>
    </Box>
  )
}
