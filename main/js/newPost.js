const newPostHandler = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title-entry').value.trim();
    const content = document.querySelector('#content-entry').value.trim();
    const username = document.querySelector('#username-log').value.trim();

    if (title && content && username) {
        const response = await fetch('/api/blogpost/newPost', {
            method: 'POST',
            body: JSON.stringify({ title, content, username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/');
            alert('New Post Created!');
        }

    } else {
        alert('Must input title, content, and valid username!')
    }
};

document.querySelector('#newFormBtn').addEventListener('click', newPostHandler);