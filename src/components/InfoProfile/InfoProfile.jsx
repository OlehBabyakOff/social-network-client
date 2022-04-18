import React from 'react';
import {List, ListItem, ListItemText, Paper, Typography} from "@mui/material";

const InfoProfile = () => {
    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
               <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                   Інформація про користувача
               </Typography>
               <List>
                   <ListItem>
                       <ListItemText
                           primary="Прізвище: Баб'як"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Ім'я: Олег"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Електронна адреса: oleh@gmail.com"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Номер телефону: +380 502 65 92 88"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Дата народження: 17.05.2001"
                       />
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default InfoProfile;