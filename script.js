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

        if(data.scene) {
            const display = document.getElementById('sceneDisplay');
            display.textContent = data.scene;
            display.style.display = 'block';
        } else {
            throw new Error('Scene data is not available.');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error.message);
        alert('Error fetching scene. Please try again.');
    }
}