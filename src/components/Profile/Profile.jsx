import React from 'react';
import {
    Box, CardContent, CardMedia, Divider, Stack, Typography
} from "@mui/material";
import ProfileBodyLeft from "../ProfileBody/ProfileBodyLeft";
import ProfileBodyRight from "../ProfileBody/ProfileBodyRight";

const Profile = () => {
    return (
        <Box flex={10}>

                <CardMedia
                    component="img"
                    height="400"
                    image="https://www.iucn.org/sites/dev/files/content/images/2020/shutterstock_1458128810.jpg"
                    alt="Paella dish"
                />
                <CardMedia
                    component="img"
                    sx={{borderRadius: 50, borderColor: "white", height: 200, width: 200, mt: -13, ml: 86}}
                    image="https://html5css.ru/w3images/avatar2.png"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h5" sx={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 500}}>
                        Баб'як Олег
                    </Typography>
                    <Typography variant="h6" sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 400}}>
                        @spicepower
                    </Typography>
                </CardContent>
                <Divider/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <ProfileBodyLeft/>
                <ProfileBodyRight/>
            </Stack>

        </Box>
    );
};

export default Profile;