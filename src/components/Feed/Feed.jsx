import React, {useContext, useEffect, useState} from 'react';
import {Box, Skeleton, Stack} from "@mui/material";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import {getAllPosts} from "../../api/postService.js";
import AlertMain from "../Alert/Alert";

const Feed = () => {

    const {store} = useContext(Context)

    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await getAllPosts()
            setPosts(fetchedPosts.data)
        }
        fetchData()
    }, [reload])

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            {store.errors.length > 0 ? <AlertMain width={'97%'} position={'relative'}/> : null}
            <CreatePost reload={reload} setReload={setReload}/>
                <>
                    {posts.map(post => (
                        <Post post={post} reload={reload} setReload={setReload} key={post._id}/>
                    ))}
                </>
        </Box>
    );
};

export default observer(Feed);