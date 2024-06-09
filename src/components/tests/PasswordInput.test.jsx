import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  Visibility, VisibilityOff,
} from '@mui/icons-material';
import PasswordInput, { showVisibilityIcon } from '../PasswordInput';

describe('PasswordInput', () => {
  it('should validate password correctly', () => {
    const setPassword = jest.fn();
    const setIsPasswordValid = jest.fn();
    const { getByTestId } = render(<PasswordInput
      setPassword={setPassword}
      setIsPasswordValid={setIsPasswordValid}
    />);

    const passwordInput = getByTestId('password');

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(setPassword).toHaveBeenCalledWith('short');
    expect(setIsPasswordValid).toHaveBeenCalledWith({
      length: false,
      letter: false,
      specialChar: false,
      number: false,
    });

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(setPassword).toHaveBeenCalledWith('12345678');
    expect(setIsPasswordValid).toHaveBeenCalledWith({
      length: true,
      letter: false,
      specialChar: false,
      number: true,
    });

    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    expect(setPassword).toHaveBeenCalledWith('Password1');
    expect(setIsPasswordValid).toHaveBeenCalledWith({
      length: true,
      letter: true,
      specialChar: false,
      number: true,
    });

    fireEvent.change(passwordInput, { target: { value: 'password!' } });
    expect(setPassword).toHaveBeenCalledWith('password!');
    expect(setIsPasswordValid).toHaveBeenCalledWith({
      length: true,
      letter: false,
      specialChar: true,
      number: false,
    });

    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    expect(setPassword).toHaveBeenCalledWith('Password1!');
    expect(setIsPasswordValid).toHaveBeenCalledWith({
      length: true,
      letter: true,
      specialChar: true,
      number: true,
    });
  });

  describe('showVisibilityIcon', () => {
    it('should show visibility icon when input is true', () => {
      const { container } = render(showVisibilityIcon(true));
      const { container: container2 } = render(<VisibilityOff />);
      expect(container2.firstChild).toEqual(container.firstChild);
    });

    it('should show visibility off icon when input is false', () => {
      const { container } = render(showVisibilityIcon(false));
      const { container: container2 } = render(<Visibility />);
      expect(container2.firstChild).toEqual(container.firstChild);
    });
  });
});
