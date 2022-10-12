async function logOut() {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        console.log(res.statusText);
    }
}

document.getElementById('logout').addEventListener('click', logOut);