import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
    Menu,
    MenuItem, Tab,
    Typography
} from "@mui/material";
import {Skeleton, TabContext, TabList, TabPanel} from '@mui/lab';
import {EmailOutlined, MoreVert} from "@mui/icons-material";
import FriendSearch from "../Search/FriendSearch";
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import {followUserService} from "../../api/userService";
import {createConversationService} from "../../api/chatService";
import {Context} from "../../index";

const FriendsList = ({followers, followings, loading, users, value, setValue, isDisabled, searchedUsers, reload, setReload}) => {

    const {store} = useContext(Context)
    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const unfollowUser = async (id) => {
        await followUserService(id)
        setReload(!reload)
    }

    const createChat = async (userId) => {
        const chat = await createConversationService(userId)
        history.push(`/chat/${chat.data._id}`)
    }

    return (
        <>
            <TabContext value={value}>
                <Box flex={7} p={{xs: 0, md: 2, display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", borderBottom: 1, borderColor: 'divider'}}>

                    <TabList onChange={handleChange}>
                        <Tab label="Мої підписки" value="Subscriptions" />
                        <Tab label="Мої підписники" value="Subscribers" />
                        <Tab label="Пошук" value="Search" disabled={isDisabled}/>
                    </TabList>

                        <TabPanel value="Subscriptions">

                            <List dense sx={{width: '100%', maxWidth: 900, bgcolor: 'background.paper'}}>

                                {followings.map(followed => {
                                    const user = users.find(user => user._id === followed.followedId)
                                    if (loading) {
                                        return <Skeleton variant="text" height={100} sx={{width: 890}} />
                                    } else {
                                        return (
                                                <ListItem key={user._id} sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                                          disablePadding
                                                >
                                                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/user/${user._id}`}>
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{width: 60, height: 60}}
                                                                        src={`data:buffer;base64,${user.avatar}`}
                                                                />
                                                            </ListItemAvatar>
                                                            <Typography variant="span" sx={{
                                                                fontWeight: 500,
                                                                ml: 2,
                                                                fontSize: 18
                                                            }}>{`${user.first_name} ${user.second_name}`}</Typography>
                                                        </ListItemButton>
                                                    </Link>

                                                    <Button>
                                                        <EmailOutlined sx={{width: 25, height: 25}} onClick={() => createChat(user._id)}/>
                                                    </Button>
                                                    <IconButton aria-label="settings">
                                                        <MoreVert id="basic-button"
                                                                  aria-controls={open ? 'basic-menu' : undefined}
                                                                  aria-haspopup="true"
                                                                  aria-expanded={open ? 'true' : undefined}
                                                                  onClick={handleClick}/>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => unfollowUser(user._id)}>Відписатися</MenuItem>
                                                        </Menu>
                                                    </IconButton>
                                                </ListItem>
                                        )}
                                })}
                            </List>
                        </TabPanel>

                        <TabPanel value="Subscribers">

                            <List dense sx={{width: '100%', maxWidth: 900,  bgcolor: 'background.paper'}}>

                                {followers.map(follower => {
                                    const user = users.find(user => user._id === follower.followerId)
                                    if (loading) {
                                        return <Skeleton variant="text" height={100} />
                                    } else {
                                        return (
                                            <ListItem key={user._id} sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                                      disablePadding
                                            >
                                                <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/user/${user._id}`}>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{width: 60, height: 60}}
                                                                    src={`data:buffer;base64,${user.avatar}`}
                                                            />
                                                        </ListItemAvatar>
                                                        <Typography variant="span" sx={{
                                                            fontWeight: 500,
                                                            ml: 2,
                                                            fontSize: 18
                                                        }}>{`${user.first_name} ${user.second_name}`}</Typography>
                                                    </ListItemButton>
                                                </Link>

                                                <Button>
                                                    <EmailOutlined sx={{width: 25, height: 25}} onClick={() => createChat(user._id)}/>
                                                </Button>
                                            </ListItem>
                                        )}
                                })}
                            </List>
                        </TabPanel>

                        <TabPanel value="Search">

                                <List dense sx={{width: '100%', maxWidth: 900, bgcolor: 'background.paper'}}>

                                {searchedUsers?.map(user => {
                                    if (loading) {
                                        return <Skeleton variant="text" height={100}/>
                                    } else {
                                        return (
                                            <ListItem key={user._id}
                                                      sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                                      disablePadding
                                            >
                                                <Link style={{textDecoration: 'inherit', color: 'inherit', width: 1000}}
                                                      to={`/user/${user._id}`}>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{width: 60, height: 60}}
                                                                    src={`data:buffer;base64,${user.avatar}`}
                                                            />
                                                        </ListItemAvatar>
                                                        <Typography variant="span" sx={{
                                                            fontWeight: 500,
                                                            ml: 2,
                                                            fontSize: 18
                                                        }}>{`${user.first_name} ${user.second_name}`}</Typography>
                                                    </ListItemButton>
                                                </Link>

                                                <Button>
                                                    <Link style={{
                                                        textDecoration: 'inherit',
                                                        color: 'inherit',
                                                        marginTop: "10px"
                                                    }} to={`/chat/${user._id}`}>
                                                        <EmailOutlined sx={{width: 25, height: 25}}/>
                                                    </Link>
                                                </Button>
                                            </ListItem>
                                        )
                                    }
                                })}
                            </List>
                        </TabPanel>
                </Box>
            </TabContext>

        </>
    );
};

export default observer(FriendsList);