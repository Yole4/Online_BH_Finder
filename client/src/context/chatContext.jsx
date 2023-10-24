import { createContext, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/Services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorResponse, setErrorResponse] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id) {
                
                setIsLoading(true);
                setErrorResponse(null);

                const response = await getRequest(`${baseUrl}/chats/${user?.id}`);

                setIsLoading(false);

                if (response.error){
                    return setErrorResponse(response);
                }else{
                    setUserChats(response);
                }
            }
        }
        getUserChats();
    }, [user]);

    return <ChatContext.Provider value={{
        userChats, 
        isLoading,
        errorResponse,
    }}>{children}</ChatContext.Provider>
}