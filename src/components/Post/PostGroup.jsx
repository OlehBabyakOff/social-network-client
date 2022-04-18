import React, {useState} from 'react';
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

const PostGroup = () => {

    return (
        <Card sx={{ margin: 5,  width: "80%", ml:13, background: "#f9fafb" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="John Doe"
                subheader="September 14, 2022"
            />

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
    );
};

export default PostGroup;