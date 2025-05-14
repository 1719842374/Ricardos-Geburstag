// Login functionality
document.getElementById('loginButton').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    if (password === 'party2025') { // Replace with actual password
        document.getElementById('login').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        updateCountdown(); // Start countdown
        setInterval(updateCountdown, 1000);
    } else {
        alert('Falsches Passwort');
    }
});

// Countdown
const partyDate = new Date('2025-08-23T20:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = partyDate - now;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText = `${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
    } else {
        document.getElementById('countdown').innerText = 'Die Party hat begonnen!';
    }
}

// Foto-Upload-Handler
document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Vorherige Bilder entfernen

    if (files.length === 0) {
        imageContainer.innerHTML = '<p>Keine Bilder oder Videos ausgewählt.</p>';
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Bilder und Videos verarbeiten
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;

        const reader = new FileReader();
        reader.onload = function(e) {
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media-item';

            let mediaElement;
            if (file.type.startsWith('image/')) {
                mediaElement = document.createElement('img');
            } else {
                mediaElement = document.createElement('video');
                mediaElement.controls = true;
            }
            mediaElement.src = e.target.result;
            mediaElement.style.maxWidth = '300px';
            mediaElement.style.margin = '10px';

            const deleteButton = document.createElement('button');
            deleteButton.innerText = '🗑️';
            deleteButton.addEventListener('click', function() {
                mediaDiv.remove();
            });

            mediaDiv.appendChild(mediaElement);
            mediaDiv.appendChild(deleteButton);
            imageContainer.appendChild(mediaDiv);
        };
        reader.readAsDataURL(file);
    }
}

// Gästebuch-Handler
document.getElementById('submitGuestbook').addEventListener('click', function() {
    const message = document.getElementById('guestbookMessage').value;
    const photoInput = document.getElementById('guestbookPhoto');
    const guestbookEntries = document.getElementById('guestbookEntries');

    if (!message) {
        alert('Bitte eine Nachricht eingeben.');
        return;
    }

    const entryDiv = document.createElement('div');
    entryDiv.className = 'guestbook-entry';
    entryDiv.style.borderBottom = '1px solid #ddd';
    entryDiv.style.padding = '10px 0';
    entryDiv.style.marginBottom = '10px';

    const messageP = document.createElement('p');
    messageP.innerText = message;
    entryDiv.appendChild(messageP);

    if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.marginTop = '10px';
                entryDiv.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    guestbookEntries.prepend(entryDiv); // Neuer Eintrag oben anzeigen
    document.getElementById('guestbookMessage').value = ''; // Textarea leeren
    photoInput.value = ''; // Datei-Input leeren
});

// Standort-Freigabe-Handler
document.getElementById('getLocation')?.addEventListener('click', getLocation);

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

// Placeholder for other functionalities
// e.g., RSVP form submission, music wishes, etc.
// These would require backend integration, which is not implemented here.