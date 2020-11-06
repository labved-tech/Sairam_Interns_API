/* eslint-disable */
'use strict';

var KTAppSettings = {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  colors: {
    theme: {
      base: {
        white: '#ffffff',
        primary: '#3699FF',
        secondary: '#E5EAEE',
        success: '#1BC5BD',
        info: '#8950FC',
        warning: '#FFA800',
        danger: '#F64E60',
        light: '#E4E6EF',
        dark: '#181C32',
      },
      light: {
        white: '#ffffff',
        primary: '#E1F0FF',
        secondary: '#EBEDF3',
        success: '#C9F7F5',
        info: '#EEE5FF',
        warning: '#FFF4DE',
        danger: '#FFE2E5',
        light: '#F3F6F9',
        dark: '#D6D6E0',
      },
      inverse: {
        white: '#ffffff',
        primary: '#ffffff',
        secondary: '#3F4254',
        success: '#ffffff',
        info: '#ffffff',
        warning: '#ffffff',
        danger: '#ffffff',
        light: '#464E5F',
        dark: '#ffffff',
      },
    },
    gray: {
      'gray-100': '#F3F6F9',
      'gray-200': '#EBEDF3',
      'gray-300': '#E4E6EF',
      'gray-400': '#D1D3E0',
      'gray-500': '#B5B5C3',
      'gray-600': '#7E8299',
      'gray-700': '#5E6278',
      'gray-800': '#3F4254',
      'gray-900': '#181C32',
    },
  },
  'font-family': 'Poppins',
};

const login = async (email, password) => {
  console.log(email, password);

  /*   try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      dataType: 'json',
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  } */
};

document
  .querySelector('kt_login_singin_form')
  .addEventListener('kt_login_singin_form_submit_button', (e) => {
    e.preventDefault();

    const email = document.getElementById('[name="email"]').value;
    const password = document.getElementById('[name="password"]').value;

    console.log(email, password);

    login(email, password);
  });

window.addEventListener('load', startup);
