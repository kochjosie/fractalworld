document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed('#attractor-caption', {
    
    strings: [`The year is 3026. You are on vacation on a space station, a kind of artifical satellite, to view a planet with natural satellites.
You watch these satellites as they orbit around the planet, noticing that they seem to follow a Duffing equation, a kind of harmonic oscillator.
The equation shows a dynamic, chaotic system.\n
Would you like to visit another location? Press the key of the page to do so.\n
[1] The Ice Rink
[2] The Forest
[3] Go Home`],
    
typeSpeed: 15,
    showCursor: false,
  });
});

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
        window.location.href = '../koch/koch.html';
    } else if (intChoice === 2) {
        window.location.href = "../dla/dla.html";
    } else if (intChoice === 3) {
        window.location.href = "../index.html"
    }
}