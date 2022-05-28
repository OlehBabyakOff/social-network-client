import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getGroupPostsService, getGroupsService, getUsersService} from "../../api/adminService";

const DashboardGroups = () => {

    const [groups, setGroups] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchGroups = await getGroupsService()
            const fetchUsers = await getUsersService()
            const fetchGroupPosts = await getGroupPostsService()
            let groupArr = []
            let postsArr = []
            let posts = 0
            fetchGroups.data.map(group => {
                fetchGroupPosts.data.map(post => {
                    const userName = fetchUsers.data.find(user => user._id === post.userId)
                    const groupName = fetchGroups.data.find(group => group._id === post.groupId)
                    if (post.groupId === group._id) {
                     posts++
                    }
                    const postsDto = {
                        id: post._id,
                        creator: `${userName.second_name} ${userName.first_name}`,
                        group: groupName.title,
                        text: post.text,
                        likes: post.likes,
                        comments: post.comments
                    }
                    postsArr.push(postsDto)
                })
                const userName = fetchUsers.data.find(user => user._id === group.creatorId)
                const groupDto = {
                    id: group._id,
                    title: group.title,
                    creator: `${userName.second_name} ${userName.first_name}`,
                    admins: group.admins.length,
                    groupPosts: posts
                }
                groupArr.push(groupDto)
            })
            setGroups(groupArr)
            setPosts(postsArr)
        }
        fetchData()
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'title', headerName: 'Назва', width: 200 },
        { field: 'creator', headerName: 'Власник', width: 230 },
        { field: 'admins', headerName: 'Кількість адміністраторів', width: 200 },
        { field: 'groupPosts', headerName: 'Кількість постів', width: 200 },
    ];

    const columnsPosts = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'creator', headerName: 'Власник', width: 180 },
        { field: 'group', headerName: 'Спільнота', width: 180 },
        { field: 'text', headerName: 'Текст', width: 180 },
        { field: 'likes', headerName: 'Кількість лайків', width: 150 },
        { field: 'comments', headerName: 'Кількість комментарів', width: 180 },
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
                                Спільноти
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={groups}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" sx={{marginBottom: "10px"}}>
                                Пости спільнот
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={posts}
                                    columns={columnsPosts}
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

export default DashboardGroups;