import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {AccountBox, Image, Link} from "@mui/icons-material";
import {getUser, updateAvatarService, updateBgService, updateInfoService} from "../../api/userService";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

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

    useEffect(() => {
        const fetchData = async () => {
            const fetchUser = await getUser(store.user._id)
            setEmail(fetchUser.data.email)
            setUsername(fetchUser.data.username)
            setFirstName(fetchUser.data.first_name)
            setSecondName(fetchUser.data.second_name)
            setPhone(fetchUser.data.phone)
            setBirthday(fetchUser.data.birthday)
        }
        fetchData()
    }, [])

    const updateInfo = async (email, username, first_name, second_name, phone, birthday) => {
        await updateInfoService(email, username, first_name, second_name, phone, birthday)
        setEmail(email)
        setUsername(username)
        setFirstName(first_name)
        setSecondName(second_name)
        setPhone(phone)
        setBirthday(birthday)
    }

    const updateAvatar = async (avatar) => {
        const fd = new FormData
        fd.append('avatar', avatar)
        await updateAvatarService(fd)
        setAvatar(null)
    }

    const updateBg = async (background) => {
        const fd = new FormData
        fd.append('background', background)
        await updateBgService(fd)
        setBg(null)
    }

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
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
                    }}
                />
                <label htmlFor="raised-button-file1">
                    <Button variant="raised" component="span" sx={{width: 200, height: 200}}>
                        <AccountBox color="primary" sx={{width: 200, height: 200}}/>
                    </Button>
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
                    }}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" sx={{width: 200, height: 200}}>
                        <Image color="primary" sx={{width: 200, height: 200}}/>
                    </Button>
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
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Номер телефону"
                    name="phone"
                    autoComplete="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Дата народження"
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