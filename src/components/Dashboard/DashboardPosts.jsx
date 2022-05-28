import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getPostsService, getUsersService} from "../../api/adminService";

const DashboardPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchPosts = await getPostsService()
            const fetchUsers = await getUsersService()
            let postsArr = []
            fetchPosts.data.map(post => {
                const userName = fetchUsers.data.find(user => user._id === post.user)
                const postDto = {
                    id: post._id,
                    creator: `${userName.second_name} ${userName.first_name}`,
                    text: post.text,
                    likes: post.likes,
                    comments: post.comments
                }
                postsArr.push(postDto)
            })
            setPosts(postsArr)
        }
        fetchData()
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'creator', headerName: 'Власник', width: 200 },
        { field: 'text', headerName: 'Текст', width: 230 },
        { field: 'likes', headerName: 'Кількість лайків', width: 200 },
        { field: 'comments', headerName: 'Кількість комментарів', width: 200 },
    ];

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" sx={{marginBottom: "10px"}}>
                                Пости
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={posts}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPosts;