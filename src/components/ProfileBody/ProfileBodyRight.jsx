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

const ProfileBodyRight = ({reload, setReload}) => {

    const {store} = useContext(Context)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await getMyPosts()
            setPosts(fetchedPosts.data)
        }
        fetchData()
    }, [reload])

    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <CreatePostProfile reload={reload} setReload={setReload}/>
                {posts.map(post => (
                    <PostProfile post={post} key={post._id} reload={reload} setReload={setReload}/>
                ))}
        </Box>
    );
};

export default observer(ProfileBodyRight);