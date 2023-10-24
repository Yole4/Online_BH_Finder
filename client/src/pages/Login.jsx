import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {

    const {isLoading, errorResponse, updateLoginInfo, loginInfo, handleLogin} = useContext(AuthContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="header">
                <h1>Login Page</h1>
            </div>

            <div>
                <h2>{errorResponse?.error && errorResponse.message}</h2>
            </div>

            <form onSubmit={handleLogin}>
                <div className="login-body">
                    <label>Username</label>
                    <input type="text" placeholder='Username' value={updateLoginInfo.username} onChange={(e) => updateLoginInfo({...loginInfo, username: e.target.value})} />
                </div>
                <div className="login-body">
                    <label>Password</label>
                    <input type="password" placeholder='*********' value={updateLoginInfo.password} onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})} />
                </div>

                <div className="login-body" style={{textAlign: 'center'}}>
                    <button type='submit'>{isLoading ? "Loging in..." : "Login"}</button>
                </div>
            </form>

        </div>
    )
}

export default Login
