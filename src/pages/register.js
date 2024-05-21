import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, register } from '@/data/auth';
import { useAppContext } from '@/context/state';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { DoneSharp } from '@mui/icons-material';



const defaultTheme = createTheme();

export default function Login() {
    const {setToken} = useAppContext()
    const router = useRouter()

    const validateDate = (exp_date) => {
        const expDatePattern = /^\d{4}-\d{2}-\d{2}$/;
        return expDatePattern.test(exp_date);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!validateDate(data.get('date_of_birth'))) {
            window.alert("Incorrect Date format, please use 'YYYY-MM-DD'")
        } else {
        let user = {
                username: data.get('username'),
                password: data.get('password'),
                first_name: data.get('first_name'),
                last_name: data.get('last_name'),
                email: data.get('email'),
                phone_number: data.get('phone_number'),
                date_of_birth: data.get('date_of_birth')
            }
            // log in after successful registration
            register(user).then((res)=>{
                if (res.token) {
                    setToken(res.token)
                    router.push('/')
                } else {
                    window.alert("Username not available, please try another")
                }
            })
        }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2020/03/gettyimages-614170456-594x594-1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 900,
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Register with Pan Am
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="dense"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="first_name"
                autoFocus
                />
                <TextField
                margin="dense"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="last_name"
                autoFocus
                />
                <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <Box sx={{ display: 'flex'}}>
                    <TextField
                        sx={{mr: 1}}
                        margin="dense"
                        required
                        fullWidth
                        id="date_of_birth"
                        label="Date of Birth"
                        helperText='YYYY-MM-DD'
                        name="date_of_birth"
                        autoComplete="date_of_birth"
                        autoFocus
                    />
                    <TextField
                        sx={{ml: 1}}
                        margin="dense"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        helperText='XXX-XXX-XXXX'
                        name="phone_number"
                        autoComplete="phone_number"
                        autoFocus
                    />
                </Box>
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create account
                </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

Login.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}