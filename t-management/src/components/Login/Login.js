import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = () => {
  const [token, setToken] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

useEffect(()=>{
  setFormIsValid(
    enteredEmail.includes('@') && enteredPassword.trim().length > 6
  );
  console.log('CLEAN-UP');
}, [enteredEmail,  enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler =async (event) => {
    event.preventDefault();
   
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enteredEmail, enteredPassword }),
      });

      const data = await response.json();
      if (data) {
        // Dummy response from JSONPlaceholder, using 'id' as a placeholder for a token
        setToken(data.id.toString());
        sessionStorage.setItem('jwtToken', data.id.toString());

        setEnteredEmail("");
        setEnteredPassword("");

        
        setTimeout(() => {
          sessionStorage.removeItem('jwtToken');
          setToken('');
        }, 20000);
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>

    </Card>
  );
};

export default Login;
