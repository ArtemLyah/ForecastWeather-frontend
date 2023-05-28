import React from 'react';
import { Form } from 'react-bootstrap';

export const NotLoggedInLabel = ({isLogged}) => {
  if (isLogged === undefined) return;
  return ( 
    <Form.Label type="invalid" style={{"color": '#dc3545'}}>
      Wrong email or password
    </Form.Label>
  );
}
