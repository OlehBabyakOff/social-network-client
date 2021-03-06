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
import {Link, useHistory, useParams} from "react-router-dom";
import {followUserService, getFollowingsService, getReportsService, getUser} from "../../api/userService";
import {getUserPosts} from "../../api/postService";
import {Context} from "../../index.js";
import {
    CakeOutlined, CelebrationOutlined,
    ForwardToInboxOutlined,
    PersonAddAltOutlined,
    PersonRemoveAlt1Outlined,
    Verified
} from "@mui/icons-material";
import ReportModal from "../Modals/ReportModal";
import {Alert} from "@mui/lab";
import {createConversationService} from "../../api/chatService";
import AlertMain from "../Alert/Alert";

const UserProfile = () => {

    const {userId} = useParams()
    const {store} = useContext(Context)
    const history = useHistory()

    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)
    const [isFollowed, setIsFollowed] = useState(null)
    const [isReported, setIsReported] = useState(false)
    const [isBirthday, setIsBirthday] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (store.user._id === userId) {
                history.push('/me')
            }
            const fetchUser = await getUser(userId)
            setUser(fetchUser.data)
            const fetchPosts = await getUserPosts(userId)
            setUserPosts(fetchPosts.data)
            const fetchFollowings = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowings.data)
            const fetchReports = await getReportsService(fetchUser.data._id)
            fetchFollowings.data.find(followed => followed.followedId === fetchUser.data._id && followed.followerId === store.user._id ? setIsFollowed(true) : setIsFollowed(false))
            fetchReports.data.find(report => report.reporterId === store?.user._id ? setIsReported(true) : setIsReported(false))
            await birthdayCheck(fetchUser.data.birthday)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const followUser = async (id) => {
        await followUserService(id)
        setIsFollowed(!isFollowed)
    }

    const createChat = async (userId) => {
        const chat = await createConversationService(userId)
        history.push(`/chat/${chat.data._id}`)
    }

    const birthdayCheck = (birthday) => {
        new Date().toLocaleDateString('ua-Ua', { month:"numeric", day:"numeric"}) === new Date(birthday).toLocaleDateString('ua-Ua', { month:"numeric", day:"numeric"}) ? setIsBirthday(true) : setIsBirthday(false)
    }

    return (
        loading ? null :
            <Box flex={10}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`data:buffer;base64,${user.background}`}
                    alt="????????"
                />
                <CardMedia
                    component="img"
                    sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                    image={`data:buffer;base64,${user.avatar}`}
                    alt="????????????"
                />
                <CardContent>
                    <Typography variant="h5" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500}}>
                        <Stack direction='row'>
                            {`${user.second_name} ${user.first_name}`} {user.roles.isAdmin ? <Verified sx={{mt: 0.5, ml: 1}} color='info'/> : null}
                        </Stack>

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
                               user.roles.isBlocked ?
                                   <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)} disabled>
                                       <ListItemIcon>
                                           <PersonRemoveAlt1Outlined />
                                       </ListItemIcon>
                                       <ListItemText primary="??????????????????????" />
                                   </ListItemButton>
                                   :
                               <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)}>
                                   <ListItemIcon>
                                       <PersonRemoveAlt1Outlined />
                                   </ListItemIcon>
                                   <ListItemText primary="??????????????????????" />
                               </ListItemButton>
                               :
                               user.roles.isBlocked ?
                                       <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)} disabled>
                                           <ListItemIcon>
                                               <PersonAddAltOutlined />
                                           </ListItemIcon>
                                           <ListItemText primary="??????????????????????" />
                                       </ListItemButton>
                                    :
                                       <ListItemButton sx={{maxWidth: 250}} onClick={() => followUser(user._id)}>
                                           <ListItemIcon>
                                               <PersonAddAltOutlined />
                                           </ListItemIcon>
                                           <ListItemText primary="??????????????????????" />
                                       </ListItemButton>
                           }
                           {user.roles.isBlocked ?
                               <ListItemButton sx={{maxWidth: 250, mr: 5}} onClick={() => createChat(user._id)} disabled>
                                   <ListItemIcon>
                                       <ForwardToInboxOutlined />
                                   </ListItemIcon>
                                   <ListItemText primary="????????????????????????" />
                               </ListItemButton>
                               :
                               <ListItemButton sx={{maxWidth: 250, mr: 5}} onClick={() => createChat(user._id)}>
                                   <ListItemIcon>
                                       <ForwardToInboxOutlined />
                                   </ListItemIcon>
                                   <ListItemText primary="????????????????????????" />
                               </ListItemButton>
                           }
                           <ReportModal user={user} isReported={isReported} setIsReported={setIsReported}/>
                       </Stack>
                   </List>
                </Box>
                <Divider/>
                {store.errors.length > 0 ? <AlertMain width={'98%'} position={'relative'}/> : null}
                {isBirthday ?  <Alert icon={<CelebrationOutlined fontSize="inherit" />} severity="info">?? ?????????????????????? {`${user.second_name} ${user.first_name}`} ???????????????? ???????? ????????????????????!</Alert> : null}
                {user.roles.isBlocked ?
                    <Alert severity="error">???????????? ?????????????????????? {`${user.second_name} ${user.first_name}`} - ??????????????????????</Alert>
                    :
                    !user.roles.isActivated ?
                        <>
                            <Alert severity="warning">????????????????, ???????????? ?????????????????????? {`${user.second_name} ${user.first_name}`} - ???? ??????????????????????</Alert>
                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                <UserBodyLeft user={user}/>
                                <UserBodyRight user={user} userPosts={userPosts} reload={reload} setReload={setReload} followings={followings}/>
                            </Stack>
                        </>
                        :
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <UserBodyLeft user={user}/>
                    <UserBodyRight user={user} userPosts={userPosts} reload={reload} setReload={setReload} followings={followings}/>
                </Stack>}
            </Box>
    );
};

export default UserProfile;