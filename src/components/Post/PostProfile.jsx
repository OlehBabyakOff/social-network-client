import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton, Menu, MenuItem,
    Typography
} from "@mui/material";
import {ChatBubbleOutlineOutlined, Favorite, FavoriteBorder, MoreVert, Share} from "@mui/icons-material";
import Moment from "react-moment";
import {getPostLikeService, likePostService} from "../../api/postService";
import {Link} from "react-router-dom";

const PostProfile = ({post, reload, setReload}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const likedPost = await getPostLikeService(post._id)
            if (likedPost.data !== null) setIsLiked(true)
        }
        fetchData()
    }, [reload, post.likes, post.comments])

    const likePost = async (id) => {
        await likePostService(id)
        setReload(!reload)
        setIsLiked(!isLiked)
    }

    return (
        <Card sx={{ margin: 5, mt: 0,  width: "85%", ml:14, background: "#f9fafb" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
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
            />) : null}

            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {post.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                <IconButton aria-label="add to favorites">
                    {isLiked ? (<Favorite sx={{color: "red"}} onClick={() => likePost(post._id)}/>) : (<FavoriteBorder onClick={() => likePost(post._id)}/>)}
                    <Typography variant="span" sx={{ml:1}}>
                        {post.likes}
                    </Typography>
                </IconButton>
                <IconButton aria-label="comment">
                    <Typography variant="span" sx={{mr:1}}>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/post/${post._id}`}>
                            {post.comments}
                        </Link>
                    </Typography>
                    <ChatBubbleOutlineOutlined/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostProfile;