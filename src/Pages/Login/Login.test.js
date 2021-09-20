import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Router from 'react-router';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from "./Login";

test('allows the user to login successfully', () => {
  render(<Router><Login /></Router>)

  fireEvent.change(screen.getByRole("teste-email"), {
    target: {value: 'email@teste.com'},
  })
  fireEvent.change(screen.getByRole("teste-password"), {
    target: {value: 'banana'},
  })
  fireEvent.click(screen.getByText("Login"))
})