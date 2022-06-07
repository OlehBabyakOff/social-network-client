import React, {useEffect, useState} from 'react';
import {
    Box
} from "@mui/material";
import CreatePostProfile from "../CreatePost/CreatePostProfile";
import {observer} from "mobx-react-lite";
import {getMyPosts} from "../../api/postService";
import Post from "../Post/Post";

const ProfileBodyRight = ({reload, setReload}) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await getMyPosts()
            setPosts(fetchedPosts.data)
        }
        fetchData()
    }, [reload])

    return (
        <Box flex={6} p={{ xs: 0, md: 2 }}>
            <CreatePostProfile reload={reload} setReload={setReload}/>
                {posts.map(post => (
                    <Post post={post} key={post._id} reload={reload} setReload={setReload} style={{ margin: 5, mt: 0, width: "85%", ml:12, background: "#f9fafb" }}/>
                ))}
        </Box>
    );
};

export default observer(ProfileBodyRight);