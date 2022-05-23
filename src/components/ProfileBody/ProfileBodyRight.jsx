import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup, Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {CollectionsOutlined, GroupsOutlined, Home, Image, PersonOutlineOutlined, Room} from "@mui/icons-material";
import CreatePostProfile from "../CreatePost/CreatePostProfile";
import PostProfile from "../Post/PostProfile";
import {observer} from "mobx-react-lite";
import {getMyPosts} from "../../api/postService";
import {Link} from "react-router-dom";
import {getFollowingsService, getGallery} from "../../api/userService";
import {Context} from "../../index.js";
import {getMyGroupsService} from "../../api/groupService";

const ProfileBodyRight = () => {

    const {store} = useContext(Context)

    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState(false)
    const [followings, setFollowings] = useState(0)
    const [groups, setGroups] = useState(0)
    const [gallery, setGallery] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await getMyPosts()
            setPosts(fetchedPosts.data)
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
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-around" sx={{mr:2}}>
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

            <CreatePostProfile reload={reload} setReload={setReload}/>
                {posts.map(post => (
                    <PostProfile post={post} key={post._id} reload={reload} setReload={setReload}/>
                ))}
        </Box>
    );
};

export default observer(ProfileBodyRight);