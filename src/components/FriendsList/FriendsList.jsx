import React, {useEffect, useState} from 'react';
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
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {EmailOutlined, MoreVert} from "@mui/icons-material";
import FriendSearch from "../Search/FriendSearch";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {followUserService} from "../../api/userService";

const FriendsList = ({followers, followings, loading, users, value, setValue, isDisabled, searchedUsers, reload, setReload}) => {

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

                            <FriendSearch users={followings}/>

                            {loading ? null :

                            <List dense sx={{width: '100%', maxWidth: 900, mt: 3, bgcolor: 'background.paper'}}>

                                {followings.map(followed => {
                                    const user = users.find(user => user._id === followed.followedId)
                                    return (
                                        <ListItem key={user._id} sx={{lineHeight: 2, background: "#f9fafb"}}
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
                                                <EmailOutlined sx={{width: 25, height: 25}}/>
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
                                    )
                                })}
                            </List> }
                        </TabPanel>

                        <TabPanel value="Subscribers">

                            <FriendSearch users={followers}/>

                            {loading ? null :

                            <List dense sx={{width: '100%', maxWidth: 900, mt: 3,  bgcolor: 'background.paper'}}>

                                {followers.map(follower => {
                                    const user = users.find(user => user._id === follower.followerId)
                                    return (
                                        <ListItem key={user._id} sx={{lineHeight: 2, background: "#f9fafb"}}
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
                                                <EmailOutlined sx={{width: 25, height: 25}}/>
                                            </Button>
                                        </ListItem>
                                    )
                                })}
                            </List> }
                        </TabPanel>

                        <TabPanel value="Search">

                            <FriendSearch/>

                            {loading ? null :

                                <List dense sx={{width: '100%', maxWidth: 900, mt: 3, bgcolor: 'background.paper'}}>

                                {searchedUsers?.map(user => (
                                        <ListItem key={user._id} sx={{lineHeight: 2, background: "#f9fafb"}}
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
                                                <EmailOutlined sx={{width: 25, height: 25}}/>
                                            </Button>
                                        </ListItem>
                                ))}

                            </List> }
                        </TabPanel>
                </Box>
            </TabContext>

        </>
    );
};

export default observer(FriendsList);