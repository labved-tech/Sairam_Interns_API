/* eslint-disable */
const login = async (email, password) => {
  console.log(email, password);

  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
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
