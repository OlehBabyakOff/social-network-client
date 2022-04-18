import React, {useState} from 'react';
import {Avatar, Button, Divider, Grid, IconButton, Menu, MenuItem} from "@mui/material";
import {MoreVert} from "@mui/icons-material";

const ReplyComment = () => {

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