import { Autocomplete } from "@mui/material"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { styled } from '@mui/system';
import { useEffect, useState } from "react";
import { getAirports } from "@/data/flights";

export default function AirportSelect({ label }) {
    const [airports, setAirports] = useState([])

    useEffect(()=>{
        getAirports().then( res => {
            setAirports(res)
        })
    },[])

    const Label = styled('label')({
        display: 'block',
      });

    return (
    <>
        <Label>{label}</Label>
        <Autocomplete 
            id="airport-select"
            sx={{ width: 300 }}
            options={airports}
            autoHighlight
            getOptionLabel={(option) => option.airport_code}
            renderOption={(props, option) => (
                <Box component= "li" {...props}>
                    {option.airport_code} - {option.name}, {option.city}
                </Box>
            )}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    label="Where Would You Like To Fly?"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                    }}
                />
            )}
        />
    </>
  )
}
