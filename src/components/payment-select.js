import { Autocomplete, TextField, Box, Typography } from "@mui/material"

export default function PaymentSelect({ paymentList, setPayment }) {
  return (
    <Box>
        <Autocomplete 
            id="payment-select"
            sx={{ width: 300, marginRight: 2 }}
            autoHighlight
            onChange={(event, newValue) => {
                setPayment(newValue)
            }}
            options={paymentList}
            getOptionLabel={(option) => `${option?.merchant} - ${option.obscured_num}` || ''}
            renderOption={(props, option) => {
                const { key, ...otherProps } = props
                return (
                    <Box component= "li" key={option.id} {...otherProps}>
                        {option.merchant} - {option.obscured_num}
                    </Box>
                )
            }}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    label="Select a Payment"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                    }}
                />
            )}
        />
        <Typography sx={{color: 'red', mt: 1}}>
        *Do not use real payment info!
        </Typography>
    </Box>
  )
}
