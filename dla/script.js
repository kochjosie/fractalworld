document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed('#dla-caption', {
    
    strings: [`Diffusion-limited aggregation is a way of creating a fractal using Brownian Motion. Random walkers stick together when they collide, resulting in a tree-like structure. You'll notice that the trees that get bigger earlier (randomly), stay bigger relative to the others. This is understandable as the trees with more surface area have more spots for collisions and, thus, grow more. This is similar to how trees compete for sunlight in real life.\n
Once your trees have grown, to watch the seasons as they change, turn the potentiometer on the controller.\n
Would you like to visit another location? Press the key of the page to do so.\n
[1] The Ice Rink
[2] The Satellite
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
        window.location.href = "../attractors/attractors.html";
    } else if (intChoice === 3) {
        window.location.href = "../index.html"
    }
}