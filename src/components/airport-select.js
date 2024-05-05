import { Autocomplete } from "@mui/material"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { styled } from '@mui/system'
import FlightTakeoffSharpIcon from '@mui/icons-material/FlightTakeoffSharp';
import FlightLandSharpIcon from '@mui/icons-material/FlightLandSharp';

export default function AirportSelect({ label, airports, refEl }) {
    const Label = styled('label')({
        display: 'block',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 25
      });

    return (
    <>  
        <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
        <Label>{label}</Label>
        {label === "Depart" ?
        <FlightTakeoffSharpIcon sx={{ color: '#61E026', ml: 2}}/>
        :
        <FlightLandSharpIcon sx={{color: '#DC0B0B', ml: 2}}/>
        }
        </Box>
        <Autocomplete 
            id="airport-select"
            sx={{ width: 350 }}
            autoHighlight
            onChange={(event, newValue) => {
                if (refEl) {
                refEl.current = newValue
                }
            }}
            options={airports}
            getOptionLabel={(option) => option?.airport_code || ''}
            renderOption={(props, option) => {
                const { key, ...otherProps } = props
                return (
                    <Box component= "li" key={key} {...otherProps}>
                        {option.airport_code} - {option.name}, {option.city}
                    </Box>
                )
            }}
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
