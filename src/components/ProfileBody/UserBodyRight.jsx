import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup, CircularProgress, Divider,
    List, ListItemButton, ListItemIcon, ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {
    CollectionsOutlined, ForwardToInboxOutlined,
    GroupsOutlined,
    Image,
    PersonAddAltOutlined,
    PersonOutlineOutlined, PersonRemoveAlt1Outlined, Report,
    Room
} from "@mui/icons-material";
import PostUser from "../Post/PostUser";
import {observer} from "mobx-react-lite";
import {followUserService, getReportsService, reportUserService} from "../../api/userService";
import {Context} from "../../index.js";
import ReportModal from "../Modals/ReportModal";
import {Link} from "react-router-dom";

const UserBodyRight = ({userPosts, reload, setReload}) => {

    const {store} = useContext(Context)

    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            {userPosts.map(post =>
                (<PostUser post={post} reload={reload} setReload={setReload} key={post._id}/>)
            )}
        </Box>
    );
};

export default observer(UserBodyRight);