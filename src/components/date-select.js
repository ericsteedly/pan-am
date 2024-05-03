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
        closeOnSelect={false}
        onChange={(date) => {
          setArrive(date)
          if (departRefEl) {
            departRefEl.current = date
            }
        }}
        maxDate={depart}
        slotProps={{
          actionBar: {
            actions: ['accept', 'clear']
          }
        }}
      />
            <Label>Return Date</Label>
      <DatePicker
        disabled={disabled}
        onChange={(date) => {
          setDepart(date)
          if (returnRefEl) {
            returnRefEl.current = date
            }
        }}
        minDate={arrive}
        slotProps={{
          actionBar: {
            actions: ['accept', 'clear']
          }
        }}
      />
    </>
  )
}
