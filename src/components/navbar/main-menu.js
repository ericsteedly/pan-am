import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import Link from '@mui/material/Link';

export default function MainMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton
                id="menu-btn"
                aria-haspopup="true"
                aria-controls={open ? 'main-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{mt: 6, mr: 2}}
            >
                <MenuSharpIcon sx={{ fontSize: 40, color: 'white'}} />
            </IconButton>
            <Menu
                id="main-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-btn'
                }}
            >
                <Link
                    href="/" 
                    underline="none"
                    color="inherit"
                >
                    <MenuItem onClick={handleClose} >
                        Book Flight
                    </MenuItem>
                </Link>
                <Link
                    href="/account" 
                    underline="none"
                    color="inherit"
                >
                    <MenuItem onClick={handleClose} >
                        Account
                    </MenuItem>
                </Link>
                <Link
                    href="/bookings" 
                    underline="none"
                    color="inherit"
                >
                    <MenuItem onClick={handleClose} >
                        Bookings
                    </MenuItem>
                </Link>
                <Link
                    href="/login"
                    underline="none"
                    color="inherit"
                    onClick={()=>{
                        localStorage.removeItem("token")
                        sessionStorage.removeItem("departQuery")
                        sessionStorage.removeItem("returnQuery")
                    }}
                >
                    <MenuItem onClick={handleClose} >
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    )
}
