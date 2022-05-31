import React, {useContext, useEffect, useState} from 'react';
import {
    Box, CardContent, CardMedia, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography
} from "@mui/material";
import ProfileBodyLeft from "../ProfileBody/ProfileBodyLeft";
import ProfileBodyRight from "../ProfileBody/ProfileBodyRight";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {CollectionsOutlined, GroupsOutlined, PersonOutlineOutlined} from "@mui/icons-material";
import {getFollowingsService, getGallery} from "../../api/userService";
import {getMyGroupsService} from "../../api/groupService";
import {Alert} from "@mui/lab";

const Profile = () => {

    const {store} = useContext(Context)

    const [followings, setFollowings] = useState(0)
    const [groups, setGroups] = useState(0)
    const [gallery, setGallery] = useState(0)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchFollowers = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowers.data.length)
            const fetchMyGroups = await getMyGroupsService()
            setGroups(fetchMyGroups.data.length)
            const fetchGallery = await getGallery(store.user._id)
            setGallery(fetchGallery.data.length)
        }
        fetchData()
    }, [reload])

    return (
        <Box flex={10}>
            <CardMedia
                component="img"
                height="400"
                image={`data:buffer;base64,${store.user.background}`}
                alt="Paella dish"
            />
            <CardMedia
                component="img"
                sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                image={`data:buffer;base64,${store.user.avatar}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h5" sx={{display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500}}>
                    {`${store.user.second_name} ${store.user.first_name}`}
                </Typography>
                <Typography variant="h6" sx={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 400}}>
                    @{store.user.username}
                </Typography>
            </CardContent>
            <Divider/>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-around" sx={{marginX: 20}}>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/friends`}>
                            <ListItemButton sx={{maxWidth: 250}}>
                                <ListItemIcon>
                                    <PersonOutlineOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Підписки" />
                                <Typography variant="span">{followings}</Typography>
                            </ListItemButton>
                        </Link>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/groups`}>
                            <ListItemButton sx={{maxWidth: 250}}>
                                <ListItemIcon>
                                    <GroupsOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Спільноти" />
                                <Typography variant="span">{groups}</Typography>
                            </ListItemButton>
                        </Link>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/gallery`}>
                            <ListItemButton sx={{maxWidth: 250}}>
                                <ListItemIcon>
                                    <CollectionsOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Галерея" />
                                <Typography variant="span">{gallery}</Typography>
                            </ListItemButton>
                        </Link>
                    </Stack>
                </List>
            </Box>
            <Divider/>
            {!store.user.roles.isActivated ?
                <>
                    <Alert severity="warning">Увага, ваш акаунт не підтверджено. Ви не зможете користуватися усім функціоналом сайту. Щоб активувати акаунт - перейдіть за посиланням відправленим вам на пошту при реєстрації.</Alert>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <ProfileBodyLeft/>
                        <ProfileBodyRight reload={reload} setReload={setReload}/>
                    </Stack>
                </>
                :
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <ProfileBodyLeft/>
                    <ProfileBodyRight reload={reload} setReload={setReload}/>
                </Stack>}
        </Box>
    );
};

export default observer(Profile);