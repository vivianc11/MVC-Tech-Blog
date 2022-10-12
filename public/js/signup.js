async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    // console.log(username);
    // console.log(password);

    if (username && password) {
        const res = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            console.log('Successful Sign Up');

            document.replace('/dashboard');
        } else {
            console.log(res.statusText);
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', signUp);