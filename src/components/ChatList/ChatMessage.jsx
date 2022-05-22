import React, {useContext} from 'react';
import ChatMsg from "./ChatMsg";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ChatMessage = ({message, user, socket}) => {

    const {store} = useContext(Context)

    return (
        message.sender === store?.user._id ?
        <ChatMsg
            side={'right'}
            time={message.createdAt.toString()}
            image={message.image}
            messages={message.text}
        /> :
        <ChatMsg
            avatar={user.avatar}
            side={'left'}
            name={`${user.second_name} ${user.first_name}`}
            time={message.createdAt.toString()}
            image={message.image}
            messages={message.text}
        />
    );
};

export default observer(ChatMessage);