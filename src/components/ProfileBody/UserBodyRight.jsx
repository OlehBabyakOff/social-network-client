import React, {useEffect} from 'react';
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
    CollectionsOutlined, ForwardToInboxOutlined,
    GroupsOutlined,
    Image,
    PersonAddAltOutlined,
    PersonOutlineOutlined,
    Room
} from "@mui/icons-material";
import PostUser from "../Post/PostUser";
import {observer} from "mobx-react-lite";

const UserBodyRight = ({user, userPosts, reload, setReload}) => {

    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{mr:2, mb: 1}}>
                        <Button><PersonAddAltOutlined sx={{mr: 1}}/> Підписатися</Button>

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