import React, {useContext, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    CssBaseline, FormControl,
    FormControlLabel,
    Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
    Paper,
    Popper,
    TextField,
    Typography
} from "@mui/material";
import {AccountBox, CheckCircleOutline, Image, Visibility, VisibilityOff} from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import AlertMain from "../../components/Alert/Alert";

const Registration = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const [doneAvatar, setDoneAvatar] = useState(false)
    const [doneBg, setDoneBg] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExit = (event) => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleExit2 = (event) => {
        setAnchorEl2(null);
    };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const id = open ? 'simple-popper' : undefined;
    const id2 = open2 ? 'simple-popper' : undefined;

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

    const [emailError, setErrorEmail] = useState(false)
    const [usernameError, setErrorUsername] = useState(false)
    const [passwordError, setErrorPassword] = useState(false)
    const [first_nameError, setErrorFirstName] = useState(false)
    const [second_nameError, setErrorSecondName] = useState(false)
    const [phoneError, setErrorPhone] = useState(false)
    const [birthdayError, setErrorBirthday] = useState(false)


    const registration = async (email, password, username, first_name, second_name, phone, birthday, avatarImg, backgroundImg) => {
        if (email && password && username && first_name && second_name && phone && birthday && avatarImg && backgroundImg) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                store.setErrors('Невірний формат електронної адреси')
                setErrorEmail(true)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(false)
            } else if (password.length <= 7) {
                store.setErrors('Пароль повинен містити не менше 8 символів')
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(true)
                setErrorFirstName(false)
                setErrorSecondName(false)
            } else if (username.length < 3) {
                store.setErrors('Логін повинен містити не менше 3 символів')
                setErrorEmail(false)
                setErrorUsername(true)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(false)
            } else if (first_name.length < 2) {
                store.setErrors('Ім`я повинно містити не менше 2 символів')
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(true)
                setErrorSecondName(false)
            } else if (second_name.length < 2) {
                store.setErrors('Прізвище повинно містити не менше 2 символів')
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(true)
            } else if (phone.length < 10 && phone.length > 13) {
                store.setErrors('Номер телефона повинен містити не менше 10 символів і не більше 13')
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(false)
            } else if (new Date() < new Date(birthday)) {
                store.setErrors('Ви не можете обрати дату, яка ще не настала, як дату свого народження')
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(false)
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
                setErrorEmail(false)
                setErrorUsername(false)
                setErrorPassword(false)
                setErrorFirstName(false)
                setErrorSecondName(false)
            }
        } else {
            store.clearErrors()
            store.setErrors('Дані не можуть бути порожніми')
            setErrorEmail(true)
            setErrorUsername(true)
            setErrorPassword(true)
            setErrorFirstName(true)
            setErrorSecondName(true)
        }
    }

    return (
            <Grid container component="main" sx={{ height: '100vh' }}>
                {store.errors.length > 0 ? <AlertMain width={'100%'} position={'absolute'}/> : null}
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
                                error={emailError}
                                inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Логін"
                                name="login"
                                autoComplete="login"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                error={usernameError}
                                inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="second_name"
                                label="Прізвище"
                                name="second_name"
                                autoComplete="second_name"
                                value={second_name}
                                onChange={e => setSecondName(e.target.value)}
                                error={second_nameError}
                                inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="Ім'я"
                                name="first_name"
                                autoComplete="first_name"
                                value={first_name}
                                onChange={e => setFirstName(e.target.value)}
                                error={first_nameError}
                                inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                            />
                            <PhoneInput
                                country={'ua'}
                                value={phone}
                                onChange={phone => setPhone(phone)}
                                inputStyle={{width: '720px', height: '50px', fontSize: '16px'}}
                                containerStyle={{margin: "10px 0"}}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Дата народження"
                                    inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                                    value={birthday || null}
                                    onChange={(newValue) => {
                                        setBirthday(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params}  margin="normal"
                                                                        required
                                                                        fullWidth/>}
                                />
                            </LocalizationProvider>
                            <FormControl sx={{ mt: 2, mb: 1}} variant="outlined" required fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    error={passwordError}
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

                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file1"
                                multiple
                                type="file"
                                onChange={e => {
                                    setAvatar(e.target.files[0])
                                    setDoneAvatar(true)
                                    handleExit()
                                }}
                            />
                            <label htmlFor="raised-button-file1">
                                <Button variant="raised" component="span" sx={{width: 50, height: 50}} onMouseEnter={handleClick} onMouseLeave={handleExit}>
                                    {doneAvatar ?
                                            <CheckCircleOutline color="primary" sx={{width: 50, height: 50}}/>
                                        :
                                            <AccountBox color="primary" sx={{width: 50, height: 50}}/>
                                    }
                                </Button>
                                <Popper id={id} open={open} anchorEl={anchorEl}>
                                    <Box sx={{p: 1, border: '1px solid', bgcolor: 'background.paper' }}>
                                        {avatar ? `Ваш аватар: ${avatar.name}` : `Ваш аватар`}
                                    </Box>
                                </Popper>
                            </label>

                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={e => {
                                    setBg(e.target.files[0])
                                    setDoneBg(true)
                                    handleExit2()
                                }}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span" sx={{width: 50, height: 50}} onMouseEnter={handleClick2} onMouseLeave={handleExit2}>
                                    {doneBg ?
                                        <CheckCircleOutline color="primary" sx={{width: 50, height: 50}}/>
                                    :
                                        <Image color="primary" sx={{width: 50, height: 50}}/>
                                    }
                                </Button>
                                <Popper id={id2} open={open2} anchorEl={anchorEl2}>
                                    <Box sx={{p: 1, border: '1px solid', bgcolor: 'background.paper' }}>
                                        {bg ? `Задній фон профілю: ${bg.name}` : `Задній фон профілю`}
                                    </Box>
                                </Popper>
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