import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    AvatarGroup,
    Box, Button, CircularProgress, Divider, IconButton,
    ImageList,
    ImageListItem, List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {observer} from "mobx-react-lite";
import {getFollowingsService, getLimitedUsers} from "../../api/userService";
import {Link} from "react-router-dom";
import {Context} from "../../index.js";
import {ForwardToInboxOutlined} from "@mui/icons-material";

const Rightbar = () => {

    const {store} = useContext(Context)

    const [users, setUsers] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchUsers = await getLimitedUsers()
            setUsers(fetchUsers.data)
            const fetchFollowings = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowings.data)
        }
        fetchData().then(() => setLoading(false))
    }, [])

    return (
        loading ? <CircularProgress/> :
        <Box flex={1.5} p="20px 46px" pl={0} sx={{ display: { xs: "none", sm: "block" }}}>
            <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                <Typography variant="h6" fontWeight={300}>
                    Знайомтесь з новими людьми
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    {users.map(user => (
                        <ListItem key={user._id}
                                  secondaryAction={
                                      <Button><ForwardToInboxOutlined/></Button>
                                  }
                                  disablePadding
                        >
                            <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/user/${user._id}`}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={`data:buffer;base64,${user.avatar}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${user.second_name} ${user.first_name}`} />
                                </ListItemButton>
                            </Link>
                        </ListItem>))}
                </List>

                <Divider/>

                <Typography variant="h6" fontWeight={300} sx={{mt:3}}>
                    Вступайте до спільнот
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
        </Box>
    );
};

export default observer(Rightbar);