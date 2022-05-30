import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, CircularProgress, Divider, Grid, IconButton, Menu, MenuItem} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import Moment from "react-moment";
import {deleteCommentService} from "../../api/postService";
import {Context} from "../../index.js";
import {Skeleton} from "@mui/lab";

const ReplyGroupComment = ({comment, postId, reload, setReload}) => {

    const {store} = useContext(Context)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [loading, setLoading] = useState(true)
    const [fetchUser, setFetchUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            await store.getUsers()
            setFetchUser(store.users.find(user => user._id === comment.userId))
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const deleteComment = async (id, commentId) => {
        // await deleteCommentService(id, commentId)
        // setReload(!reload)
    }

    return (
        loading ? <Skeleton variant="text" height={200} /> :
            <>
               <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                   <Grid container wrap="nowrap" spacing={2} sx={{width: "97%", ml: 5}}>
                       <Grid item>
                           <Avatar alt="" src={`data:buffer;base64,${fetchUser.avatar}`}>{fetchUser.username}</Avatar>
                       </Grid>
                       <Grid justifyContent="left" item xs zeroMinWidth>
                           <h4 style={{ margin: 0, textAlign: "left" }}>{`${fetchUser.second_name} ${fetchUser.first_name}`}
                               <Moment format="DD.MM.YYYY HH:mm" style={{color: 'inherit', fontWeight: "300", float: "right"}}>{comment.createdAt.toString()}</Moment>
                           </h4>
                           <p style={{ textAlign: "left", margin: "5px" }}>
                               {comment.content}
                           </p>
                           <p style={{ textAlign: "left", color: "gray" }}>
                               {store.user.roles.isAdmin || comment.userId.toString() === store.user._id.toString() ?
                                   <IconButton aria-label="settings" sx={{float: "right"}}>
                                       <MoreVert id="basic-button"
                                                 aria-controls={open ? 'basic-menu' : undefined}
                                                 aria-haspopup="true"
                                                 aria-expanded={open ? 'true' : undefined}
                                                 onClick={handleClick}/>
                                   </IconButton>
                               : null}
                           </p>
                       </Grid>
                       <Menu
                           id="basic-menu"
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleClose}
                           MenuListProps={{
                               'aria-labelledby': 'basic-button',
                           }}
                       >
                           <MenuItem onClick={() => deleteComment(postId, comment._id).then(() => handleClose())}>Видалити</MenuItem>
                       </Menu>
                   </Grid>
            </>
    );
};

export default ReplyGroupComment;