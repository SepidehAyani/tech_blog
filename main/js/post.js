const handleDeletePost = async (event) => {

    event.preventDefault();

    const id = document.querySelector('[data-postID]').getAttribute('data-postID');
    const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/');
        alert('Post successfully deleted!');
    }
};

document.querySelector('#deletePost').addEventListener('click', handleDeletePost);