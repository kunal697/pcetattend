import React, { useState } from 'react';
import Login from './components/LoginPage';
import Attendance from './components/Attendance';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (username, password) => {
    // Update the credentials and set authentication state
    setCredentials({ username, password });
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Header/>
      {isAuthenticated ? (
        <Attendance username={credentials.username} password={credentials.password} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
