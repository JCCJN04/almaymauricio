const musicToggle = document.getElementById('music-toggle');
const musicPlayer = document.getElementById('music-player');

if (musicToggle && musicPlayer) {
    const LABEL_PLAY = 'Escuchar canción';
    const LABEL_STOP = 'Detener música';
    const labelEl = musicToggle.querySelector('.music-label');

    // Keep the toggle appearance in sync with the audio playback state.
    const updateToggleState = (isPlaying) => {
        musicToggle.setAttribute('aria-expanded', isPlaying ? 'true' : 'false');
        musicToggle.classList.toggle('music-toggle--active', isPlaying);
        if (labelEl) {
            labelEl.textContent = isPlaying ? LABEL_STOP : LABEL_PLAY;
        }
    };

    musicToggle.addEventListener('click', () => {
        if (musicPlayer.paused) {
            musicPlayer.play().catch(() => {
                updateToggleState(false);
            });
        } else {
            musicPlayer.pause();
            musicPlayer.currentTime = 0;
        }
    });

    musicToggle.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
            event.preventDefault();
            musicToggle.click();
        }
    });

    musicPlayer.addEventListener('play', () => {
        updateToggleState(true);
    });

    musicPlayer.addEventListener('pause', () => {
        updateToggleState(false);
    });

    musicPlayer.addEventListener('ended', () => {
        musicPlayer.currentTime = 0;
        updateToggleState(false);
    });
}

const personalizedSection = document.getElementById('personalized-section');
const personalizedNames = document.getElementById('personalized-names');
const personalizedMessage = document.getElementById('personalized-message');

if (personalizedSection && personalizedNames && personalizedMessage) {
    const INVITE_PROFILES = {
        invitados1: {
            names: 'Familia Hernández Castillo',
            message: 'Es un honor contar con su presencia en nuestro gran día. Agradecemos confirmar su asistencia.',
        },
        // Agrega más perfiles siguiendo este formato, por ejemplo:
        // invitados2: { names: 'Nombre de los invitados', message: 'Mensaje opcional' }
    };

    const getSlugFromLocation = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');
        if (guestParam) {
            return guestParam.trim().toLowerCase();
        }

        const normalizedPath = window.location.pathname
            .replace(/\\/g, '/')
            .replace(/index\.html$/i, '');

        const segments = normalizedPath.split('/').filter(Boolean);
        if (segments.length === 0) {
            return '';
        }

    const lastSegment = decodeURIComponent(segments[segments.length - 1]);
    return lastSegment.toLowerCase();
    };

    const applyPersonalization = () => {
        const slug = getSlugFromLocation();
        const profile = INVITE_PROFILES[slug];

        if (profile) {
            personalizedNames.textContent = profile.names;
            if (profile.message) {
                personalizedMessage.textContent = profile.message;
                personalizedMessage.hidden = false;
            } else {
                personalizedMessage.hidden = true;
            }
            personalizedSection.hidden = false;
        } else {
            personalizedSection.hidden = true;
        }
    };

    applyPersonalization();
}

const heroSection = document.querySelector('.hero');
const countdown = document.getElementById('countdown');

if (heroSection && countdown) {
    const eventDateString = heroSection.dataset.eventDatetime;
    const valueRefs = {
        days: countdown.querySelector('[data-unit="days"]'),
        hours: countdown.querySelector('[data-unit="hours"]'),
        minutes: countdown.querySelector('[data-unit="minutes"]'),
        seconds: countdown.querySelector('[data-unit="seconds"]'),
    };

    const formatValue = (value) => String(Math.max(0, value)).padStart(2, '0');

    const applyValues = (units) => {
        Object.entries(units).forEach(([unit, value]) => {
            if (valueRefs[unit]) {
                valueRefs[unit].textContent = formatValue(value);
            }
        });
    };

    let intervalId;

    const initializeCountdown = (eventDate) => {
        const tick = () => {
            const now = new Date();
            const diff = eventDate.getTime() - now.getTime();

            if (diff <= 0) {
                applyValues({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(intervalId);
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / (24 * 3600));
            const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            applyValues({ days, hours, minutes, seconds });
        };

        tick();
        intervalId = setInterval(tick, 1000);
    };

    if (eventDateString) {
        const eventDate = new Date(eventDateString);

        if (!Number.isNaN(eventDate.getTime())) {
            initializeCountdown(eventDate);
        } else {
            countdown.hidden = true;
        }
    } else {
        countdown.hidden = true;
    }
}
