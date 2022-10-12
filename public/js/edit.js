async function editPost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const res = await fetch(`/api/post/${id}`, {
        method: 'put',
        body: JSON.stringify({ post_id: id, title, body}),
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        document.location.replace('/dashboard/');
    } else {
        console.log(res.statusText);
    }
}

document.getElementById('edit-post').addEventListener('submit', editPost);