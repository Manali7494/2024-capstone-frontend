import React from 'react';
import {
  Typography,
  Container,

} from '@mui/material';
import PropTypes from 'prop-types';

function ErrorPage({ errorMessage }) {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}
      maxWidth="sm"
    >
      <Typography
        variant="h2"
        component="h1"
        color="red"
        style={{
          fontFamily: 'Courier New, Courier, monospace',
          color: 'red',
          textShadow: '2px 2px #000',
        }}
      >
        Error
      </Typography>
      <Typography variant="h5" component="p" color="red" align="center" style={{ fontStyle: 'italic' }}>
        {errorMessage}
      </Typography>
    </Container>
  );
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
export default ErrorPage;
