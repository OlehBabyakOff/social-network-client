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
import {
    CollectionsOutlined, ForwardToInboxOutlined, GroupAddOutlined,
    GroupsOutlined,
    Image,
    PersonAddAltOutlined,
    PersonOutlineOutlined,
    Room
} from "@mui/icons-material";
import CreatePostProfile from "../CreatePost/CreatePostProfile";
import PostProfile from "../Post/PostProfile";
import PostUser from "../Post/PostUser";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import PostGroup from "../Post/PostGroup";

const GroupBody = () => {
    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{mb: 1}}>
                        <Button><GroupAddOutlined sx={{mr: 1}}/> Підписатися (14)</Button>

                        <Button><ForwardToInboxOutlined sx={{mr: 1}}/> Чат спільноти</Button>
                    </Stack>
                </List>
            </Box>

            <Divider/>

            <CreatePostGroup/>

            <PostGroup/>
            <PostGroup/>
            <PostGroup/>
            <PostGroup/>


        </Box>
    );
};

export default GroupBody;