import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chatContext';
import { UserContext } from '../context/UsersContext';
import UserChat from './chat/UserChat';

function Chat() {
    const { user, logoutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
    };

    const { userChats, isLoading, errorResponse } = useContext(ChatContext);
    // const {userInfo } = useContext(UserContext);

    return (
        <div>
            <div>
                <button onClick={handleLogout}>Click me to logout</button>
            </div>
            <p>Login as: {user ? user.id : 'Guest'}</p>
            <div>
                <hr />
                {isLoading && (<p>Loading chats...</p>)}
                {userChats && (userChats.message).map((item, index) => {
                    return (
                        <div key={index}>
                            <UserChat item = {item} user = {user} />
                        </div>
                    )
                })}
                <hr />
            </div>
        </div>
    )
}

export default Chat;