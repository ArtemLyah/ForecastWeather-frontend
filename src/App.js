import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarMenu } from './components/navbar';
import { Admin } from './pages/admin/admin';
import { Home } from './pages/home/home';
import { SignUp } from './pages/login/signup';
import { Login } from './pages/login/login';
import { Forecast } from './pages/forecast/forecast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';

function App() {
  const { setAuth } = useContext(AuthContext);
  const savedAuth = JSON.parse(localStorage.getItem('auth'));
  if (savedAuth) setAuth(savedAuth);
  return (
    <div className="App">
      <NavbarMenu/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forecast" element={<Forecast/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
