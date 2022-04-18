import React, {useState} from 'react';
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

const PostInfo = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            <Card sx={{ margin: 5, mt: 0,  width: "85%", ml:11, background: "#f9fafb" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            R
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
                    title="John Doe"
                    subheader="September 14, 2022"
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

                <CardMedia
                    component="img"
                    height="20%"
                    image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the
                        mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{justifyContent: "space-between"}}>
                    <IconButton aria-label="add to favorites">
                        <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                        />
                        <Typography variant="span">
                            10
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="comment">
                        <Typography variant="span" sx={{mr:1}}>
                            3
                        </Typography>
                        <ChatBubbleOutlineOutlined/>
                    </IconButton>
                </CardActions>
            </Card>

            <Typography variant="h4" fontWeight={300} sx={{margin: "40px 5px 30px"}}>Коментарі</Typography>
            <CreateComment/>

            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>

        </Box>
    );
};

export default PostInfo;