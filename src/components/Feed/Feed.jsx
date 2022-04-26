import React, {useContext, useEffect, useState} from 'react';
import {Box, Skeleton, Stack} from "@mui/material";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import {getAllPosts} from "../../api/postService.js";

const Feed = () => {

    const {store} = useContext(Context)

    const [loading, setLoading] = useState(false)

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
            <CreatePost reload={reload} setReload={setReload}/>
            {loading ? (
                <Stack spacing={1} sx={{ml:5}}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            ) : (
                <>
                    {posts.map(post => (
                        <Post post={post} reload={reload} setReload={setReload} key={post._id}/>
                    ))}
                </>
            )}
        </Box>
    );
};

export default observer(Feed);