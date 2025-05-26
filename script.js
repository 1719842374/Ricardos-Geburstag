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
        console.log('User not logged in, showing login section...');
        document.getElementById('login').style.display = 'block'; // Ensure login section is visible
        document.getElementById('js-error').style.display = 'block';
    }

    // Set up login button event listener
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        console.log('Login button found, adding event listener...');
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default behavior
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

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add a way to reset login status for testing
    window.resetLogin = function() {
        try {
            localStorage.removeItem('isLoggedIn');
            console.log('Login status reset');
            location.reload();
        } catch (error) {
            console.error('Error resetting login status:', error);
        }
    };
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

// RSVP form submission
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Vielen Dank für deine Rückmeldung! Wir freuen uns auf dich!');
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
        console.log('Music wish submitted:', musicWishes);
    } else {
        alert('Bitte gib einen Musikwunsch ein!');
    }
});