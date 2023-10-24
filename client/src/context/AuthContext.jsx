import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // loading
    const [errorResponse, setErrorResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [registerInfo, setRegisterInfo] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('User');
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback( async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        
        setIsLoading(false);

        if (response.error){
            return setErrorResponse(response);
        }else{
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
        }
    }, [registerInfo]);

    // -------------------------------------   LOGOUT  --------------------------------------------
    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    // ------------------------------------    LOGIN USERS -----------------------------------------
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    });

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));

        setIsLoading(false);

        if (response.error){
            return setErrorResponse(response);
        }else{
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
        }
    }, [loginInfo]);

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        errorResponse,
        isLoading,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        handleLogin
    }}>
        {children}
    </AuthContext.Provider>
}