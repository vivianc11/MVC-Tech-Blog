async function logOut() {
    const res = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        console.log(res.statusText);
    }
}

document.getElementById('logout').addEventListener('click', logOut);