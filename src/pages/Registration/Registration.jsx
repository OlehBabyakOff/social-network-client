import React, {useContext, useState} from 'react';
import {Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";

const Registration = () => {

    const {store} = useContext(Context)

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [second_name, setSecondName] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [bg, setBg] = useState(null)

    const registration = async (email, password, username, first_name, second_name, phone, birthday, avatarImg, backgroundImg) => {
        if (email && password && username && first_name && second_name && phone && birthday && avatarImg && backgroundImg) {
            if (!email.includes('@')) {
                store.setErrors('Невірний формат електронної адреси')
            } else if (password.length <= 5) {
                store.setErrors('Пароль повинен містити не менше 6 символів')
            } else if (username.length < 3) {
                store.setErrors('Логін повинен містити не менше 3 символів')
            } else if (first_name.length < 2) {
                store.setErrors('Ім`я повинно містити не менше 2 символів')
            } else if (second_name.length < 2) {
                store.setErrors('Прізвище повинно містити не менше 2 символів')
            } else if (phone.length < 8) {
                store.setErrors('Номер телефона повинен містити не менше 8 символів')
            } else {
                const data = new FormData()
                data.append('email', email)
                data.append('password', password)
                data.append('username', username)
                data.append('first_name', first_name)
                data.append('second_name', second_name)
                data.append('phone', phone)
                data.append('birthday', birthday)
                data.append('avatar', avatarImg)
                data.append('background', backgroundImg)
                await store.registration(data)
                history.push("/")
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
                        backgroundImage: 'url(https://businessman.ru/static/img/a/46193/398624/67036.jpg)',
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
                            Реєстрація
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
                                id="login"
                                label="Логін"
                                name="login"
                                autoComplete="login"
                                autoFocus
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="second_name"
                                label="Прізвище"
                                name="second_name"
                                autoComplete="second_name"
                                autoFocus
                                value={second_name}
                                onChange={e => setSecondName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="Ім'я"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                value={first_name}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Номер телефону"
                                name="phone"
                                autoComplete="phone"
                                autoFocus
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
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

                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file1"
                                multiple
                                type="file"
                                onChange={e => setAvatar(e.target.files[0])}
                            />
                            <label htmlFor="raised-button-file1">
                                <Button variant="raised" component="span">
                                    Аватар
                                    <Image color="secondary"/>
                                </Button>
                            </label>

                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={e => setBg(e.target.files[0])}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span">
                                    Фон
                                    <Image color="secondary"/>
                                </Button>
                            </label>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    registration(email, password, username, first_name, second_name, phone, birthday, avatar, bg)
                                }}
                            >
                                Зареєструватись
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/login`}>
                                        Вже є акаунт?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
        </Grid>
    );
};

export default observer(Registration);