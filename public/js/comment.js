async function commentPost(event) {
    event.preventDefault();

    const comment_body = document.getElementById('comment-body').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (comment_body) {
        const res = await fetch('/api/comment', {
            method: 'post',
            body: JSON.stringify({
                post_id,
                comment_body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            document.location.reload();

        } else {
            console.log(res.statusText);
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', commentPost);