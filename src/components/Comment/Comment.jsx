import React, {useEffect, useState} from 'react';
import {Avatar, Button, Divider, Grid, IconButton, Menu, MenuItem, Paper} from "@mui/material";
import ReplyComment from "./ReplyComment";
import {MoreVert} from "@mui/icons-material";
import CreateReplyComment from "./CreateReplyComment";
import {deleteCommentService, getPostChildCommentsService} from "../../api/postService";
import Moment from "react-moment";

const Comment = ({comment, reload, setReload, postId}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [reply, setReply] = useState(false)

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [childs, setChilds] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchChilds = await getPostChildCommentsService(postId, comment._id)
            setChilds(fetchChilds.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const deleteComment = async (id, commentId) => {
        await deleteCommentService(id, commentId)
        setReload(!reload)
    }

    return (
       <>
           <Paper style={{ padding: "40px 20px", width: "95%", background: "#f9fafb", marginBottom: 5 }} elevation={0}>
               <Grid container wrap="nowrap" spacing={2}>
                   <Grid item>
                       <Avatar alt="" src="" >{comment.userId}</Avatar>
                   </Grid>
                   <Grid justifyContent="left" item xs zeroMinWidth>
                       <h4 style={{ margin: 0, textAlign: "left" }}>{comment.userId}
                           <Moment format="DD.MM.YYYY HH:mm" style={{color: 'inherit', fontWeight: "300", float: "right"}}>{comment.createdAt.toString()}</Moment>
                       </h4>
                       <p style={{ textAlign: "left", margin: "5px 0"}}>
                           {comment.content}
                       </p>
                       <p style={{ textAlign: "left", color: "gray" }}>
                           <IconButton aria-label="settings" sx={{float: "right"}}>
                               <MoreVert id="basic-button"
                                         aria-controls={open ? 'basic-menu' : undefined}
                                         aria-haspopup="true"
                                         aria-expanded={open ? 'true' : undefined}
                                         onClick={handleClick}/>
                           </IconButton>
                           <Button onClick={() => setReply(!reply)} sx={{float: "right"}}>Відповісти</Button>
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

               {reply ? (<CreateReplyComment reload={reload} setReload={setReload} postId={postId} parentId={comment._id} reply={reply} setReply={setReply}/>) : null}


               {loading ? null :
               comment.childs.length > 0 ?
                   childs.map(child => (
                       <ReplyComment comment={child} postId={postId} key={child._id} reload={reload} setReload={setReload}/>
                   ))
                : null}

           </Paper>
       </>
    );
};

export default Comment;