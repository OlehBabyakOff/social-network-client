import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox, Divider, Grid,
    IconButton,
    Menu,
    MenuItem, Paper,
    Typography
} from "@mui/material";
import {ChatBubbleOutlineOutlined, Favorite, FavoriteBorder, MoreVert} from "@mui/icons-material";
import Comment from "../Comment/Comment";
import CreateComment from "../Comment/CreateComment";
import {useParams} from "react-router-dom";
import {getPost, getPostCommentsService, getPostLikeService, likePostService} from "../../api/postService";
import Moment from "react-moment";

const PostInfo = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {postId} = useParams()

    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchPost = await getPost(postId)
            const likedPost = await getPostLikeService(postId)
            const fetchComments = await getPostCommentsService(postId)
            if (likedPost.data !== null) setIsLiked(true)
            setPost(fetchPost.data)
            setComments(fetchComments.data)
        }
        fetchData().then(() => setLoading(false))
    }, [post.likes, post.comments, reload])

    const likePost = async (id) => {
        await likePostService(id)
        setReload(!reload)
        setIsLiked(!isLiked)
    }

    return (
        loading ? null : (
            <Box flex={7} p={{xs: 0, md: 2}}>
                <Card sx={{margin: 5, mt: 0, width: "85%", ml: 11, background: "#f9fafb"}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                                {post.user}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVert id="basic-button"
                                          aria-controls={open ? 'basic-menu' : undefined}
                                          aria-haspopup="true"
                                          aria-expanded={open ? 'true' : undefined}
                                          onClick={handleClick}/>
                            </IconButton>
                        }
                        title={post.user}
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
                        <MenuItem onClick={handleClose}>Видалити</MenuItem>
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
                    </CardContent>
                    <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                        <IconButton aria-label="add to favorites">
                            {isLiked ? (<Favorite sx={{color: "red"}} onClick={() => likePost(postId)}/>) : (<FavoriteBorder onClick={() => likePost(postId)}/>)}
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

                <Typography variant="h4" fontWeight={300} sx={{margin: "40px 5px 30px"}}>Коментарі</Typography>

                <CreateComment postId={postId} reload={reload} setReload={setReload}/>

                {comments.map(comment => (
                    <Comment comment={comment} reload={reload} setReload={setReload} postId={postId}/>
                ))}
            </Box>
        )
    );
};

export default PostInfo;