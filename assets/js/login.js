/* eslint-disable */
const login = (email, password) => {
  alert(email, password);
};
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('[name="username"]').value;
  const password = document.getElementById('[name="password"]').value;
  console.log(email);
  login({ email, password });
});
