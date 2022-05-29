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

const UserBodyRight = ({user, userPosts, reload, setReload, followings}) => {

    const {store} = useContext(Context)

    const [isFollowed, setIsFollowed] = useState(null)
    const [isReported, setIsReported] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchReports = await getReportsService(user._id)
            followings.filter(followed => followed.followedId === user._id && followed.followerId === store.user._id ? setIsFollowed(true) : setIsFollowed(false))
            fetchReports.data.find(report => report.reporterId === store?.user._id ? setIsReported(true) : setIsReported(false))
        }
        fetchData().then(() => setLoading(false))
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
                            <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)}>
                                <ListItemIcon>
                                    <PersonRemoveAlt1Outlined />
                                </ListItemIcon>
                                <ListItemText primary="Відписатися" />
                            </ListItemButton>
                            :
                            <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)}>
                                <ListItemIcon>
                                    <PersonAddAltOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Підписатися" />
                            </ListItemButton>
                        }

                        <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/chat/${user._id}`}>
                            <ListItemButton sx={{maxWidth: 250, mr: 5}} onClick={() => followUser(user._id)}>
                                <ListItemIcon>
                                    <ForwardToInboxOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Повідомлення" />
                            </ListItemButton>
                        </Link>
                        <ReportModal user={user} isReported={isReported} setIsReported={setIsReported}/>
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