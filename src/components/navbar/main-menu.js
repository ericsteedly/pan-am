// import IconButton from "@mui/material/IconButton"
// import MenuSharpIcon from '@mui/icons-material/MenuSharp';

// export default function MainMenu() {
//   return (
//     <>
//         <IconButton
//             size="large"
//             edge="end"
//             color="inherit"
//             sx={{ 
//                 mr: 1,
//                 alignSelf: 'flex-end'
//             }}
//         >
//             <MenuSharpIcon sx={{ fontSize: 35}}/>
//         </IconButton>
//     </>
//   )
// }

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
          >
              <MenuSharpIcon sx={{ fontSize: 35, color: 'white'}} />
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
              <MenuItem onClick={handleClose} >
                  <Link
                      href="/" 
                      underline="none"
                      color="inherit"
                  >
                      Home
                  </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} >
                  <Link
                      href="/account" 
                      underline="none"
                      color="inherit"
                  >
                      Account
                  </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} >
                  <Link
                      href="/bookings" 
                      underline="none"
                      color="inherit"
                  >
                      Bookings
                  </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} >
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
                      Logout
                  </Link>
              </MenuItem>
          </Menu>
      </div>
  )
}
