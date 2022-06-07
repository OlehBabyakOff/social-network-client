import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox, CircularProgress,
    IconButton, Menu, MenuItem, Skeleton, Stack,
    Typography
} from "@mui/material";
import {ChatBubbleOutlineOutlined, Favorite, FavoriteBorder, MoreVert, PinDrop, Share} from "@mui/icons-material";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {getPostLikeService, likePostService} from "../../api/postService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const PostUser = ({post, reload, setReload}) => {

    const {store} = useContext(Context)

    const [isLiked, setIsLiked] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetchUser, setFetchUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const likedPost = await getPostLikeService(post._id)
            if (likedPost.data !== null) setIsLiked(true)
            await store.getUsers()
            setFetchUser(store.users.find(user => user._id === post.user))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const likePost = async (id) => {
        if (store.user.roles.isActivated) {
            await likePostService(id)
            setReload(!reload)
            setIsLiked(!isLiked)
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете поставити лайк, поки не підтвердите свій акаунт за посиланням на пошті!')
        }
    }

    return (
        loading ? <Skeleton variant="text" height={300} sx={{width: "80%", ml:13}}/> :
            (<Card sx={{ margin: 5,  width: "80%", ml:13, background: "#f9fafb" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={`data:buffer;base64,${fetchUser.avatar}`}>
                            {fetchUser.username}
                        </Avatar>
                    }
                    title={`${fetchUser.second_name} ${fetchUser.first_name}`}
                    subheader={<Moment format="DD.MM.YYYY HH:mm">{post.createdAt.toString()}</Moment>}
                />

                {post.image ? (<CardMedia
                    component="img"
                    height="20%"
                    image={`data:buffer;base64,${post.image}`}
                    alt="Фото"
                    sx={{maxWidth: '850px', maxHeight: '477px', height: 'auto', width: 'auto', margin: "auto"}}
                />) : null}
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {post.text}
                    </Typography>
                    {post?.location ? (<Typography variant="body1" color="text.secondary" sx={{mt: 2}}>
                        <a style={{color: "inherit"}} href={post.location} target="_blank">
                            <Stack direction={'row'} spacing={2}>
                                <PinDrop color={'error'}/>
                                Моя геолокація
                            </Stack>
                        </a>
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
            </Card>)
    );
};

export default observer(PostUser);