async function deletePost(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
      
      const res = await fetch(`/api/post/${id}`, {
        method: 'delete',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        document.location.replace('/dashboard/');
      } else {
        console.log(res.statusText);
      }
      
}

document.getElementsByClassName('.delete-post-btn').addEventListener('click', deletePost);