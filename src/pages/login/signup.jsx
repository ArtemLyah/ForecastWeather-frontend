import { React, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../API/AuthService';
import { AuthContext } from '../../context/AuthProvider';

export const SignUp = () => {
  const [validation, setValidation] = useState(false);
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isEqualPasswords, setIsEqualPasswords] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const {setAuth} = useContext(AuthContext);
  const [_, setRedirect] = useState();
  const navigate = useNavigate();

  const signUp = async () => {
    setIsEqualPasswords(true);
    try {
      const auth = await AuthService.register({email, password: firstPassword});
      return auth;
    }
    catch (err) {
      if (!err.response) {
        console.log(err);
      }
      else if (err.response?.status === 400 && err.response.data.message === "User is already registered") {
        setIsEmailExist(true);
      }
      return null;
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidation(true);
    if (firstPassword !== secondPassword) {
      setIsEqualPasswords(false);
      setValidation(false);
      return;
    }
    if (!email) {
      setValidation(false);
      return;
    }
    const auth = await signUp();
    if (auth) {
      setEmail('');
      setFirstPassword('');
      setSecondPassword('');
      setIsShowPassword(false);
      setIsEqualPasswords(true);
      setIsEmailExist(false);
      setAuth(auth);
      localStorage.setItem('auth', JSON.stringify(auth));
      setRedirect(navigate('/home', {replace: true}));
    }

  };

  return (
    <Form validated={validation} className={styles.Form}>
      <Form.Label style={{'fontSize': '24px', 'marginBottom': '30px'}}>Sign up</Form.Label>
      
      <Form.Group className={styles.FormGroup}>
        <Form.Control 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required 
        />
        <Form.Control.Feedback type="invalid">
          Please enter your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={styles.FormGroup}>
        <Form.Control   
          type={isShowPassword ? "text" : "password"}  
          placeholder="Password"
          value={firstPassword}
          onChange={event => setFirstPassword(event.target.value)}
          required 
        />
        <Form.Control.Feedback type="invalid">
          Please enter your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={styles.FormGroup}>
        <Form.Control   
          type={isShowPassword ? "text" : "password"}  
          placeholder="Repeat password"
          value={secondPassword}
          onChange={event => setSecondPassword(event.target.value)}
          required 
        />
        <Form.Control.Feedback type="invalid">
          Please enter your password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={styles.FormGroup}>
        <Form.Label className={styles.DownFormElem}>
          <input type="checkbox" onChange={event => {setIsShowPassword(event.target.checked)}}/> Show password
        </Form.Label>
        {
          !isEqualPasswords ? 
            <Form.Label style={{"color": "#dc3545", "display": "block"}}>
              Passwords are not equal      
            </Form.Label>
          : ""
        }

        {
          isEmailExist ? 
            <Form.Label style={{"color": "#dc3545", "display": "block"}}>
              This email already exist
            </Form.Label>
          : ""
        }

        <Button className={styles.DownFormElem} type="button" onClick={handleSubmit}>Sign in</Button>
      </Form.Group>
    </Form>
  );
}