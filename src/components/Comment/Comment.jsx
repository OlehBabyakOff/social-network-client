import React, {useState} from 'react';
import {Avatar, Button, Divider, Grid, IconButton, Menu, MenuItem, Paper} from "@mui/material";
import ReplyComment from "./ReplyComment";
import {MoreVert} from "@mui/icons-material";
import CreateReplyComment from "./CreateReplyComment";

const Comment = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [reply, setReply] = useState(false)

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
       <>
           <Paper style={{ padding: "40px 20px", width: "95%", background: "#f9fafb", marginBottom: 5 }} elevation={0}>
               <Grid container wrap="nowrap" spacing={2}>
                   <Grid item>
                       <Avatar alt="Remy Sharp" src="" />
                   </Grid>
                   <Grid justifyContent="left" item xs zeroMinWidth>
                       <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                       <p style={{ textAlign: "left" }}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                           luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                           Suspendisse congue vulputate lobortis. Pellentesque at interdum
                           tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                           sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                           metus, efficitur lobortis nisi quis, molestie porttitor metus.
                           Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                           tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                           lectus vitae ex.{" "}
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
                       <MenuItem onClick={handleClose}>Видалити</MenuItem>
                   </Menu>
               </Grid>

               {reply ? (<CreateReplyComment/>) : null}

               <ReplyComment/>
               <ReplyComment/>
               <ReplyComment/>
               <ReplyComment/>


           </Paper>
       </>
    );
};

export default Comment;