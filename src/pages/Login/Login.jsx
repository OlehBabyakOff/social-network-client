import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CssBaseline, FormControl,
    Grid, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login = () => {

    const {store} = useContext(Context)

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = async (email, password) => {
        if (email && password) {
            if (!email.includes('@')) {
                store.setErrors('Невірний формат електронної адреси')
            } else if (password.length <= 5) {
                store.setErrors('Пароль повинен містити не менше 6 символів')
            } else {
                const data = new FormData()
                data.append('email', email)
                data.append('password', password)
                await store.login(data)
            }
        } else {
            store.clearErrors()
            store.setErrors('Дані не можуть бути порожніми')
        }
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://nmschoolbuildings.org/wp-content/uploads/sites/184/2022/04/34-3-scaled-1.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
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
                    <Typography component="h1" variant="h4" sx={{mb: 1}}>
                        Social Network
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Вхід
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Електронна адреса"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <FormControl sx={{ mt: 2, mb: 1}} variant="outlined" required fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => {
                                e.preventDefault()
                                login(email, password)
                            }}
                        >
                            Увійти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/registration`}>
                                    Ще не зареєстровані?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default observer(Login);