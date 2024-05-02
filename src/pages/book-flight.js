import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BookFlight() {
  return (
    <>
      <Grid 
        container 
        spacing={1}
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} 
      >
        <Grid item xl={10.5} lg={10.5}>
          <Item>Hello</Item>
        </Grid>
      </Grid>
    </>
  )
}
