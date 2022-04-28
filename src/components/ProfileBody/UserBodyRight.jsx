import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup, CircularProgress, Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {
    CollectionsOutlined, ForwardToInboxOutlined,
    GroupsOutlined,
    Image,
    PersonAddAltOutlined,
    PersonOutlineOutlined, PersonRemoveAlt1Outlined,
    Room
} from "@mui/icons-material";
import PostUser from "../Post/PostUser";
import {observer} from "mobx-react-lite";
import {followUserService} from "../../api/userService";
import {Context} from "../../index.js";

const UserBodyRight = ({user, userPosts, reload, setReload, followings}) => {

    const {store} = useContext(Context)

    const [isFollowed, setIsFollowed] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        followings.filter(followed => followed.followedId === user._id && followed.followerId === store.user._id ? setIsFollowed(true) : setIsFollowed(false))
        setLoading(false)
    }, [])

    const followUser = async (id) => {
        await followUserService(id)
        setIsFollowed(!isFollowed)
    }

    return (
        loading ? <CircularProgress/> :
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{mr:2, mb: 1}}>
                        {isFollowed ?
                            <Button onClick={() => followUser(user._id)}><PersonRemoveAlt1Outlined sx={{mr: 1}}/> Відписатися</Button>
                            :
                            <Button onClick={() => followUser(user._id)}><PersonAddAltOutlined sx={{mr: 1}}/> Підписатися</Button>
                        }

                        <Button><ForwardToInboxOutlined sx={{mr: 1}}/> Повідомлення</Button>
                    </Stack>
                </List>
            </Box>

            <Divider/>

            {userPosts.map(post =>
                (<PostUser post={post} reload={reload} setReload={setReload} key={post._id}/>)
            )}
        </Box>
    );
};

export default observer(UserBodyRight);