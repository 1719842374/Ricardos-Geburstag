document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, setting up login functionality...');

    // Check if localStorage is available
    let isLoggedIn = false;
    try {
        isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log('localStorage isLoggedIn:', isLoggedIn);
    } catch (error) {
        console.error('localStorage error:', error);
        alert('localStorage ist nicht verfügbar. Bitte deaktiviere den Inkognito-Modus oder überprüfe deine Browser-Einstellungen.');
    }

    // If already logged in, show main content
    if (isLoggedIn === 'true') {
        console.log('User is already logged in, showing main content...');
        document.getElementById('login').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        updateCountdown();
        setInterval(updateCountdown, 1000);
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    } else {
        console.log('User not logged in, showing JavaScript error message...');
        document.getElementById('js-error').style.display = 'block';
    }

    // Set up login button event listener
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        console.log('Login button found, adding event listener...');
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default behavior (e.g., form submission or redirect)
            console.log('Login button clicked, processing password...');
            try {
                const password = document.getElementById('password').value;
                console.log('Entered password:', password);
                if (password === 'party2025') {
                    console.log('Password correct, logging in...');
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('mainContent').style.display = 'block';
                    try {
                        localStorage.setItem('isLoggedIn', 'true');
                        console.log('localStorage updated: isLoggedIn set to true');
                    } catch (error) {
                        console.error('localStorage set error:', error);
                        alert('Konnte den Login-Status nicht speichern. Funktionalität kann eingeschränkt sein.');
                    }
                    updateCountdown();
                    setInterval(updateCountdown, 1000);
                    const hash = window.location.hash;
                    if (hash) {
                        const element = document.querySelector(hash);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                } else {
                    console.log('Incorrect password entered');
                    alert('Falsches Passwort');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Ein Fehler ist aufgetreten. Bitte überprüfe die Konsole.');
            }
        });
    } else {
        console.error('Login button not found in DOM');
        alert('Login-Button nicht gefunden. Bitte überprüfe die Seite.');
    }

    // Smooth scroll for navigation (from Claude)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

const partyDate = new Date('2025-08-23T20:00:00');

function updateCountdown() {
    try {
        const now = new Date();
        const diff = partyDate - now;
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('countdown').innerText = `${days} Tage, ${hours} Std, ${minutes} Min, ${seconds} Sek`;
        } else {
            document.getElementById('countdown').innerText = 'Die Party hat begonnen!';
        }
    } catch (error) {
        console.error('Countdown error:', error);
    }
}

document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    try {
        const files = event.target.files;
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '';

        if (files.length === 0) {
            imageContainer.innerHTML = '<p>Keine Bilder oder Videos ausgewählt.</p>';
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
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
    } catch (error) {
        console.error('Photo upload error:', error);
    }
}

document.getElementById('submitGuestbook').addEventListener('click', function() {
    try {
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

        guestbookEntries.prepend(entryDiv);
        document.getElementById('guestbookMessage').value = '';
        photoInput.value = '';
    } catch (error) {
        console.error('Guestbook error:', error);
    }
});

document.getElementById('getLocation')?.addEventListener('click', getLocation);

function getLocation() {
    try {
        const locationContainer = document.getElementById('locationContainer');
        if (navigator.geolocation) {
            locationContainer.innerHTML = '<p>Standort wird abgerufen...</p>';
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            locationContainer.innerHTML = '<p>Geolokation wird von diesem Browser nicht unterstützt.</p>';
        }
    } catch (error) {
        console.error('Geolocation error:', error);
    }
}

function showPosition(position) {
    try {
        const locationContainer = document.getElementById('locationContainer');
        locationContainer.innerHTML = 
            `Latitude: ${position.coords.latitude.toFixed(4)}<br>` +
            `Longitude: ${position.coords.longitude.toFixed(4)}`;
    } catch (error) {
        console.error('Show position error:', error);
    }
}

function showError(error) {
    try {
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
    } catch (error) {
        console.error('Show error:', error);
    }
}

// RSVP form submission
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Vielen Dank für deine Rückmeldung! Wir freuen uns auf dich!');
    // In a real app, this would send data to a server
    const formData = new FormData(this);
    console.log('Form submitted:', Object.fromEntries(formData));
    this.reset();
});

// Music wishes submission
document.getElementById('submitMusic').addEventListener('click', function() {
    const musicWishes = document.getElementById('musicWishes').value;
    if (musicWishes.trim() !== '') {
        alert('Danke für deinen Musikwunsch!');
        document.getElementById('musicWishes').value = '';
        // In a real app, this would send data to a server
        console.log('Music wish submitted:', musicWishes);
    } else {
        alert('Bitte gib einen Musikwunsch ein!');
    }
});