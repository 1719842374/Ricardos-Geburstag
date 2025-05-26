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
        startCountdown(); // Sicherstellen, dass der Countdown immer startet
    } else {
        console.log('User not logged in, showing login section...');
        document.getElementById('login').style.display = 'block';
        document.getElementById('js-error').style.display = 'block';
    }

    // Set up login button event listener
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        console.log('Login button found, adding event listener...');
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Login button clicked, processing password...');
            try {
                const password = document.getElementById('password').value;
                console.log('Entered password:', password);
                if (password === 'mallorca2025') {
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
                    startCountdown(); // Countdown starten
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

        // Enter key support for login
        document.getElementById('password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginButton.click();
            }
        });
    } else {
        console.error('Login button not found in DOM');
        alert('Login-Button nicht gefunden. Bitte überprüfe die Seite.');
    }

    // Smooth scroll for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Countdown Timer
    const eventDate = new Date('2025-08-23T20:00:00');
    function startCountdown() {
        function updateCountdown() {
            const now = new Date();
            const timeLeft = eventDate - now;
            if (timeLeft < 0) {
                document.getElementById('countdown').innerHTML = "🎉 Die Feier hat begonnen! 🎉";
                return;
            }
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            document.getElementById('countdown').innerHTML = `
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${days}</div>
                        <div>Tage</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${hours}</div>
                        <div>Stunden</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${minutes}</div>
                        <div>Minuten</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${seconds}</div>
                        <div>Sekunden</div>
                    </div>
                </div>
            `;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Photo upload handler
    document.getElementById('fileUpload').addEventListener('change', function(e) {
        try {
            const files = e.target.files;
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = '';

            if (files.length === 0) {
                imageContainer.innerHTML = '<p>Keine Bilder oder Videos ausgewählt.</p>';
                return;
            }

            for (let file of files) {
                if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const div = document.createElement('div');
                        div.style.cssText = `
                            display: inline-block;
                            margin: 10px;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        `;
                        let mediaElement;
                        if (file.type.startsWith('image/')) {
                            mediaElement = document.createElement('img');
                            mediaElement.src = e.target.result;
                            mediaElement.style.cssText = 'width: 200px; height: 150px; object-fit: cover;';
                        } else {
                            mediaElement = document.createElement('video');
                            mediaElement.src = e.target.result;
                            mediaElement.controls = true;
                            mediaElement.style.cssText = 'width: 200px; height: 150px; object-fit: cover;';
                        }
                        div.appendChild(mediaElement);
                        imageContainer.appendChild(div);
                    };
                    reader.readAsDataURL(file);
                }
            }

            if (files.length > 0) {
                alert('Vielen Dank für die Fotos!');
            }
        } catch (error) {
            console.error('Photo upload error:', error);
        }
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vielen Dank für deine Kontaktdaten! Wir freuen uns auf dich!');
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

    // Impressions submission
    document.getElementById('submitImpressions').addEventListener('click', function() {
        try {
            const memories = document.getElementById('memories').value;
            const wishes60 = document.getElementById('wishes60').value;
            const generalMessage = document.getElementById('generalMessage').value;
            const photoInput = document.getElementById('impressionPhoto');
            const impressionEntries = document.getElementById('impressionEntries');

            if (!memories.trim() && !wishes60.trim() && !generalMessage.trim()) {
                alert('Bitte fülle mindestens ein Feld aus.');
                return;
            }

            const entryDiv = document.createElement('div');
            entryDiv.className = 'guestbook-entry';
            entryDiv.style.cssText = `
                background: rgba(255,255,255,0.9);
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            `;

            if (memories.trim()) {
                const memoriesP = document.createElement('p');
                memoriesP.innerHTML = `<strong>Erinnerungen:</strong> ${memories}`;
                entryDiv.appendChild(memoriesP);
            }
            if (wishes60.trim()) {
                const wishesP = document.createElement('p');
                wishesP.innerHTML = `<strong>Wünsche für die nächsten 60 Jahre:</strong> ${wishes60}`;
                entryDiv.appendChild(wishesP);
            }
            if (generalMessage.trim()) {
                const messageP = document.createElement('p');
                messageP.innerHTML = `<strong>Nachricht:</strong> ${generalMessage}`;
                entryDiv.appendChild(messageP);
            }

            if (photoInput.files && photoInput.files[0]) {
                const file = photoInput.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.cssText = 'max-width: 200px; border-radius: 10px; margin-top: 10px;';
                        entryDiv.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            }

            impressionEntries.prepend(entryDiv);
            alert('Vielen Dank für deine wundervollen Worte!');
            document.getElementById('memories').value = '';
            document.getElementById('wishes60').value = '';
            document.getElementById('generalMessage').value = '';
            photoInput.value = '';
        } catch (error) {
            console.error('Impressions error:', error);
        }
    });

    // Add interactive effects for hotel cards
    document.querySelectorAll('.hotel-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to palm decorations
    const palms = document.querySelectorAll('.palm-decoration');
    palms.forEach((palm, index) => {
        let angle = 0;
        setInterval(() => {
            angle += 0.02;
            const offset = Math.sin(angle) * 20;
            palm.style.transform = palm.classList.contains('palm-left') ?
                `translateY(-50%) rotate(-15deg) translateY(${offset}px)` :
                `translateY(-50%) rotate(15deg) translateY(${offset}px)`;
        }, 100 + index * 50);
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