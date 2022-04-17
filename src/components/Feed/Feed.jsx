import React, {useState} from 'react';
import {Box, Skeleton, Stack} from "@mui/material";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

const Feed = () => {

    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, [3000]);

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            {loading ? (
                <Stack spacing={1} sx={{ml:5}}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            ) : (
                <>
                    <CreatePost/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </>
            )}
        </Box>
    );
};

export default Feed;