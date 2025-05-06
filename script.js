// Foto-Upload-Handler
document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Vorherige Bilder entfernen

    if (files.length === 0) {
        imageContainer.innerHTML = '<p>Keine Bilder ausgewählt.</p>';
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Nur Bilddateien verarbeiten
        if (!file.type.startsWith('image/')) continue;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

// Standort-Freigabe-Handler
document.getElementById('getLocation').addEventListener('click', getLocation);

function getLocation() {
    const locationContainer = document.getElementById('locationContainer');
    if (navigator.geolocation) {
        locationContainer.innerHTML = '<p>Standort wird abgerufen...</p>';
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationContainer.innerHTML = '<p>Geolokation wird von diesem Browser nicht unterstützt.</p>';
    }
}

function showPosition(position) {
    const locationContainer = document.getElementById('locationContainer');
    locationContainer.innerHTML = 
        `Latitude: ${position.coords.latitude.toFixed(4)}<br>` +
        `Longitude: ${position.coords.longitude.toFixed(4)}`;
}

function showError(error) {
    const locationContainer = document.getElementById('locationContainer');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationContainer.innerHTML = '<p>Zugriff auf Standort verweigert.</p>';
            break;
        case error.POSITION_UNAVAILABLE:
            locationContainer.innerHTML = '<p>Standortinformationen nicht verfügbar.</p>';
            break;
        case error.TIMEOUT:
            locationContainer.innerHTML = '<p>Zeitüberschreitung beim Abrufen des Standorts.</p>';
            break;
        default:
            locationContainer.innerHTML = '<p>Ein Fehler ist aufgetreten.</p>';
            break;
    }
}