// Array to store comments
let comments = [];

// Index of the current comment being displayed
let currentCommentIndex = 0;

// Function to display the current comment and reply form
function displayCurrentComment() {
  const commentSection = document.getElementById("commentSection");
  commentSection.innerHTML = "";

  const currentComment = comments[currentCommentIndex];

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  const commentText = document.createElement("p");
  commentText.textContent = currentComment.message;

  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  replyButton.addEventListener("click", () => {
    openReplyForm(currentComment);
    if (replyButton.dataset.clicked !== "true") {
      document.getElementById("commentForm").style.display = "none";
      replyButton.dataset.clicked = "true";
    }
  });

  commentDiv.appendChild(commentText);
  commentDiv.appendChild(replyButton);

  commentSection.appendChild(commentDiv);

  if (currentComment.replies.length > 0) {
    const replyDiv = document.createElement("div");
    replyDiv.classList.add("replies");

    currentComment.replies.forEach((reply) => {
      const replyText = document.createElement("p");
      replyText.textContent = reply.message;
      replyDiv.appendChild(replyText);
    });

    commentSection.appendChild(replyDiv);
  }
}

// Function to open reply form
function openReplyForm(parentComment) {
  const replyForm = document.createElement("form");
  replyForm.classList.add("reply-form");

  const replyInput = document.createElement("textarea");
  replyInput.placeholder = "Reply to this comment";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const replyMessage = replyInput.value;
    const reply = { message: replyMessage };
    parentComment.replies.push(reply);
    displayCurrentComment();
    replyForm.remove();
  });

  replyForm.appendChild(replyInput);
  replyForm.appendChild(submitButton);

  const commentDiv = document.getElementById("commentSection");
  commentDiv.appendChild(replyForm);
}

// Function to handle comment submission
function handleCommentSubmission(event) {
  event.preventDefault();
  const commentInput = document.getElementById("commentInput");
  const commentMessage = commentInput.value;
  const comment = { message: commentMessage, replies: [] };
  comments = [comment]; // Reset comments array with the new comment
  currentCommentIndex = 0; // Reset current comment index to display the first comment
  displayCurrentComment();
  commentInput.value = "";
}

// Event listener for comment submission
document.getElementById("commentForm").addEventListener("submit", handleCommentSubmission);

// Display initial comment
displayCurrentComment();