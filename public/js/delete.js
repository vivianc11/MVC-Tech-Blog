async function deletePost(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
      
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
      
      if (res.ok) {
        document.location.replace('/dashboard/');
      } else {
        console.log(res.statusText);
      }
      
}

document.getElementsByClassName('.delete-post-btn').addEventListener('click', deletePost);