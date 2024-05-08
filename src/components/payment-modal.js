import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { newPayment } from "@/data/payment";

const main = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 1,
    pr: 2,
    pl: 2,
  };

const text = {
    mt: 2
}


export default function PaymentModal({ openModal, handleCloseModal, setPayment }) {
    const first_name = useRef()
    const last_name = useRef()
    const merchant = useRef()
    const card_number = useRef()
    const expiration_date = useRef()
    const CVV = useRef()


    const validateExpDate = (exp_date) => {
        const expDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expDatePattern.test(exp_date);
      };

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validateExpDate(expiration_date.current.value)) {
            window.alert("Incorrect Exp Date format, please use 'MM/YY'")
        } else {
        
        const paymentObj = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            merchant: merchant.current.value,
            card_number: card_number.current.value,
            expiration_date: expiration_date.current.value,
            CVV: CVV.current.value
            }
        newPayment(paymentObj).then((res)=>{
            setPayment(res)
            handleCloseModal()
        })
        }
    }


    return (
        <>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={main}>
                <Box sx={{ display: "flex", justifyContent: "center"}}>
                    <Typography variant="h4" component="h2">
                        New Payment
                    </Typography>
                    <IconButton onClick={handleCloseModal}>
                        <CloseSharpIcon />
                    </IconButton>
                </Box>
                <form onSubmit={handleSubmit} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2}}>
                        <Box sx={{ display: 'flex',  flexDirection: 'column', justifyContent: 'space-between'}}>
                            <TextField
                                sx={text} 
                                required
                                variant="filled"
                                label="Card First Name"
                                inputRef={first_name}
                            />
                            <TextField
                                sx={text} 
                                required
                                variant="filled"
                                label="Card Type"
                                inputRef={merchant}
                            />
                            <TextField
                                sx={text} 
                                required
                                variant="filled"
                                label="Exp Date"
                                placeholder="MM/YY"
                                inputRef={expiration_date}
                            />
                        </Box>
                        <Box sx={{ display: 'flex',  flexDirection: 'column', justifyContent: 'space-bet'}}>
                            <TextField
                            sx={text} 
                                required
                                variant="filled"
                                label="Card Last Name"
                                inputRef={last_name}
                            />
                            <TextField
                                sx={text}
                                variant="filled" 
                                required
                                label="Card Number"
                                inputRef={card_number}
                            />
                            <TextField
                                sx={text}
                                variant="filled" 
                                required
                                label="CVV"
                                inputRef={CVV}
                            />
                        </Box>
                    </Box>
 
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 2, mt: 4}}>
                    <Button 
                        variant="contained"
                        type="submit"
                        sx={{
                        boxShadow: 3, 
                        backgroundColor: '#F3B12C',
                        color: 'black',
                        ":hover": {
                            backgroundColor: '#A1A1A1',
                            color: 'white'
                            }
                        }}
                    >
                    Add Payment
                    </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
        </>
    )
}


