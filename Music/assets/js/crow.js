document.querySelectorAll('.expand').forEach(item => {
    item.addEventListener('click', () => {
        const info = item.querySelector('.info');
        const arrow = item.querySelector('.arrow');
        
        item.classList.toggle('open');
        
        if (item.classList.contains('open')) {
            info.style.maxHeight = info.scrollHeight + 'px';
        } else {
            info.style.maxHeight = '0';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lessonNumber = urlParams.get('lesson');

    // Define paths to lessons
    const lessons = {
        1: {
            pdf: 'learn/lesson1.pdf',  // Adjusted path for lesson 1 PDF
            audio: 'learn/youraudiofile1.mp3'  // Adjusted path for lesson 1 audio
        },
        2: {
            pdf: 'learn/lesson2.pdf',
            audio: 'learn/youraudiofile2.mp3'
        },
        3: {
            pdf: 'learn/lesson3.pdf',
            audio: 'learn/youraudiofile3.mp3'
        },
        4: {
            pdf: 'learn/lesson4.pdf',
            audio: 'learn/youraudiofile4.mp3'
        },
        5: {
            pdf: 'learn/lesson5.pdf',
            audio: 'learn/youraudiofile5.mp3'
        },
        6: {
            pdf: 'learn/lesson6.pdf',
            audio: 'learn/youraudiofile6.mp3'
        },
        7: {
            pdf: 'learn/lesson7.pdf',
            audio: 'learn/youraudiofile7.mp3'
        }
    };

    // Set PDF viewer source
    const lessonViewer = document.getElementById('lessonViewer');
    lessonViewer.src = lessons[lessonNumber].pdf;

    // Set audio player source
    const lessonAudio = document.getElementById('lessonAudio');
    lessonAudio.src = lessons[lessonNumber].audio;

    // Optionally, you can add additional logic or error handling if needed
});



