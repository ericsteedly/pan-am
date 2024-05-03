import { Autocomplete } from "@mui/material"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { styled } from '@mui/system';

export default function AirportSelect({ label, airports, refEl }) {
    const Label = styled('label')({
        display: 'block',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 25
      });

    return (
    <>
        <Label>{label}</Label>
        <Autocomplete 
            id="airport-select"
            sx={{ width: 350 }}
            autoHighlight
            onChange={(event, newValue) => {
                if (refEl) {
                refEl.current = newValue
                console.log(refEl.current)
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
