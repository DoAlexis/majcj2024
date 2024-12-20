document.addEventListener('DOMContentLoaded', () => {
    // Skip to content button on header
    const discoverButton = document.querySelector('#discover-button');
    discoverButton.addEventListener('click', (e) => {
        // Prevent the default action
        e.preventDefault();
        // Scroll to the content section
        const contentSection = document.querySelector('#content');
        contentSection.scrollIntoView({behavior: 'smooth'});
    });

    // Parallax
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);

    // Show bubbles when user clicks on the discover button
    document.querySelector('#discover-button').addEventListener('click', () => {
        bubbles();
    });

    // Show bubbles on scroll when user is at the top of the page and scrolls down
    let bubblesShown = false;
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0 && !bubblesShown) {
            bubbles();
            bubblesShown = true;
        } else if (scrollTop === 0) {
            bubblesShown = false;
        }
    });

    // Progress bar
    window.addEventListener('scroll', () => {
        // Calculate the current scroll position as a percentage of total scroll height
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        // Update the width of the progress bar
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = scrollPercent + '%';
    });
});

// The bubbles function
function bubbles() {
    const bubbleContainer = document.querySelector('.page-header');
    const numberOfConfetti = 150;  

    // Create many stars 
    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('bubble'); 

        // Randomize the starting position of the star
        confetti.style.left = `${Math.random() * 100}%`;

        // Randomize the size of the confetti
        const size = Math.random() * 10 + 10; 
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        // Randomize the animation duration
        const duration = Math.random() * 2 + 1; 
        confetti.style.animationDuration = `${duration}s`;

        // Randomize the animation delay
        const delay = Math.random() * 1.5;  
        confetti.style.animationDelay = `${delay}s`;

        // Randomize the opacity
        const opacity = Math.random();
        confetti.style.opacity = opacity;

        bubbleContainer.appendChild(confetti);

        // Remove the confetti from the DOM after the animation ends
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}