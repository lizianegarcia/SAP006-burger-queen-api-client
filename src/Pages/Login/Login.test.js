import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Router from 'react-router';
// import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from "./Login";

describe("SignIn", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("with valid inputs", () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn()
      const { getByPlaceholderText, getByRole } = render(<Router><Login onSubmit={mockOnSubmit}/></Router>)

      await act(async () => {
        fireEvent.change(getByPlaceholderText("E-mail"), {target: {value: "email@test.com"}})
        fireEvent.change(getByPlaceholderText("Senha"), {target: {value: "1234567"}})
      })

      await act(async () => {
        fireEvent.click(getByRole("button"))
      })

      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })


  describe('with empty inputs', () => {
    it('renders the inputs errors', async () => {
        const mockOnSubmit = jest.fn()
        const {getByPlaceholderText, getByRole} = render(<Router><Login /></Router>)

        act(() => {
            fireEvent.change(getByPlaceholderText("E-mail"), {target: {value: ''}})
            fireEvent.change(getByPlaceholderText("Senha"), {target: {value: ''}})
        })

        act(() => {
            fireEvent.click(getByRole('button'))
        })

        expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

})

// test('allows the user to login successfully', () => {
//   render(<Router><Login /></Router>)

//   fireEvent.change(screen.getByRole("teste-email"), {
//     target: {value: 'email@teste.com'},
//   })
//   fireEvent.change(screen.getByRole("teste-password"), {
//     target: {value: 'banana'},
//   })
//   fireEvent.click(screen.getByText("Login"))
// })