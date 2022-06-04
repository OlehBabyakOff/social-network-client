import React from 'react';
import {Divider, List, ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import Moment from "react-moment";
import {
    AssignmentIndOutlined,
    BadgeOutlined,
    CakeOutlined,
    EmailOutlined,
    PhoneIphoneOutlined
} from "@mui/icons-material";

const InfoUser = ({user}) => {
    return (
       <>
           <Paper elevation={3} sx={{p:2, background: "#f9fafb", marginTop: 5}}>
               <List>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <BadgeOutlined sx={{mr: 1}}/>
                               Прізвище: {user.second_name}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <AssignmentIndOutlined sx={{mr: 1}}/>
                               Ім'я: {user.first_name}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <EmailOutlined sx={{mr: 1}}/>
                               Електронна адреса: {user.email}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <PhoneIphoneOutlined sx={{mr: 1}}/>
                               Номер телефону: {user.phone}
                           </Stack>
                       </ListItemText>
                   </ListItem>
                   <Divider/>
                   <ListItem>
                       <ListItemText>
                           <Stack direction={'row'}>
                               <CakeOutlined sx={{mr: 1}}/>
                               Дата народження: <Moment format="DD.MM.YYYY" style={{marginLeft: '5px'}}>{user.birthday.toString()}</Moment>
                           </Stack>
                       </ListItemText>
                   </ListItem>
               </List>
           </Paper>
       </>
    );
};

export default InfoUser;