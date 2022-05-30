import React from 'react';
import {List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import Moment from "react-moment";

const InfoUser = ({user}) => {
    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb", marginTop: 5}}>
               <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                   Інформація про користувача
               </Typography>
               <List>
                   <ListItem>
                       <ListItemText>
                           Прізвище: {user.second_name}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Ім'я: {user.first_name}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Електронна адреса: {user.email}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Номер телефону: {user.phone}
                       </ListItemText>
                   </ListItem>
                   <ListItem>
                       <ListItemText>
                           Дата народження: <Moment format="DD.MM.YYYY">{user.birthday.toString()}</Moment>
                       </ListItemText>
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default InfoUser;