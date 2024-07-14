if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('https://airsoftinfotech.com/tools/ChantingCounter/sw.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
    let counter = 0;
    let isPlaying = false;
    const playPauseBtn = document.getElementById('play-pause-btn');
    const audio = document.getElementById('meditation-audio');
    const bellAudio = document.getElementById('bell-audio');

    const counterDisplay = document.getElementById('counter');
    const resetBtn = document.getElementById('reset-btn');
    const infoBtn = document.getElementById('info-btn');
    const infoWrapper = document.getElementById('info-wrapper');
    const closeBtn = document.getElementById('close-btn');

    // Increment counter on click anywhere except buttons
    document.addEventListener('click', (e) => {
        if (e.target !== resetBtn && e.target !== playPauseBtn && e.target !== infoBtn && !infoWrapper.contains(e.target)) {
            counter++;
            counterDisplay.textContent = counter;
            if (counter % 108 === 0) {
                bellAudio.play();
            }
        }
    });

    // Reset counter
    resetBtn.addEventListener('click', () => {
        counter = 0;
        counterDisplay.textContent = counter;
    });

    // Play/Pause meditation music
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            playPauseBtn.textContent = '► Focus';
            audio.pause();
        } else {
            playPauseBtn.textContent = '❚❚ Pause';
            audio.play();
        }
        isPlaying = !isPlaying;
    });

    // Show information
    infoBtn.addEventListener('click', () => {
        infoWrapper.style.display = 'flex';
    });

    // Close information
    closeBtn.addEventListener('click', () => {
        infoWrapper.style.display = 'none';
    });

    // Close information when clicking outside the info content
    document.addEventListener('click', (e) => {
        if (infoWrapper.style.display === 'flex' && !infoWrapper.querySelector('.info-content').contains(e.target) && e.target !== infoBtn) {
            infoWrapper.style.display = 'none';
        }
    });
});
