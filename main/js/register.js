const registrationFormHandler = async (event) => {

  event.preventDefault();

  const username = document.querySelector('#username-entry').value.trim();
  const email = document.querySelector('#email-entry').value.trim();
  const password = document.querySelector('#password-entry').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user/registerUser', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Please enter a valid username, email, and password.');
    }
  } else {
    alert('Please enter a valid username, email, and password.')
  }
};

document.querySelector('#registerBtn').addEventListener('click', registrationFormHandler);