function toggleHiddenContent(contentId) {
    var content = document.getElementById(contentId);

    if (content.classList.contains('visible')) {
        content.classList.remove('visible');
    } else {
        content.classList.add('visible');
    }
}
