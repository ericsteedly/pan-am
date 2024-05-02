import { AppBar, Box, Container, Link, Toolbar, Typography } from "@mui/material"
import MainMenu from "./MainMenu"


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ minHeight: 160, justifyContent: 'flex-end'}}>
        <Toolbar disableGutters>
            <Typography
                variant="h1"
                noWrap
                sx={{
                    ml: 5,
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'ivory',
                    flexGrow: 2
                }}
            >
                PAN-AM
            </Typography>
            <MainMenu />
        </Toolbar>
        </AppBar>
    </Box>
  )
}
