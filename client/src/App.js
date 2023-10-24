import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ChatContextProvider user={user}>
        <Routes>
          <Route path='/' element={user ? <Navigate to="/chat" replace /> : <Login />} />
          <Route path='/chat' element={user ? <Chat /> : <Navigate to="/" replace />} />
          <Route path='/register' element={user ? <Navigate to="/chat" replace /> : <Register />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </ChatContextProvider>
    </>
  )
}

export default App
