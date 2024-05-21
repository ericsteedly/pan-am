import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { useAppContext } from "@/context/state"
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import classes from "./account.module.css"
import { deletePayment, getPayments } from "@/data/payment"
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import PaymentModal from "@/components/payment-modal"
import { useRouter } from "next/router"

export default function Account() {
    const router = useRouter()
    const { account } = useAppContext()
    const [payments, setPayments] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const getSetPayments = () => {
        getPayments().then((res)=>{
            setPayments(res)
        })
    }

    const handleEdit = () => {
        router.push("account/edit")
    }

    const handleDelete = (paymentId) => {
        const confirmDelete = window.confirm("Are you sure you would like to delete this payment?")
        if (confirmDelete) {
            deletePayment(paymentId).then(()=>{
                getSetPayments()
            })
        }
    }

    useEffect(()=>{
        getSetPayments()
    },[])

    return (
        <>
            <Grid
                container 
                component="main"
                spacing={1}
                sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center'
                }} 
            >
                <Grid item md={10.5}>
                    <Paper className={`${classes.mainPaper}`}>
                        <Box className={`${classes.titleContainer}`}>
                            <Typography variant="h4" className={`${classes.title}`}>
                                Your Account Info
                            </Typography>
                        </Box>
                        <Box className={`${classes.formMain}`}>
                            <Box className={`${classes.formLeft}`}>
                                <Box className={`${classes.detailBox}`}>
                                    <Typography variant="h5" sx={{textDecorationLine: 'underline'}}>
                                        {account.first_name} {account.last_name}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.detailBox}`}>
                                    <Typography variant="h6">
                                        DOB: {account.customer?.date_of_birth}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.detailBox}`}>
                                    <Typography variant="h6">
                                        Phone#: {account.customer?.phone_number}
                                    </Typography>
                                </Box>
                                <Box className={`${classes.detailBox}`}>
                                    <Typography variant="h6">
                                        Email: {account.email}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={`${classes.formRight}`}>
                                <Box className={`${classes.paymentTitle}`}>
                                    <Typography variant="h5" sx={{textDecorationLine: 'underline'}}>
                                        Payment Types
                                    </Typography>
                                    <IconButton onClick={handleOpenModal}>
                                        <AddBoxSharpIcon />
                                    </IconButton>
                                    
                                </Box>
                                <PaymentModal openModal={openModal} handleCloseModal={handleCloseModal} setPayment={getSetPayments} />
                                {payments.length ?
                                payments.map(payment => {
                                    return (
                                        <Box key={payment.id} className={`${classes.paymentBox}`}>
                                            <Typography>
                                                {payment.merchant} - {payment.obscured_num}
                                            </Typography>
                                            <IconButton onClick={(e)=>{handleDelete(payment.id)}}>
                                                <DeleteForeverSharpIcon />
                                            </IconButton>
                                        </Box>
                                    )
                                })
                                :
                                ""
                                }
                            </Box>
                        </Box>
                        <Box className={`${classes.lower}`}>
                        <Button
                        onClick={handleEdit} 
                        variant="contained"
                        sx={{
                          marginLeft:2,
                          boxShadow: 3, 
                          backgroundColor: '#F3B12C',
                          color: 'white',
                          ":hover": {
                              backgroundColor: '#A1A1A1',
                              color: 'white'
                          }
                      }}
                      >
                        Edit
                      </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
    }

Account.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }