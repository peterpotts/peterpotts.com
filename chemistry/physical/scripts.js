document.addEventListener('DOMContentLoaded', function() {
    const chapterList = document.querySelector('.chapter-list');
    const iframeContainer = document.querySelector('.iframe-container');

    import('./book.js').then(book => {
        const { title, chapters } = book.default;
        let currentChapterIndex = null;

        chapters.forEach((chapter, index) => {
            const chapterTitleElement = document.createElement('div');
            chapterTitleElement.classList.add('chapter-title');
            chapterTitleElement.textContent = chapter.title;
            chapterTitleElement.addEventListener('click', () => {
                // Remove active class from previous active chapter
                if (currentChapterIndex !== null) {
                    const prevActiveChapter = chapterList.children[currentChapterIndex];
                    prevActiveChapter.classList.remove('active');
                }

                // Update current chapter index and highlight the clicked chapter
                currentChapterIndex = index;
                chapterTitleElement.classList.add('active');

                // Load corresponding Google Docs content into the iframe
                iframeContainer.innerHTML = `<iframe src="${chapter.url}"></iframe>`;
            });
            chapterList.appendChild(chapterTitleElement);

            // Automatically activate the first chapter on script load
            if (index === 0) {
                chapterTitleElement.classList.add('active');
                currentChapterIndex = 0;
                iframeContainer.innerHTML = `<iframe src="${chapter.url}"></iframe>`;
            }
        });
    });
});

