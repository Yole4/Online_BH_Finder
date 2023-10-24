import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Register() {
  
  const {registerInfo, isLoading, updateRegisterInfo, registerUser, errorResponse} = useContext(AuthContext);

  return (
    <div>
      <div className="register-header">
        <h1>Register</h1>
      </div>
      <div>
        {errorResponse?.error && (
          <p>{errorResponse?.message}</p>
        )}
      </div>

      <form onSubmit={registerUser}>
        <div className="register-body">
          <label >Full Name</label>
          <input type="text" placeholder='Full Name' value={updateRegisterInfo.fullname} onChange={(e) => updateRegisterInfo({...registerInfo, fullname: e.target.value})} />
        </div>

        <div className="register-body">
          <label >Username</label>
          <input type="text" placeholder='Username' value={updateRegisterInfo.username} onChange={(e) => updateRegisterInfo({...registerInfo, username: e.target.value})} />
        </div>

        <div className="register-body">
          <label >Password</label>
          <input type="password" placeholder='******' value={updateRegisterInfo.password} onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})} />
        </div>

        <div className="register-body">
          <label >Confirm Password</label>
          <input type="password" placeholder='******' value={updateRegisterInfo.confirmPassword} onChange={(e) => updateRegisterInfo({...registerInfo, confirmPassword: e.target.value})} />
        </div>

        <div className="register-body">
          <button type='submit'>{isLoading ? "Creating your account" : "Register"}</button>
        </div>
      </form>
    </div>
  )
}

export default Register
