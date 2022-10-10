async function logOut() {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        console.log(res.statusText);
    }
}

document.getElementById('logout').addEventListener('click', logOut);