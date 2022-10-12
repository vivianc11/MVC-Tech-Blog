async function logIn(event) {
    event.preventDefault();

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (username && password) {
        const res = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
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