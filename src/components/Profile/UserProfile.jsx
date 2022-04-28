import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, CardContent, CardMedia, Divider, Stack, Typography} from "@mui/material";
import UserBodyLeft from "../ProfileBody/UserBodyLeft";
import UserBodyRight from "../ProfileBody/UserBodyRight";
import {useParams} from "react-router-dom";
import {getFollowingsService, getUser} from "../../api/userService";
import {getUserPosts} from "../../api/postService";
import {Context} from "../../index.js";

const UserProfile = () => {

    const {userId} = useParams()
    const {store} = useContext(Context)

    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchUser = await getUser(userId)
            setUser(fetchUser.data)
            const fetchPosts = await getUserPosts(userId)
            setUserPosts(fetchPosts.data)
            const fetchFollowings = await getFollowingsService(store.user._id)
            setFollowings(fetchFollowings.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    return (
        loading ? null :
            (<Box flex={10}>
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
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <UserBodyLeft user={user}/>
                    <UserBodyRight user={user} userPosts={userPosts} reload={reload} setReload={setReload} followings={followings}/>
                </Stack>
            </Box>)
    );
};

export default UserProfile;