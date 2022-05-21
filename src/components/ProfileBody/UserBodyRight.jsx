import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonGroup, CircularProgress, Divider,
    List,
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
                            <Button onClick={() => followUser(user._id)}><PersonRemoveAlt1Outlined sx={{mr: 1}}/> Відписатися</Button>
                            :
                            <Button onClick={() => followUser(user._id)}><PersonAddAltOutlined sx={{mr: 1}}/> Підписатися</Button>
                        }

                        <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/chat/${user._id}`}>
                            <Button><ForwardToInboxOutlined sx={{mr: 1}}/> Повідомлення</Button>
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