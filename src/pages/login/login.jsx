import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from './../../context/AuthProvider';
import { AuthService } from './../../API/AuthService';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [redirect, setRedirect] = useState();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const auth = await AuthService.login({email, password});
      setAuth(auth);
      setEmail('');
      setPassword('');
      setIsShowPassword('');
      return auth;
    } 
    catch (err) {
      console.log(err);
      return null;
    }
  }

  const handleSubmit = async () => {
    const auth = await login();
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
      setRedirect(navigate('/home', {replace: true}));
    }
    else {
      setIsLogged(false);
    }
  };

  return (
    <Form className={styles.Form}>
      <Form.Label style={{'fontSize': '24px', 'marginBottom': '30px'}}>Login</Form.Label>
      <Form.Group className={styles.FormGroup}>
        <Form.Control 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={styles.FormGroup}>
        <Form.Control   
          type={isShowPassword ? "text" : "password"} 
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={styles.FormGroup}>
        <Form.Label className={styles.DownFormElem}>
          <input type="checkbox" onChange={event => {setIsShowPassword(event.target.checked)}}/> Show password
        </Form.Label >
        <Form.Label fontSize="14px" className={styles.DownFormElem}>
          <a href="/signup">Not registered</a>
        </Form.Label>
        {
          !isLogged ?
            <Form.Label type="invalid" style={{"color": '#dc3545'}}>
              Wrong email or password
            </Form.Label>
          : ""  
        }
        <Button 
          className={styles.DownFormElem} 
          type="button" 
          onClick={handleSubmit}
        >Login</Button>
        {redirect}
      </Form.Group>
    </Form>
  );
}