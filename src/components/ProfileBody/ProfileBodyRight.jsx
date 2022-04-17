import React from 'react';
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
import {CollectionsOutlined, GroupsOutlined, Image, PersonOutlineOutlined, Room} from "@mui/icons-material";
import CreatePostProfile from "../CreatePost/CreatePostProfile";
import PostProfile from "../Post/PostProfile";

const ProfileBodyRight = () => {
    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-around" sx={{mr:2}}>
                        <ListItemButton sx={{maxWidth: 250}} component="a" href="/friends">
                            <ListItemIcon>
                                <PersonOutlineOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Друзі" />
                            <Typography variant="span">10</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{maxWidth: 250}} component="a" href="/groups">
                            <ListItemIcon>
                                <GroupsOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Спільноти" />
                            <Typography variant="span">10</Typography>
                        </ListItemButton>
                        <ListItemButton sx={{maxWidth: 250}} component="a" href="/gallery">
                            <ListItemIcon>
                                <CollectionsOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Галерея" />
                            <Typography variant="span">10</Typography>
                        </ListItemButton>
                    </Stack>
                </List>
            </Box>

            <Divider/>

            <CreatePostProfile/>
            <PostProfile/>
            <PostProfile/>
            <PostProfile/>
            <PostProfile/>


        </Box>
    );
};

export default ProfileBodyRight;