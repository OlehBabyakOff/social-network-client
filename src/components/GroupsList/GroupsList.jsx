import React, {useContext, useState} from 'react';
import {
    Avatar,
    Box,
    Button, CardMedia,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton, Menu, MenuItem, Stack, Tab, TextField,
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
                            onChange={e => setAvatar(e.target.files[0])}
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
                            onChange={e => setBg(e.target.files[0])}
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