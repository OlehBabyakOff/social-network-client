import React, {useContext, useState} from 'react';
import {loginService} from "../../api/authService";
import {Box, Button, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link} from "@mui/icons-material";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const Login = () => {

    const {store} = useContext(Context)

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (email, password) => {
        if (email && password) {
            const data = new FormData()
            data.append('email', email)
            data.append('password', password)
            await store.login(data)
            history.push("/")
        } else {
            alert('Дані не можуть бути порожніми')
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
                    backgroundImage: 'url(https://source.unsplash.com/random)',
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

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
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default observer(Login);