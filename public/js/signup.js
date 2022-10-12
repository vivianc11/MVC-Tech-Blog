async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (username && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            console.log('Successful Sign Up');

            document.location.replace('/dashboard');
        } else {
            console.log(res.statusText);
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', signUp);