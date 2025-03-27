
        document.addEventListener('DOMContentLoaded', function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const lessonNumber = urlParams.get('lesson');

            // Fetch the lesson name from the previous page (carousel.html)
            const lessonName = sessionStorage.getItem('lessonName');
            
            // Set the lesson title based on fetched lessonName
            if (lessonName) {
                document.getElementById('lessonTitle').textContent = lessonName;
            } else {
                document.getElementById('lessonTitle').textContent = "Lesson Title"; // Default text
            }
        });
