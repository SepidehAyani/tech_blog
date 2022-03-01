const updateBlogPost = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#disabled-text').value.trim();
    const title = document.querySelector('#title-entry').value.trim();
    const content = document.querySelector('#content-entry').value.trim();
    const username = document.querySelector('#username-entry').value.trim();

    if (id && title && content && username) {
        const response = await fetch(`/api/user/${username}`)

        if (response.ok) {
            const userData = await response.json();
            const user_id = userData.id;
            const putResponse = await fetch(`/api/blogpost/${user_id}`, {
                method: 'PUT',
                body: JSON.stringify({ id, title, content, user_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (putResponse.ok) {
                document.location.replace(`/post/${user_id}`);
            }
        }

    } else { alert('Please enter all values plus valid username'); }

};

document.querySelector('#editPostBtn').addEventListener('click', updateBlogPost);