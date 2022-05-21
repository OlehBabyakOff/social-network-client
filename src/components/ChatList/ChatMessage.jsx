import React from 'react';
import ChatMsg from "./ChatMsg";

const ChatMessage = ({user, socket}) => {
    return (
        <ChatMsg
            avatar={'s'}
            side={'right'}
            name={'sss'}
            time={Date.now().toString()}
            image={null}
            messages={'hi'}
        />
    );
};

export default ChatMessage;