const initialText = document.getElementById("initial-message");

window.addEventListener('keydown', () => {
    initialText.textContent = "";

    new Typed("#initial-message", {
        strings: [`Let's explore the nature of fractals.`, 
            `Where would you like to go first?\n[1] The Ice Rink\n[2] The Satellite\n[3] The Forest`],
        showCursor: false,
        typeSpeed: 50,
        backSpeed: 50,
        loop: false
    });
}, {once: true});

window.addEventListener('keydown', (e) => {
    const choice = e.key;
    const validChoices = ['1', '2', '3'];

    if (validChoices.includes(choice)) {
        const intChoice = parseInt(choice);
        goToChoice(intChoice);
    }
});

function goToChoice(intChoice) {
    if (intChoice === 1) {
        window.location.href = 'koch/koch.html';
    } else if (intChoice === 2) {
        window.location.href = "attractors/attractors.html";
    } else if (intChoice === 3) {3
        window.location.href = "dla/dla.html";
    }
}
