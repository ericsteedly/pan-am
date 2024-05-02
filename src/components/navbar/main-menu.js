import IconButton from "@mui/material/IconButton"
import MenuSharpIcon from '@mui/icons-material/MenuSharp';

export default function MainMenu() {
  return (
    <>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ 
                mr: 1,
                alignSelf: 'flex-end'
            }}
        >
            <MenuSharpIcon sx={{ fontSize: 35}}/>
        </IconButton>
    </>
  )
}
