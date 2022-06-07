import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, CardMedia, Grid, Popper, TextField, Typography} from "@mui/material";
import {AccountBox, Image, Link} from "@mui/icons-material";
import {getUser, updateAvatarService, updateBgService, updateInfoService} from "../../api/userService";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import PhoneInput from "react-phone-input-2";
import AlertMain from "../Alert/Alert";

const SettingsUser = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [first_name, setFirstName] = useState("")
    const [second_name, setSecondName] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [bg, setBg] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchUser = await getUser(store.user._id)
            setEmail(fetchUser.data.email)
            setUsername(fetchUser.data.username)
            setFirstName(fetchUser.data.first_name)
            setSecondName(fetchUser.data.second_name)
            setPhone(fetchUser.data.phone)
            setBirthday(fetchUser.data.birthday)
            setAvatar(fetchUser.data.avatar)
            setBg(fetchUser.data.background)
        }
        fetchData()
    }, [])

    const updateInfo = async (email, username, first_name, second_name, phone, birthday) => {
        if (email && username && first_name && second_name && phone && birthday) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                store.setErrors('Невірний формат електронної адреси')
            } else if (username.length < 3) {
                store.setErrors('Логін повинен містити не менше 3 символів')
            } else if (first_name.length < 2) {
                store.setErrors('Ім`я повинно містити не менше 2 символів')
            } else if (second_name.length < 2) {
                store.setErrors('Прізвище повинно містити не менше 2 символів')
            } else if (phone.length < 10 && phone.length > 13) {
                store.setErrors('Номер телефона повинен містити не менше 10 символів і не більше 13')
            } else if (new Date() < new Date(birthday)) {
                store.setErrors('Ви не можете обрати дату, яка ще не настала, як дату свого народження')
            } else {
                await updateInfoService(email, username, first_name, second_name, phone, birthday)
                setEmail(email)
                setUsername(username)
                setFirstName(first_name)
                setSecondName(second_name)
                setPhone(phone)
                setBirthday(birthday)
            }
        } else {
            store.clearErrors()
            store.setErrors('Дані не можуть бути порожніми')
        }
    }

    const updateAvatar = async (avatar) => {
        const fd = new FormData
        fd.append('avatar', avatar)
        await updateAvatarService(fd)
    }

    const updateBg = async (background) => {
        const fd = new FormData
        fd.append('background', background)
        await updateBgService(fd)
    }

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

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            {store.errors.length > 0 ? <AlertMain width={'98%'} position={'relative'}/> : null}
            <Typography component="h1" variant="h5">
                Налаштування
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, textAlign: "center" }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file1"
                    multiple
                    type="file"
                    onChange={e => {
                        setAvatar(e.target.files[0])
                        updateAvatar(e.target.files[0])
                        handleExit()
                    }}
                />
                <label htmlFor="raised-button-file1">
                    <Button variant="raised" component="span" sx={{maxWidth: 400, width: 'auto', maxHeight: 200, height: 'auto', margin: 'auto'}}
                            onMouseEnter={handleClick} onMouseLeave={handleExit}>
                        {avatar ? <CardMedia
                            component="img"
                            height="200"
                            image={avatar.name ? URL.createObjectURL(avatar) : `data:buffer;base64,${avatar}`}
                            alt="Фото"
                        /> : <AccountBox color="primary" sx={{width: 200, height: 200}}/>}
                    </Button>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Box sx={{p: 1, border: '1px solid', bgcolor: 'background.paper' }}>
                            Ваш аватар
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
                        updateBg(e.target.files[0])
                        handleExit2()
                    }}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" sx={{maxWidth: 400, width: 'auto', maxHeight: 200, height: 'auto', margin: 'auto'}}
                            onMouseEnter={handleClick2} onMouseLeave={handleExit2}>
                        {bg ? <CardMedia
                            component="img"
                            height="200"
                            image={bg.name ? URL.createObjectURL(bg) : `data:buffer;base64,${bg}`}
                            alt="Фото"
                        /> : <AccountBox color="primary" sx={{width: 200, height: 200}}/>}
                    </Button>
                    <Popper id={id2} open={open2} anchorEl={anchorEl2}>
                        <Box sx={{p: 1, border: '1px solid', bgcolor: 'background.paper' }}>
                            Задній фон профілю
                        </Box>
                    </Popper>
                </label>

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
                    inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                />
                <PhoneInput
                    country={'ua'}
                    value={phone}
                    onChange={phone => setPhone(phone)}
                    inputStyle={{width: '1220px', height: '50px', fontSize: '16px'}}
                    containerStyle={{margin: "10px 0"}}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Дата народження"
                        inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                        value={birthday}
                        onChange={(newValue) => {
                            setBirthday(newValue);
                        }}
                        renderInput={(params) => <TextField {...params}  margin="normal"
                                                            required
                                                            fullWidth/>}
                    />
                </LocalizationProvider>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => {
                        updateInfo(email, username, first_name, second_name, phone, birthday)
                    }}
                >
                    Змінити дані
                </Button>
            </Box>
        </Box>
    );
};

export default SettingsUser;