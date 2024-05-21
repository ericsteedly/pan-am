import { DatePicker } from "@mui/x-date-pickers"
import { styled } from '@mui/system';
import { useState } from "react";

export default function DateSelector({ departRefEl, returnRefEl, disabled }) {
  const Label = styled('label')({
    display: 'block',
    fontFamily: 'inherit',
    fontWeight: 600,
    fontSize: 25
  });

  const [arrive, setArrive] = useState(null)
  const [depart, setDepart] = useState(null)
  
  return (
    <>
      <Label>Depart Date</Label>
      <DatePicker
        disablePast
        onChange={(date) => {
          setArrive(date)
          if (departRefEl) {
            const dateString = date?.toISOString()
            departRefEl.current = dateString
            }
        }}
        maxDate={depart}
        slotProps={{
          actionBar: {
            actions: ['clear']
          },
          textField: {
            required: true
          }
        }}
      />
      <Label>Return Date</Label>
      <DatePicker
        disabled={disabled}
        onChange={(date) => {
          setDepart(date)
          if (returnRefEl) {
            const dateString = date?.toISOString()
            returnRefEl.current = dateString
            }
        }}
        minDate={arrive}
        slotProps={{
          actionBar: {
            actions: ['clear']
          },
          textField: {
            required: true
          }
        }}
      />
    </>
  )
}
