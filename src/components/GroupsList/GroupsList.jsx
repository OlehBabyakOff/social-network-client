import React, {useContext, useState} from 'react';
import {
    Avatar,
    Box,
    Button, CardMedia,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton, Menu, MenuItem, Popper, Stack, Tab, TextField,
    Typography
} from "@mui/material";
import {AccountBox, EmailOutlined, Image, MoreVert} from "@mui/icons-material";
import GroupSearch from "../Search/GroupSearch";
import {Skeleton, TabContext, TabList, TabPanel} from "@mui/lab";
import {createGroupService, deleteGroupService, subscribeGroupService} from "../../api/groupService";
import {Link, useHistory} from "react-router-dom";
import GroupItem from "./GroupItem";
import {Context} from "../../index";

const GroupsList = ({groups, setGroups, reload, setReload, loading, setLoading, value, setValue, isDisabled, setIsDisabled, searchedGroups, setSearchedGroups}) => {

    const {store} = useContext(Context)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [title, setTitle] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [bg, setBg] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const createGroup = async (title, avatarImg, backgroundImg) => {
        if (store.user.roles.isActivated) {
            const data = new FormData()
            data.append('title', title)
            data.append('avatar', avatarImg)
            data.append('background', backgroundImg)
            await createGroupService(data)
            setReload(!reload)
            setValue("Groups")
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете створювати спільноти, поки не підтвердите свій акаунт за посиланням на пошті!')
            setValue("Groups")
        }
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
        <TabContext value={value}>
            <Box flex={7} p={{xs: 0, md: 2, display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",}}>

                <TabList onChange={handleChange}>
                    <Tab label="Спільноти" value="Groups" />
                    <Tab label="Створити спільноту" value="CreateGroup" />
                    <Tab label="Пошук" value="Search" disabled={isDisabled}/>
                </TabList>

                <TabPanel value="Groups">

                    <List dense sx={{width: '100%', maxWidth: 900,  bgcolor: 'background.paper'}}>

                        {groups.map(group => {
                            if (loading) {
                                return <Skeleton variant="text" height={100} sx={{width: 890}}/>
                            } else {
                                return (
                                    <GroupItem group={group} reload={reload} setReload={setReload} key={group._id}/>
                                )
                            }})}
                    </List>
                </TabPanel>

                <TabPanel value="CreateGroup" sx={{width: "100%"}}>

                    <Box component="form" noValidate sx={{ mt: 1, textAlign: "center" }}>

                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file1"
                            multiple
                            type="file"
                            onChange={e => {
                                setAvatar(e.target.files[0])
                                handleExit()
                            }}
                        />
                        <label htmlFor="raised-button-file1">
                            <Button variant="raised" component="span" sx={{maxWidth: 400, width: 'auto', maxHeight: 200, height: 'auto', margin: 'auto'}}
                                    onMouseEnter={handleClick} onMouseLeave={handleExit}>
                                {avatar ? <CardMedia
                                    component="img"
                                    height="200"
                                    image={avatar.name ? URL.createObjectURL(avatar) : null}
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
                                handleExit2()
                            }}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" sx={{maxWidth: 400, width: 'auto', maxHeight: 200, height: 'auto', margin: 'auto'}}
                                    onMouseEnter={handleClick2} onMouseLeave={handleExit2}>
                                {bg ? <CardMedia
                                    component="img"
                                    height="200"
                                    image={bg.name ? URL.createObjectURL(bg) : null}
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
                            label="Назва спільноти"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => {
                                e.preventDefault()
                                createGroup(title, avatar, bg)
                            }}
                        >
                            Створити спільноту
                        </Button>
                    </Box>
                </TabPanel>

                <TabPanel value="Search">

                        <List dense sx={{width: '100%', maxWidth: 900, bgcolor: 'background.paper'}}>

                            {searchedGroups?.map(group => {
                                if (loading) {
                                    return <Skeleton variant="text" height={100} />
                                } else {
                                    return (
                                <ListItem sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                          disablePadding
                                >
                                    <Link style={{textDecoration: 'inherit', color: 'inherit', width: 1000}}
                                          to={`/group/${group._id}`}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar sx={{width: 60, height: 60}}
                                                        src={`data:buffer;base64,${group.avatar}`}
                                                />
                                            </ListItemAvatar>
                                            <Stack direction="column">
                                                <Typography variant="span" sx={{
                                                    fontWeight: 500,
                                                    ml: 2,
                                                    fontSize: 18
                                                }}>{group.title}</Typography>
                                            </Stack>
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                )}})}
                        </List>
                </TabPanel>

            </Box>
        </TabContext>
    );
};

export default GroupsList;