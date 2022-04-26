import React, {useState} from 'react';
import {Avatar, Button, Divider, Grid, IconButton, Menu, MenuItem} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import Moment from "react-moment";

const ReplyComment = ({comment}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
       <>
           <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
               <Grid container wrap="nowrap" spacing={2} sx={{width: "97%", ml: 5}}>
                   <Grid item>
                       <Avatar alt="" src="" >{comment.userId}</Avatar>
                   </Grid>
                   <Grid justifyContent="left" item xs zeroMinWidth>
                       <h4 style={{ margin: 0, textAlign: "left" }}>{comment.userId}
                           <Moment format="DD.MM.YYYY HH:mm" style={{color: 'inherit', fontWeight: "300", float: "right"}}>{comment.createdAt.toString()}</Moment>
                       </h4>
                       <p style={{ textAlign: "left", margin: "5px" }}>
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
       </>
    );
};

export default ReplyComment;