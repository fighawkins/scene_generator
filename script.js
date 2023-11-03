document.getElementById('sceneButton').addEventListener('click', function() {
    fetchDnDScene();
});

async function fetchDnDScene() {
    try {
        const response = await fetch('/generate-scene', { method: 'POST' });
        if (response.ok) { // Check if the HTTP response is successful
            const data = await response.json();
            if (data.scene) {
                const display = document.getElementById('sceneDisplay');
                display.textContent = data.scene;
                display.style.display = 'block';
            } else {
                alert('Error fetching scene. Please try again.');
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        alert('Error fetching scene. Please try again.');
        console.error('There has been a problem with your fetch operation:', error);
    }
}