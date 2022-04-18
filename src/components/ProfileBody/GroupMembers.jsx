import React from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup, Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, Paper,
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
import InfoProfile from "../InfoProfile/InfoProfile";
import GaleryProfile from "../GaleryProfile/GaleryProfile";
import GroupMembersSearch from "../Search/GroupMembersSearch";
import GroupMembersList from "../GroupMembersList/GroupMembersList";

const GroupMembers = () => {
    return (
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
                    <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                        Учаники спільноти
                    </Typography>
                    <GroupMembersSearch/>

                    <GroupMembersList/>
                    <GroupMembersList/>
                    <GroupMembersList/>
                    <GroupMembersList/>


                </Paper>
            </Box>
        </Box>
    );
};

export default GroupMembers;