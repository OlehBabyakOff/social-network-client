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
import {Link} from "react-router-dom";
import {getPostLikeService, likePostService} from "../../api/postService";

const PostUser = ({post, reload, setReload}) => {

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const likedPost = await getPostLikeService(post._id)
            if (likedPost.data !== null) setIsLiked(true)
        }
        fetchData()
    }, [reload])

    const likePost = async (id) => {
        await likePostService(id)
        setReload(!reload)
        setIsLiked(!isLiked)
    }

    return (
        <Card sx={{ margin: 5,  width: "80%", ml:13, background: "#f9fafb" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        {post.user}
                    </Avatar>
                }
                title={post.user}
                subheader={<Moment format="DD.MM.YYYY HH:mm">{post.createdAt.toString()}</Moment>}
            />

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
                {post?.location ? (<Typography variant="body1" color="text.secondary">
                    <a style={{color: "inherit", textDecoration: "inherit"}} href={post.location} target="_blank">Моя геолокація</a>
                </Typography>) : null}
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

export default PostUser;