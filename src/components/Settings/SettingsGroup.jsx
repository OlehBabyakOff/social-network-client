import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, CardMedia, Grid, Popper, TextField, Typography} from "@mui/material";
import {AccountBox, Image, Link} from "@mui/icons-material";
import {getUser, updateAvatarService, updateBgService, updateInfoService} from "../../api/userService";
import {Context} from "../../index";
import {useHistory, useParams} from "react-router-dom";
import {
    getGroupService,
    updateGroupAvatarService,
    updateGroupBgService,
    updateGroupInfoService
} from "../../api/groupService";

const SettingsGroup = () => {

    const {store} = useContext(Context)
    const {groupId} = useParams()

    const [title, setTitle] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [bg, setBg] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroup = await getGroupService(groupId)
            setTitle(fetchGroup.data.title)
            setAvatar(fetchGroup.data.avatar)
            setBg(fetchGroup.data.background)
        }
        fetchData()
    }, [])

    const updateInfo = async (groupId, title) => {
        await updateGroupInfoService(groupId, title)
        setTitle(title)
    }

    const updateAvatar = async (groupId, avatar) => {
        const fd = new FormData
        fd.append('avatar', avatar)
        await updateGroupAvatarService(groupId, fd)
    }

    const updateBg = async (groupId, background) => {
        const fd = new FormData
        fd.append('background', background)
        await updateGroupBgService(groupId, fd)
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
            <Typography component="h1" variant="h5">
                Налаштування спільноти
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
                        updateAvatar(groupId, e.target.files[0])
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
                            Аватар спільноти
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
                        updateBg(groupId, e.target.files[0])
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
                            Задній фон спільноти
                        </Box>
                    </Popper>
                </label>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Назва"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    inputProps={{style: {WebkitBoxShadow: "0 0 0 1000px white inset"}}}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => {
                        updateInfo(groupId, title)
                    }}
                >
                    Змінити дані
                </Button>
            </Box>
        </Box>
    );
};

export default SettingsGroup;