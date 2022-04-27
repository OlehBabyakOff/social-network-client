import React, {useEffect, useState} from 'react';
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
import {getAllPosts, getMyPosts} from "../../api/postService";
import {Link} from "react-router-dom";

const ProfileBodyRight = () => {
    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await getMyPosts()
            setPosts(fetchedPosts.data)
        }
        fetchData()
    }, [reload])

    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-around" sx={{mr:2}}>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/friends`}>
                            <ListItemButton sx={{maxWidth: 250}} component="a">
                                <ListItemIcon>
                                    <PersonOutlineOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Друзі" />
                                <Typography variant="span">10</Typography>
                            </ListItemButton>
                        </Link>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/groups`}>
                            <ListItemButton sx={{maxWidth: 250}} component="a">
                                <ListItemIcon>
                                    <GroupsOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Спільноти" />
                                <Typography variant="span">10</Typography>
                            </ListItemButton>
                        </Link>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 250 }} to={`/gallery`}>
                            <ListItemButton sx={{maxWidth: 250}} component="a">
                                <ListItemIcon>
                                    <CollectionsOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Галерея" />
                                <Typography variant="span">10</Typography>
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