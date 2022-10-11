async function newPost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: { 'content-type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(res.statusText);
    }
}

document.getElementById('new-post').addEventListener('submit', newPost);