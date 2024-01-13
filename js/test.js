let commentsArray = [];

function displayComments() {
    const commentContainer = document.querySelector('.comment-container');
    commentContainer.innerHTML = '';

    commentsArray.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p>${comment.commentText}</p>
            <button class="reply-btn" onclick="replyToComment(${index})">Reply</button>
        `;

        if (comment.replies && comment.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies-container');
            comment.replies.forEach(reply => {
                const replyElement = document.createElement('div');
                replyElement.classList.add('reply');
                replyElement.innerHTML = `
                    <p>${reply}</p>
                `;
                repliesContainer.appendChild(replyElement);
            });
            commentElement.appendChild(repliesContainer);
        }

        commentContainer.appendChild(commentElement);
    });
}

function addComment(comment) {
    commentsArray.push(comment);
    displayComments();
}

const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comments');
    const commentText = commentInput.value;
    const comment = {
        commentText: commentText,
        replies: []
    };
    addComment(comment);
    commentInput.value = '';
});

function replyToComment(index) {
    const reply = prompt('Reply to the comment:');
    if (reply) {
        commentsArray[index].replies.push(reply);
        displayComments();
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        commentsArray = JSON.parse(storedComments);
        displayComments();
    }
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('comments', JSON.stringify(commentsArray));
});