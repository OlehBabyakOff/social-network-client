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
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {deleteGroupPostService, getGroupPostLikeService, likeGroupPostService} from "../../api/groupService";

const PostGroup = ({post, groupId, reload, setReload}) => {

    const {store} = useContext(Context)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isLiked, setIsLiked] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetchUser, setFetchUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const likedPost = await getGroupPostLikeService(groupId, post._id)
            if (likedPost.data !== null) setIsLiked(true)
            await store.getUsers()
            setFetchUser(store.users.find(user => user._id === post.userId))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

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
    }

    return (
        loading ? <Skeleton variant="text" height={300} sx={{width: "85%", ml:12}}/> :
            (<Card sx={{ margin: 5, width: "85%", ml:12, background: "#f9fafb" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={`data:buffer;base64,${fetchUser.avatar}`}>
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
                    <MenuItem onClick={() => deletePost(groupId, post._id).then(() => handleClose())}>Видалити</MenuItem>
                </Menu>
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
                                Геолокація
                            </Stack>
                        </a>
                    </Typography>) : null}
                </CardContent>
                <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                    <IconButton aria-label="add to favorites">
                        {isLiked ? (<Favorite sx={{color: "red"}} onClick={() => likePost(post._id, groupId)}/>) : (<FavoriteBorder onClick={() => likePost(post._id, groupId)}/>)}
                        <Typography variant="span" sx={{ml:1}}>
                            {post.likes}
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="comment">
                        <Typography variant="span" sx={{mr:1}}>
                            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/group/${groupId}/post/${post._id}`}>
                                {post.comments}
                            </Link>
                        </Typography>
                        <ChatBubbleOutlineOutlined/>
                    </IconButton>
                </CardActions>
            </Card>)
    );
};

export default observer(PostGroup);