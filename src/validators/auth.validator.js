const { checkSchema, validationResult } = require('express-validator');
const { exists, unique, confirmation } = require('./custom');

const login = checkSchema({
  email: {
    exists: {
      errorMessage: 'Invalid Email',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Invalid Email',
      bail: true,
    },
  },
  password: {
    exists: {
      errorMessage: 'Password is required',
      bail: true,
    }
  }
});

const register = checkSchema({
  name: {
    exists: {
      errorMessage: 'Name is required',
      bail: true,
    }
  },
  email: {
    exists: {
      errorMessage: 'Invalid Email',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Invalid Email',
      bail: true,
    },
    custom: {
      options: async (value, { req, location, path }) => await unique('User', 'email', value),
      errorMessage: 'Email not available',
      bail: true,
    }
  },
  password: {
    exists: {
      errorMessage: 'Password is required',
      bail: true,
    },
    custom: {
      options: async (value, { req, location, path }) => await confirmation('password', value, req),
      errorMessage: 'Invalid password confirmation',
      bail: true,
    }
  }
});

module.exports = {
  login,
  register
}

