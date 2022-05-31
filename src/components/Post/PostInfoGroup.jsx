import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {
    Avatar, Box, Breadcrumbs, Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox, CircularProgress, Divider, Grid,
    IconButton,
    Menu,
    MenuItem, Paper,
    Typography
} from "@mui/material";
import {ChatBubbleOutlineOutlined, Favorite, FavoriteBorder, MoreVert} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import Moment from "react-moment";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {
    deleteGroupPostService,
    getGroupPostCommentsService,
    getGroupPostLikeService,
    getGroupPostService,
    likeGroupPostService
} from "../../api/groupService";
import CreateCommentGroup from "../Comment/CreateCommentGroup";
import GroupComment from "../Comment/GroupComment";
import {Skeleton} from "@mui/lab";

const PostInfoGroup = () => {

    const {store} = useContext(Context)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {groupId, postId} = useParams()

    let history = useHistory()

    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [fetchUser, setFetchUser] = useState(null)

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchPost = await getGroupPostService(groupId, postId)
            const likedPost = await getGroupPostLikeService(groupId, postId)
            const fetchComments = await getGroupPostCommentsService(groupId, postId)
            if (likedPost.data !== null) setIsLiked(true)
            setPost(fetchPost.data)
            setComments(fetchComments.data)
            await store.getUsers()
            setFetchUser(store.users.find(user => user._id === fetchPost.data.userId))
        }
        fetchData().then(() => setLoading(false))
    }, [post.likes, post.comments, reload])

    const likePost = async (postId, groupId) => {
        if (store.user.roles.isActivated) {
            await likeGroupPostService(groupId, postId)
            setReload(!reload)
            setIsLiked(!isLiked)
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете поставити лайк, поки не підтвердите свій акаунт за посиланням на пошті!')
        }
    }

    const deletePost = async (groupId, postId) => {
        await deleteGroupPostService(groupId, postId)
        setReload(!reload)
        history.push(`/group/${groupId}`)
    }

    return (
            <Box flex={7} p={{xs: 0, md: 2}}>
                {loading ? <Skeleton variant="rectangular" height={300} /> : (
                    <>
                        <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "20px"}}>
                            <Link style={{textDecoration: 'inherit', color: 'inherit', fontSize: '20px'}}
                                  to={`/group/${groupId}`}
                            >
                                Назад
                            </Link>
                            <Typography style={{textDecoration: 'inherit', color: 'inherit', fontSize: '20px'}}>Пост №{post._id}</Typography>
                        </Breadcrumbs>
                        <Card sx={{margin: 5, mt: 0, width: "85%", ml: 11, background: "#f9fafb"}}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe" src={`data:buffer;base64,${fetchUser.avatar}`}>
                                        {fetchUser.username}
                                    </Avatar>
                                }
                                action={
                                    store?.user?.roles?.isAdmin || post.userId.toString() === store?.user?._id.toString() ?
                                        <IconButton aria-label="settings">
                                            <MoreVert id="basic-button"
                                                      aria-controls={open ? 'basic-menu' : undefined}
                                                      aria-haspopup="true"
                                                      aria-expanded={open ? 'true' : undefined}
                                                      onClick={handleClick}/>
                                        </IconButton>
                                        : null
                                }
                                title={`${fetchUser.second_name} ${fetchUser.first_name}`}
                                subheader={<Moment format="DD.MM.YYYY HH:mm">{post.createdAt.toString()}</Moment>}
                            />

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => deletePost(groupId, postId).then(() => handleClose())}>Видалити</MenuItem>
                            </Menu>
                            {post.image ? (<CardMedia
                                component="img"
                                height="20%"
                                image={`data:buffer;base64,${post.image}`}
                                alt="Фото"
                            />) : null }
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {post.text}
                                </Typography>
                                {post?.location ? (<Typography variant="body1" color="text.secondary">
                                    <a style={{color: "inherit", textDecoration: "inherit"}} href={post.location} target="_blank">Геолокація</a>
                                </Typography>) : null}
                            </CardContent>
                            <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                                <IconButton aria-label="add to favorites">
                                    {isLiked ? (<Favorite sx={{color: "red"}} onClick={() => likePost(postId, groupId)}/>) : (<FavoriteBorder onClick={() => likePost(postId, groupId)}/>)}
                                    <Typography variant="span" sx={{ml: 1}}>
                                        {post.likes}
                                    </Typography>
                                </IconButton>
                                <IconButton aria-label="comment">
                                    <Typography variant="span" sx={{mr: 1}}>
                                        {post.comments}
                                    </Typography>
                                    <ChatBubbleOutlineOutlined/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </>
                )}

                <Typography variant="h4" fontWeight={300} sx={{margin: "40px 5px 30px"}}>Коментарі</Typography>

                <CreateCommentGroup groupId={groupId} postId={postId} reload={reload} setReload={setReload}/>

                {comments.map(comment => (
                    <GroupComment groupId={groupId} comment={comment} reload={reload} setReload={setReload} postId={postId}/>
                ))}
            </Box>
    );
};

export default observer(PostInfoGroup);