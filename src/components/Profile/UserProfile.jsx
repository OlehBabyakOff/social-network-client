import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItemButton,
    ListItemIcon, ListItemText,
    Stack,
    Typography
} from "@mui/material";
import UserBodyLeft from "../ProfileBody/UserBodyLeft";
import UserBodyRight from "../ProfileBody/UserBodyRight";
import {Link, useParams} from "react-router-dom";
import {followUserService, getFollowingsService, getReportsService, getUser} from "../../api/userService";
import {getUserPosts} from "../../api/postService";
import {Context} from "../../index.js";
import {ForwardToInboxOutlined, PersonAddAltOutlined, PersonRemoveAlt1Outlined} from "@mui/icons-material";
import ReportModal from "../Modals/ReportModal";

const UserProfile = () => {

    const {userId} = useParams()
    const {store} = useContext(Context)

    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)
    const [isFollowed, setIsFollowed] = useState(null)
    const [isReported, setIsReported] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchUser = await getUser(userId)
            setUser(fetchUser.data)
            const fetchPosts = await getUserPosts(userId)
            setUserPosts(fetchPosts.data)
            const fetchFollowings = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowings.data)
            const fetchReports = await getReportsService(fetchUser.data._id)
            fetchFollowings.data.filter(followed => followed.followedId === fetchUser.data._id && followed.followerId === store.user._id ? setIsFollowed(true) : setIsFollowed(false))
            fetchReports.data.find(report => report.reporterId === store?.user._id ? setIsReported(true) : setIsReported(false))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const followUser = async (id) => {
        await followUserService(id)
        setIsFollowed(!isFollowed)
    }

    return (
        loading ? null :
            <Box flex={10}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`data:buffer;base64,${user.background}`}
                    alt="Фото"
                />
                <CardMedia
                    component="img"
                    sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                    image={`data:buffer;base64,${user.avatar}`}
                    alt="Аватар"
                />
                <CardContent>
                    <Typography variant="h5" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500}}>
                        {`${user.second_name} ${user.first_name}`}
                    </Typography>
                    <Typography variant="h6" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 400}}>
                        @{user.username}
                    </Typography>
                </CardContent>
                <Divider/>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                   <List component="nav" aria-label="main mailbox folders">
                       <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{marginX: 20}}>
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
                               <ListItemButton sx={{maxWidth: 250, mr: 5}}>
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
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <UserBodyLeft user={user}/>
                    <UserBodyRight user={user} userPosts={userPosts} reload={reload} setReload={setReload} followings={followings}/>
                </Stack>
            </Box>
    );
};

export default UserProfile;