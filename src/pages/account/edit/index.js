import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import classes from "./editAccount.module.css"
import { useAppContext } from "@/context/state"
import { useRef } from "react"
import { editUserAccount, getUserAccount } from "@/data/auth"
import { useRouter } from "next/router"

export default function EditAccount() {
  const router = useRouter()
  const { account } = useAppContext()

  const dob = account.customer?.date_of_birth
  const phone = account.customer?.phone_number

  const first_name = useRef()
  const last_name = useRef()
  const email = useRef()
  const phone_number = useRef()
  const date_of_birth = useRef()

  const handleEdit = (e) => {
    e.preventDefault()
    const accountObj = {
       first_name: first_name.current.value,
       last_name: last_name.current.value,
       email: email.current.value,
       phone_number: phone_number.current.value,
       date_of_birth: date_of_birth.current.value
    }
    editUserAccount(account.id, accountObj)
    router.push("/account")
  }

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
            <form onSubmit={handleEdit}>
              <Paper className={`${classes.mainPaper}`}>
                  <Box className={`${classes.titleContainer}`}>
                      <Typography variant="h4" className={`${classes.title}`}>
                          Your Account Info
                      </Typography>
                  </Box>
                  <Box className={`${classes.formMain}`}>
                      <Box className={`${classes.formLeft}`}>
                          <Box className={`${classes.detailBox}`}>
                            <TextField
                                variant="filled"
                                label="First Name"
                                required
                                defaultValue={account.first_name}
                                inputRef={first_name}
                            />
                          </Box>
                          <Box className={`${classes.detailBox}`}>
                            <TextField
                                variant="filled"
                                label="Last Name"
                                required
                                defaultValue={account.last_name}
                                inputRef={last_name}
                            />
                          </Box>
                          <Box className={`${classes.detailBox}`}>
                            <TextField
                                variant="filled"
                                label="Date of Birth"
                                required
                                defaultValue={dob}
                                inputRef={date_of_birth}
                            />
                          </Box>
                      </Box>
                      <Box className={`${classes.formRight}`}>
                          <Box className={`${classes.detailBox}`}>
                            <TextField
                                variant="filled"
                                label="Phone Number"
                                required
                                defaultValue={phone}
                                inputRef={phone_number}
                            />
                          </Box>
                          <Box className={`${classes.detailBox}`}>
                            <TextField
                                variant="filled"
                                label="Email"
                                required
                                defaultValue={account.email}
                                inputRef={email}
                            />
                          </Box>
                      </Box>
                  </Box>
                  <Box className={`${classes.lower}`}>
                  <Button
                  type="submit" 
                  variant="contained"
                  sx={{
                    marginLeft:2,
                    boxShadow: 3, 
                    backgroundColor: '#F3B12C',
                    color: 'black',
                    ":hover": {
                        backgroundColor: '#A1A1A1',
                        color: 'white'
                    }
                }}
                >
                  Save
                </Button>
                <Button
                  onClick={()=>{router.push("/account")}}
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
                  Cancel
                </Button>
                  </Box>
              </Paper>
            </form>
        </Grid>
      </Grid>
    </>
  )
}

EditAccount.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
