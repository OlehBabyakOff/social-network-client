import React from 'react';
import {List, ListItem, ListItemText, Paper, Typography} from "@mui/material";

const InfoUser = () => {
    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
               <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                   Інформація про користувача
               </Typography>
               <List>
                   <ListItem>
                       <ListItemText
                           primary="Прізвище: Саня"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Ім'я: Саня"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Електронна адреса: sanya@gmail.com"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Номер телефону: +380 422 58 17 32"
                       />
                   </ListItem>
                   <ListItem>
                       <ListItemText
                           primary="Дата народження: 27.12.1992"
                       />
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default InfoUser;