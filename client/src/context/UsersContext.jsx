import { createContext, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/Services";

export const UserContext = createContext();

export const UserContextProvider = async ({ children, user }) => {
    const [userErrorResponse, setUserErrorResponse] = useState(null);
    const [userIsLoading, setUserIsLoadin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id) {

                setUserIsLoadin(true);
                setUserErrorResponse(null);

                const response = await getRequest(`${baseUrl}/users/find/${user?.id}`);

                setUserIsLoadin(false);

                if (response.error) {
                    return setUserErrorResponse(response);
                } else {
                    setUserInfo(response);
                }
            }
        }
        getUserChats();
    }, [user]);

    return <UserContext.Provider value={{
        userErrorResponse,
        userIsLoading,
        userInfo
    }}>
        {children}
    </UserContext.Provider>
};