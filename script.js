document.getElementById('sceneButton').addEventListener('click', function() {
    fetchDnDScene();
});

async function fetchDnDScene() {
    try {
        const response = await fetch('/generate-scene', { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();

        if (data.scene) {
            const display = document.getElementById('sceneDisplay');
            display.style.display = 'block';

            // Initialize Typed.js on the #sceneDisplay element with the fetched scene text
            new Typed('#typedText', {
                strings: [data.scene],
                typeSpeed: 50,
                backSpeed: 25,
                smartBackspace: false,
                loop: false,
                showCursor: true,
                cursorChar: '|',
                contentType: 'html'
            });
        } else {
            throw new Error('Scene data is not available.');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error fetching scene. Please try again.');
    }
}