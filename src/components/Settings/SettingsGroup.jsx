import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {Image, Link} from "@mui/icons-material";
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

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroup = await getGroupService(groupId)
            setTitle(fetchGroup.data.title)
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
        setAvatar(null)
    }

    const updateBg = async (groupId, background) => {
        const fd = new FormData
        fd.append('background', background)
        await updateGroupBgService(groupId, fd)
        setBg(null)
    }

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            <Typography component="h1" variant="h5">
                Налаштування спільноти
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file1"
                    multiple
                    type="file"
                    onChange={e => {
                        setAvatar(e.target.files[0])
                        updateAvatar(groupId, e.target.files[0])
                    }}
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
                    onChange={e => {
                        setBg(e.target.files[0])
                        updateBg(groupId, e.target.files[0])
                    }}
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