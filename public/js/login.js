async function logIn(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (username && password) {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'content-type': 'application/json' }
        });

        if (res.ok) {
            console.log('Successful Login');

            document.location.replace('/dashboard');
        } else {
            console.log(res.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', logIn);