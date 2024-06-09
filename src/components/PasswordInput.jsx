import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import {
  Visibility, VisibilityOff, CheckCircle, Error,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

export const showVisibilityIcon = (showPassword) => (showPassword
  ? <VisibilityOff /> : <Visibility />);

function PasswordInput({
  password, setPassword, isPasswordValid, setIsPasswordValid,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);

    setIsPasswordValid({
      length: value.length >= 8,
      letter: /[A-Z]/.test(value),
      // eslint-disable-next-line no-useless-escape
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
      number: /\d/.test(value),
    });
  };
  const visibilityIcon = showVisibilityIcon(showPassword);

  return (
    <>
      <TextField
        required
        fullWidth
        margin="normal"
        label="Password"
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handleChange}
        InputProps={{
          inputProps: {
            'data-testid': 'password',
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
              >
                {visibilityIcon}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {
        isPasswordValid && (
          <div>
            <div>
              {isPasswordValid.length ? <CheckCircle /> : <Error />}
              Must be at least 8 characters
            </div>
            <div>
              {isPasswordValid.letter ? <CheckCircle /> : <Error />}
              Must contain a capital letter
            </div>
            <div>
              {isPasswordValid.specialChar ? <CheckCircle /> : <Error />}
              Must contain a special character
            </div>
            <div>
              {isPasswordValid.number ? <CheckCircle /> : <Error />}
              Must contain a number
            </div>
          </div>
        )
      }

    </>
  );
}

export default PasswordInput;

PasswordInput.propTypes = {
  password: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  isPasswordValid: PropTypes.shape({
    length: PropTypes.bool,
    letter: PropTypes.bool,
    specialChar: PropTypes.bool,
    number: PropTypes.bool,
  }),
  setIsPasswordValid: PropTypes.func,
};

PasswordInput.defaultProps = {
  password: '',
  isPasswordValid: null,
  setIsPasswordValid: () => {},
};
